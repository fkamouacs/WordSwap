import { useState } from 'react'
import ChatBox from './chat'


export default function InGamePage(){

    const io = require("socket.io-client");



    return(
        <>
        <ChatBox/>
        </>
    )
}