import { useState, useEffect } from 'react'
import { Grid, Box, Button } from "@mui/material";


export default function GuessInputBox({sendGuess,onChatBox}){

    const [input, setInput] = useState([])

    useEffect(() => {
        const handleKeyDown = (event) => {

          if(onChatBox){
            console.log("on chat box")
            return
          }else if (event.key.match(/^[a-zA-Z]$/) && input.length < 5) {
            setInput(prevInput => [...prevInput, event.key])
          }
          else if(event.key == "Backspace"){
            setInput(prevInput => prevInput.slice(0,-1))
          }else if(event.key == "Enter"){
            const stringToInput = input.join("");
            sendGuess(stringToInput);
          }
        };
    
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, [input,onChatBox]);

    return(<>
    <Grid container justifyContent={"center"}>
        <Grid item xs={10}>
           <Grid container justifyContent={"center"}>
                <Grid item key={"input-letter-1"} xs={2} padding={1}>
                <div className="square">
                    {(input.length > 0) ? input[0] : ""}
                </div>
                </Grid>
                <Grid item key={"input-letter-2"} xs={2} padding={1}>
                <div className="square">
                    {(input.length > 0) ? input[1] : ""}
                </div>
                </Grid>
                <Grid item key={"input-letter-3"} xs={2} padding={1}>
                <div className="square">
                    {(input.length > 0) ? input[2] : ""}
                </div>
                </Grid>
                <Grid item key={"input-letter-4"} xs={2} padding={1}>
                <div className="square">
                    {(input.length > 0) ? input[3] : ""}
                </div>
                </Grid>
                <Grid item key={"input-letter-5"} xs={2} padding={1}>
                <div className="square">
                    {(input.length > 0) ? input[4] : ""}
                </div>
                </Grid>
            </Grid> 
        </Grid>
        <Grid item xs={2}>
            <Button onClick={() => sendGuess(input.join(""))}>Send</Button>
        </Grid>
        
    </Grid>
    </>)
}