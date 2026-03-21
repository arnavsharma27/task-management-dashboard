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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
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
  const minAllowedDate = dayjs().subtract(50, 'year').startOf('day');
  const maxAllowedDate = dayjs().add(50, 'year').endOf('day');

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
    const due = dayjs(dueDate);
    const dueDateInRange = due.isValid() && !due.isBefore(minAllowedDate) && !due.isAfter(maxAllowedDate);
    return title.trim().length > 0 && description.trim().length > 0 && dueDate.trim().length > 0 && dueDateInRange;
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Due Date"
              value={dueDate ? dayjs(dueDate) : null}
              onChange={value => setDueDate(value ? value.format('YYYY-MM-DD') : '')}
              minDate={minAllowedDate}
              maxDate={maxAllowedDate}
              slotProps={{
                textField: {
                  required: true,
                  fullWidth: true
                }
              }}
            />
          </LocalizationProvider>
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

