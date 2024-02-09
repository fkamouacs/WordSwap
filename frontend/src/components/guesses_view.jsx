import { Box, Grid, ListItem , List, ListItemText} from "@mui/material";

export default function GuessView({guessWithResult}){

    const padding = 1;
    let count = 0;
    
    return(
        <>
        <Box width={"500px"} height={"300px"}>
            <Grid container key={"guess-" + count} justifyContent={"center"}>
                <Grid item key={"guess-word-" + count} xs={3} padding={padding} textAlign={"right"}>
                    Your Guesses
                </Grid>
                <Grid item key={"guess-result-" + count} xs={3} padding={padding} textAlign={"left"}>
                    Letters Correct
                </Grid>
            </Grid>
            <List sx={{ maxHeight: "250px", overflowY: 'auto' }}>
                {[...guessWithResult].reverse().map((guess) => {
                    count++;
                    return(
                        <Grid container key={"guess-" + count}  justifyContent={"center"}>
                            <Grid item key={"guess-word-" + count} xs={3} padding={padding} textAlign={"right"}>
                                {guess.guess}
                            </Grid>
                            <Grid item key={"guess-result-" + count} xs={3} padding={padding} textAlign={"left"}>
                                {(guess.correct_letters) == 6 ? "You got it!" : guess.correct_letters}
                            </Grid>
                        </Grid>
                    )
                })}
            </List>
        </Box>
        </>
    )
}