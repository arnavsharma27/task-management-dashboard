import { Checkbox, IconButton, List, ListItem, ListItemText, Stack, Chip, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Task } from '../domain/types';
import { DndContext, DragEndEvent, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function TaskList(props: {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleStatus: (taskId: string) => void;
  onReorder: (activeId: string, overId: string) => void;
}) {
  const { tasks, onEdit, onDelete, onToggleStatus, onReorder } = props;

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
        <List>
          {tasks.map(task => (
            <SortableTaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
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
}) {
  const { task, onEdit, onDelete, onToggleStatus } = props;
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

  return (
    <ListItem
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

