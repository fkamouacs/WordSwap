import { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function ChatBox({messages, setMessages,sendMessage,setOnInput}){

    const [inputText, setInputText] = useState('');

    function handleSendButton(){
        if(inputText.length > 0){
            const new_message = {user:"user1",message:inputText}
            setInputText('')
            messages.push(new_message)
            sendMessage(new_message)
            setMessages(messages)
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
                        {message.user} : {message.message}
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
            />
            <Button 
                id="chat-box-input-send-button"
                onClick={handleSendButton}
                >Send</Button>
        </Box>
        </>
    )
}