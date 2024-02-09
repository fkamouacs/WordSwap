import { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function ChatBox({messages,sendMessage,setOnInput}){

    const [inputText, setInputText] = useState('');

    function handleSendButton(){
        if(inputText.length > 0){
            setInputText('')
            sendMessage(inputText)
        }
    }

    function handleKeyDown(event){
        if(event.key == "Enter"){
            handleSendButton()
        }
    }

    let index = 0;

    return(
        <>
        <Box id="chat-box">
            {messages.map((message)=>{
                index++;
                return(
                    <Box key={"message-" + index} id="chat-box-message">
                        {message}
                    </Box>
                )
            })}
            <TextField 
                id="chat-box-input-textfield"
                label="Start chatting..."
                variant='outlined'
                value={inputText}
                onChange={(e)=>setInputText(e.target.value)}
                onBlur={() => setOnInput(true)}
                onFocus={() => setOnInput(false)}
                onKeyDown={handleKeyDown}
                style={{
                    backgroundColor: '#ffffff',
                    border: '2px solid #4c4c4c',
                    borderRadius: '5px',
                    color: '#ffffff',
                    overflow:"auto",
                  }}
            />
            <Button 
                id="chat-box-input-send-button"
                onClick={handleSendButton}
                style={{
                    backgroundColor: '#012328', 
                    border: "2px solid #ffffff",
                    fontSize: '1rem',
                    margin: "5px",
                    padding: '10px 20px',
                    borderRadius: '5px',
                    textTransform: 'none',
                }}
                >Send</Button>
        </Box>
        </>
    )
}