
import PersonIcon from '@mui/icons-material/Person';
import { Grid, Tooltip } from '@mui/material';

export default function MatchInfo({playerName,opponentName}){


    let user1 = playerName
    let user2 = opponentName


    if(user1.length > 6){
        user1 = user1.substring(0,6) + "..."
    }

    if(user2.length > 6){
        user2 = user2.substring(0,6) + "..."
    }


    return(<Grid container className='match-info-grid'>
        <Grid item xs={3} justifyContent={"right"}>
            {/* {user1} */}
            <Tooltip title={playerName}>
                <span>{user1.length > 6 ? user1.substring(0, 6) + "..." : user1}</span>
            </Tooltip>
        </Grid>
        <Grid item xs={2} justifyContent={"right"}>
            <PersonIcon/>
        </Grid>
        <Grid item xs={2} justifyContent={"center"}>
            v.s
        </Grid>
        <Grid item xs={2} justifyContent={"left"}>
            <PersonIcon/>
        </Grid>
        <Grid item xs={3} justifyContent={"left"}>
            {/* {user2} */}
            <Tooltip title={opponentName}>
                <span>{user2.length > 6 ? user2.substring(0, 6) + "..." : user2}</span>
            </Tooltip>
        </Grid>
    </Grid>)
}