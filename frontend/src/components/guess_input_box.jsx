import { useState, useEffect } from 'react'
import { Grid, Box, Button } from "@mui/material";
import {Textarea} from '@mui/joy'
import LetterDisplay from './letter_display'


export default function GuessInputBox({sendGuess,onInput,setOnInput,isMyTurn,winner,toggleOpenGameResultModal}){

    const [input, setInput] = useState([])

    function handleSendInput(){
      const stringToInput = input.join("");
      const result = sendGuess(stringToInput);
      if(result == 0){
        setInput(() => [])
      }
    }

    useEffect(() => {
        const handleKeyDown = (event) => {

          if(!onInput){
            return -1
          }else if (event.key.match(/^[a-zA-Z]$/) && input.length < 5) {
            setInput(prevInput => [...prevInput, event.key])
          }
          else if(event.key == "Backspace"){
            setInput(prevInput => prevInput.slice(0,-1))
          }else if(event.key == "Enter" && input.length != 0 && isMyTurn && winner == ""){
            handleSendInput()
          }
        };
    
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, [input,onInput]);



    return(<>
    <Grid container justifyContent={"center"}>
        <Grid item xs={10} paddingTop={1} paddingBottom={2}>
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
    </Grid>
    <Grid container justifyContent={"center"}>
      <Button 
        className='send-input-button' 
        onClick={(winner == "") ? handleSendInput : toggleOpenGameResultModal}
        disabled={!isMyTurn && winner == ""}
      >{(winner=="") ? ((isMyTurn) ? "Send" : "Wait For Opponent") : "View Result"}</Button>
      <LetterDisplay/>
      <Textarea 
          style={{
              backgroundColor: '#2a2a2a',
              border: '2px solid #4c4c4c',
              borderRadius: '5px',
              width: '500px',
              height: '200px',
              color: '#ffffff',
            }}
          onBlur={() => setOnInput(true)}
          onFocus={() => setOnInput(false)}
          placeholder='Use me to your advantage!'
      />
    </Grid>
    </>)
}