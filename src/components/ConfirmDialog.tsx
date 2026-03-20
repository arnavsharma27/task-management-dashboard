import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export function ConfirmDialog(props: {
  open: boolean;
  title: string;
  message: string;
  confirmColor?: 'primary' | 'error';
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const { open, title, message, confirmColor = 'primary', onCancel, onConfirm } = props;
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button color={confirmColor} variant="contained" onClick={onConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

