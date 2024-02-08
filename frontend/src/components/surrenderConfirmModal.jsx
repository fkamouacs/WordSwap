import {Button, Dialog} from '@mui/material';
import BackHandIcon from '@mui/icons-material/BackHand';

export default function SurrenderModal({closeSurrenderModal, exitGame,openSurrenderConfirmation}){
    return(<>
    <Dialog open={openSurrenderConfirmation}>
        Are you sure you want to surrender?<br/>
        You won't be able to join back the game?
        <Button onClick={exitGame}>Yes</Button>
        <Button onClick={closeSurrenderModal}>No</Button>
    </Dialog>
    </>)
}