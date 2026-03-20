import { Card, CardContent, CardHeader, CardActions, Typography, IconButton, Chip, Tooltip, Stack, Checkbox, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Task } from '../domain/types';

export function TaskCards(props: {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleStatus: (taskId: string) => void;
}) {
  const { tasks, onEdit, onDelete, onToggleStatus } = props;
  return (
    <Grid container spacing={2}>
      {tasks.map(task => {
        const chipColor =
          task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'default';
        return (
          <Grid key={task.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card variant="outlined" sx={task.status === 'completed' ? { opacity: 0.8 } : undefined}>
              <CardHeader
                title={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Checkbox
                      size="small"
                      checked={task.status === 'completed'}
                      onChange={() => onToggleStatus(task.id)}
                    />
                    <Typography
                      variant="h6"
                      sx={task.status === 'completed' ? { textDecoration: 'line-through' } : undefined}
                    >
                      {task.title}
                    </Typography>
                    <Chip size="small" label={task.priority.toUpperCase()} color={chipColor as any} />
                  </Stack>
                }
                subheader={`Due ${task.dueDate}`}
              />
              <CardContent>
                <Typography variant="body2">{task.description}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
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
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

