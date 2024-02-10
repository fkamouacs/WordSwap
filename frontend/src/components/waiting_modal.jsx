import {CircularProgress,Dialog,DialogTitle,Button} from '@mui/material';

export default function WaitingModal({openWaitModal,handleCancelButton}) {
    return (
        <Dialog open={openWaitModal}>
          <DialogTitle>
              Waiting for player... 
              <CircularProgress />
          </DialogTitle>
          <Button
            onClick={handleCancelButton}
        >Cancel</Button>
      </Dialog>
    );
  }