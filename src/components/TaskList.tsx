import { Checkbox, IconButton, List, ListItem, ListItemText, Stack, Chip, Tooltip, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Task } from '../domain/types';
import { DndContext, DragEndEvent, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMediaQuery, useTheme } from '@mui/material';
import '../styles/TaskList.scss';

export function TaskList(props: {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleStatus: (taskId: string) => void;
  onReorder: (activeId: string, overId: string) => void;
}) {
  const { tasks, onEdit, onDelete, onToggleStatus, onReorder } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 8
      }
    })
  );

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    onReorder(String(active.id), String(over.id));
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
        <List className="taskListRoot">
          {tasks.map(task => (
            <SortableTaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
              isMobile={isMobile}
            />
          ))}
        </List>
      </SortableContext>
    </DndContext>
  );
}

function SortableTaskItem(props: {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleStatus: (taskId: string) => void;
  isMobile: boolean;
}) {
  const { task, onEdit, onDelete, onToggleStatus, isMobile } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id });

  const secondary = `${task.description} • Due ${task.dueDate}`;
  const labelColor =
    task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'default';

  if (!isMobile) {
    return (
      <ListItem
        className="taskListItem"
        ref={setNodeRef}
        divider
        sx={{
          transform: CSS.Transform.toString(transform),
          transition,
          opacity: isDragging ? 0.85 : 1,
          bgcolor: isDragging ? 'action.hover' : 'transparent'
        }}
        secondaryAction={
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip label={task.priority.toUpperCase()} color={labelColor as any} size="small" />
            <Tooltip title="Edit">
              <IconButton onClick={() => onEdit(task)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton color="error" onClick={() => onDelete(task.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        }
      >
        <Tooltip title="Drag to reorder">
          <IconButton size="small" {...attributes} {...listeners} sx={{ mr: 0.5, cursor: 'grab' }}>
            <DragIndicatorIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Checkbox
          edge="start"
          checked={task.status === 'completed'}
          onChange={() => onToggleStatus(task.id)}
        />
        <ListItemText
          primary={task.title}
          secondary={secondary}
          primaryTypographyProps={{
            sx: task.status === 'completed' ? { textDecoration: 'line-through', opacity: 0.7 } : undefined
          }}
        />
      </ListItem>
    );
  }

  return (
    <ListItem
      className="taskListItem taskListItemMobile"
      ref={setNodeRef}
      divider
      sx={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.85 : 1,
        bgcolor: isDragging ? 'action.hover' : 'transparent',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
      }}
    >
      <Stack direction="row" alignItems="flex-start" sx={{ width: '100%' }}>
        <Tooltip title="Drag to reorder">
          <IconButton
            size="small"
            {...attributes}
            {...listeners}
            sx={{
              mr: 0.5,
              cursor: 'grab',
              mt: 0.5,
              touchAction: 'none',
              width: 36,
              height: 36
            }}
          >
            <DragIndicatorIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Checkbox
          edge="start"
          checked={task.status === 'completed'}
          onChange={() => onToggleStatus(task.id)}
          sx={{ mt: 0.25 }}
        />
        <ListItemText
          primary={task.title}
          secondary={secondary}
          primaryTypographyProps={{
            sx: task.status === 'completed' ? { textDecoration: 'line-through', opacity: 0.7 } : undefined
          }}
          sx={{ mr: 1 }}
        />
      </Stack>
      <Box sx={{ width: '100%', pl: 0, pt: 0.5 }}>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end" flexWrap="wrap">
          <Chip label={task.priority.toUpperCase()} color={labelColor as any} size="small" />
          <Tooltip title="Edit">
            <IconButton onClick={() => onEdit(task)} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => onDelete(task.id)} size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    </ListItem>
  );
}

