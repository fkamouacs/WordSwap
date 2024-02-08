import {Button, Dialog, DialogTitle, Grid} from '@mui/material';
import BackHandIcon from '@mui/icons-material/BackHand';

export default function GameResultModal({}){
    return(<>
    <Dialog open={false}>
        <DialogTitle>
            Game Result
        </DialogTitle>
        <Grid container>
            <Grid item>
                Guesses made : 10
                <br/>
                Letters used : 20
            </Grid>
            <Grid item>
                Guesses made : 10
                <br/>
                Letters used : 20
            </Grid>
        </Grid>
        <Grid container>
            <Grid item>
                <Button>Go Back</Button>
            </Grid>
            <Grid item>
                <Button>Home</Button>
            </Grid>
        </Grid>
    </Dialog>
    </>)
}