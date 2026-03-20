import { useEffect, useMemo, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Stack
} from '@mui/material';
import { Task, TaskDraft, TaskPriority } from '../domain/types';

export function TaskFormDialog(props: {
  open: boolean;
  editingTask?: Task;
  onClose: () => void;
  onSubmit: (draft: TaskDraft) => void;
}) {
  const { open, editingTask, onClose, onSubmit } = props;
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [dueDate, setDueDate] = useState<string>('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate);
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
    }
  }, [editingTask, open]);

  const isValid = useMemo(() => {
    return title.trim().length > 0 && description.trim().length > 0 && dueDate.trim().length > 0;
  }, [title, description, dueDate]);

  function handleSubmit() {
    if (!isValid) return;
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate
    });
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editingTask ? 'Edit Task' : 'New Task'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            autoFocus
          />
          <TextField
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            multiline
            minRows={3}
          />
          <TextField
            label="Priority"
            select
            value={priority}
            onChange={e => setPriority(e.target.value as TaskPriority)}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
          <TextField
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" disabled={!isValid} onClick={handleSubmit}>
          {editingTask ? 'Save' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

