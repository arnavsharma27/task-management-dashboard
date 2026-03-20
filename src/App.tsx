import { useMemo, useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, AppBar, Toolbar, Typography, IconButton, Box, Stack, Button, Divider, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AddIcon from '@mui/icons-material/Add';
import './index.css';
import './styles/global.scss';
import { Task, TaskDraft, TaskStatus } from './domain/types';
import { loadTasks, saveTasks } from './domain/storage';
import { TaskFormDialog } from './components/TaskFormDialog';
import { TaskList } from './components/TaskList';
import { TaskCards } from './components/TaskCards';
import { FiltersBar, FiltersState } from './components/FiltersBar';
import { ConfirmDialog } from './components/ConfirmDialog';
import { arrayMove } from '@dnd-kit/sortable';

type ViewMode = 'list' | 'card';

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: { main: '#1976d2' }
        }
      }),
    [darkMode]
  );

  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
  const [view, setView] = useState<ViewMode>('list');
  const [filters, setFilters] = useState<FiltersState>({
    query: '',
    status: 'all',
    priority: 'all'
  });
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ open: boolean; taskId?: string }>({ open: false });

  const counts = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const matchesQuery =
        filters.query.trim().length === 0 ||
        t.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        t.description.toLowerCase().includes(filters.query.toLowerCase());
      const matchesStatus =
        filters.status === 'all' ||
        (filters.status === 'pending' && t.status === 'pending') ||
        (filters.status === 'completed' && t.status === 'completed');
      const matchesPriority =
        filters.priority === 'all' || t.priority === filters.priority;
      return matchesQuery && matchesStatus && matchesPriority;
    });
  }, [tasks, filters]);

  function persist(next: Task[]) {
    setTasks(next);
    saveTasks(next);
  }

  function handleCreate(draft: TaskDraft) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: draft.title.trim(),
      description: draft.description.trim(),
      priority: draft.priority,
      dueDate: draft.dueDate,
      status: 'pending',
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    persist([newTask, ...tasks]);
    setFormOpen(false);
  }

  function handleUpdate(updated: Task) {
    const next = tasks.map(t => (t.id === updated.id ? { ...updated, updatedAt: Date.now() } : t));
    persist(next);
    setEditingTask(null);
  }

  function handleToggleStatus(taskId: string) {
    const next = tasks.map(t =>
      t.id === taskId
        ? {
            ...t,
            status: (t.status === 'completed' ? 'pending' : 'completed') as TaskStatus,
            updatedAt: Date.now()
          }
        : t
    );
    persist(next);
  }

  function requestDelete(taskId: string) {
    setConfirmDelete({ open: true, taskId });
  }
  function confirmDeleteNow() {
    if (!confirmDelete.taskId) return;
    const next = tasks.filter(t => t.id !== confirmDelete.taskId);
    persist(next);
    setConfirmDelete({ open: false, taskId: undefined });
  }

  function handleReorder(activeId: string, overId: string) {
    if (activeId === overId) return;
    const visibleIds = filteredTasks.map(task => task.id);
    const oldIndex = visibleIds.indexOf(activeId);
    const newIndex = visibleIds.indexOf(overId);
    if (oldIndex < 0 || newIndex < 0) return;

    const reorderedVisibleIds = arrayMove(visibleIds, oldIndex, newIndex);
    const visibleIdSet = new Set(visibleIds);
    let visiblePointer = 0;

    const next = tasks.map(task => {
      if (!visibleIdSet.has(task.id)) return task;
      const nextVisibleTaskId = reorderedVisibleIds[visiblePointer];
      visiblePointer += 1;
      return tasks.find(candidate => candidate.id === nextVisibleTaskId) ?? task;
    });

    persist(next);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="homePageWrapper">
        <AppBar position="fixed" color="primary" elevation={1}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Task Dashboard
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Tooltip title={darkMode ? 'Light mode' : 'Dark mode'}>
                <IconButton color="inherit" onClick={() => setDarkMode(v => !v)} aria-label="toggle theme">
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Tooltip>
              <Tooltip title="List view">
                <IconButton color={view === 'list' ? 'inherit' : 'default'} onClick={() => setView('list')} aria-label="list view">
                  <ViewListIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Card view">
                <IconButton color={view === 'card' ? 'inherit' : 'default'} onClick={() => setView('card')} aria-label="card view">
                  <ViewModuleIcon />
                </IconButton>
              </Tooltip>
              <Button startIcon={<AddIcon />} color="inherit" variant="outlined" onClick={() => setFormOpen(true)}>
                New Task
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Container
          className="homePageContainer"
          maxWidth={false}
          sx={{ py: 3, px: { xs: 2, sm: 3, md: 4, lg: 6 } }}
        >
          <Box className="homePageValue">
            <FiltersBar
              counts={counts}
              value={filters}
              onChange={setFilters}
            />
            <Divider sx={{ my: 2 }} />
            {view === 'list' ? (
              <TaskList
                tasks={filteredTasks}
                onEdit={setEditingTask}
                onDelete={requestDelete}
                onToggleStatus={handleToggleStatus}
                onReorder={handleReorder}
              />
            ) : (
              <TaskCards
                tasks={filteredTasks}
                onEdit={setEditingTask}
                onDelete={requestDelete}
                onToggleStatus={handleToggleStatus}
              />
            )}
          </Box>
        </Container>
      </div>

      <TaskFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleCreate}
      />
      <TaskFormDialog
        open={!!editingTask}
        editingTask={editingTask ?? undefined}
        onClose={() => setEditingTask(null)}
        onSubmit={(draft) => {
          if (!editingTask) return;
          handleUpdate({
            ...editingTask,
            title: draft.title,
            description: draft.description,
            priority: draft.priority,
            dueDate: draft.dueDate
          });
        }}
      />
      <ConfirmDialog
        open={confirmDelete.open}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmColor="error"
        onCancel={() => setConfirmDelete({ open: false, taskId: undefined })}
        onConfirm={confirmDeleteNow}
      />
    </ThemeProvider>
  );
}

export default App
