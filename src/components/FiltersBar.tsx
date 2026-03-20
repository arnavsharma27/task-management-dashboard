import { ChangeEvent } from 'react';
import { Box, Stack, TextField, ToggleButtonGroup, ToggleButton, Chip } from '@mui/material';
import { TaskPriority } from '../domain/types';

export type FiltersState = {
  query: string;
  status: 'all' | 'pending' | 'completed';
  priority: 'all' | TaskPriority;
};

export function FiltersBar(props: {
  value: FiltersState;
  counts: { total: number; pending: number; completed: number };
  onChange: (next: FiltersState) => void;
}) {
  const { value, onChange, counts } = props;

  function handleQuery(e: ChangeEvent<HTMLInputElement>) {
    onChange({ ...value, query: e.target.value });
  }
  function handleStatus(_: any, next: FiltersState['status']) {
    if (!next) return;
    onChange({ ...value, status: next });
  }
  function handlePriority(_: any, next: FiltersState['priority']) {
    if (!next) return;
    onChange({ ...value, priority: next });
  }

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }}>
        <TextField
          fullWidth
          placeholder="Search by title or description..."
          value={value.query}
          onChange={handleQuery}
        />
        <ToggleButtonGroup
          exclusive
          value={value.status}
          onChange={handleStatus}
          aria-label="status filter"
        >
          <ToggleButton value="all">All <Chip size="small" sx={{ ml: 1 }} label={counts.total} /></ToggleButton>
          <ToggleButton value="pending">Pending <Chip size="small" sx={{ ml: 1 }} label={counts.pending} /></ToggleButton>
          <ToggleButton value="completed">Completed <Chip size="small" sx={{ ml: 1 }} label={counts.completed} /></ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          exclusive
          value={value.priority}
          onChange={handlePriority}
          aria-label="priority filter"
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="low">Low</ToggleButton>
          <ToggleButton value="medium">Medium</ToggleButton>
          <ToggleButton value="high">High</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Box>
  );
}

