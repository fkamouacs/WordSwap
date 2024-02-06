import { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function ChatBox(){

    const [messages, setMessages] = useState([])
    const [inputText, setInputText] = useState('');

    function handleSendButton(){
        const new_message = {user:"user1",message:inputText}
        setInputText('')
        messages.push(new_message)
        setMessages(messages)
    }

    return(
        <>/
        <Box id="chat-box">
            {messages.map((message)=>{
                return(
                    <Box id="chat-box-message">
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
            />
            <Button 
                id="chat-box-input-send-button"
                onClick={handleSendButton}
                >Send</Button>
        </Box>
        </>
    )
}