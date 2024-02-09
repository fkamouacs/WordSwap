import {Button, Dialog, DialogTitle, Grid} from '@mui/material';
import BackHandIcon from '@mui/icons-material/BackHand';

export default function GameResultModal({winner,openGameResultModal,toggleOpenGameResultModal}){
    return(<>
    <Dialog open={winner !="" && openGameResultModal}>
        <DialogTitle>
            Winner is {winner}
        </DialogTitle>
        {/* <Grid container>
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
        </Grid> */}
        <Grid container justifyContent={"center"}>
            <Grid item>
                <Button onClick={toggleOpenGameResultModal}>Go Back</Button>
            </Grid>
        </Grid>
    </Dialog>
    </>)
}