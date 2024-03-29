import Button from '@mui/material/Button';
import BackHandIcon from '@mui/icons-material/BackHand';

export default function SurrenderButton({openSurrenderModal,winner,setHomePage}){

    return(<>
        <BackHandIcon style={{transform: 'scaleX(-1)'}}/>
        <Button 
            className='surrender-button'
            onClick={(winner == "") ? openSurrenderModal : setHomePage}
        >{(winner == "") ? "FORFEIT" : "EXIT"}
        </Button>
        <BackHandIcon/>
    </>)
}