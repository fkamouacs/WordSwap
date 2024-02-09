import WordPick from './word_pick'
import MatchInfo from './match_info'
import SurrenderButton from './surrender_button'
import { Grid } from '@mui/material'

export default function InGamgeHeader({openSurrenderModal,playerName,opponentName,winner,setHomePage}){

    return(<>
        <Grid container className='in-game-header-grid'>
            <Grid item xs={3} justifyContent={"center"}>
                <WordPick/>
            </Grid>
            <Grid item xs={6} >
                <MatchInfo playerName={playerName} opponentName={opponentName}/>
            </Grid>
            <Grid item xs={3} justifyContent={"center"}>
                <SurrenderButton 
                    winner={winner} 
                    openSurrenderModal={openSurrenderModal}
                    setHomePage={setHomePage}
                    />
                </Grid>
        </Grid>
    </>)
}