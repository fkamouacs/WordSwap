
import PersonIcon from '@mui/icons-material/Person';
import { Grid } from '@mui/material';

export default function MatchInfo(){


    let user1 = "User1"
    let user2 = "User2"


    if(user1.length > 8){
        user1 = user1.substring(0,6) + "..."
    }

    if(user1.length > 8){
        user1 = user1.substring(0,6) + "..."
    }


    return(<Grid container className='match-info-grid'>
        <Grid item xs={3} justifyContent={"right"}>{user1}</Grid>
        <Grid item xs={2} justifyContent={"right"}><PersonIcon/></Grid>
        <Grid item xs={2} justifyContent={"center"}>v.s</Grid>
        <Grid item xs={2} justifyContent={"left"}><PersonIcon/></Grid>
        <Grid item xs={3} justifyContent={"left"}>{user2}</Grid>
    </Grid>)
}