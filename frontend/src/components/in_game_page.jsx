import { useState } from 'react'
import { io } from "socket.io-client"
import ChatBox from './chat'
import GuessView from './guesses_view'
import GuessInputBox from './guess_input_box'
// import MatchInfo from './match_info'
// import WordPick from './word_pick'
// import SurrenderButton from './surrender_button'
import InGamgeHeader from './in_game_header'
import LetterDisplay from './letters_display'
import InGameAlert from './in_game_alert'
import SurrenderModal from './surrenderConfirmModal'
import GameResultModal from './game_result_modal'

export default function InGamePage({socket}){

    const [messages, setMessages] = useState([]) 
    const [opponentId, setOpponentId] = useState("user2")
    const [onInput, setOnInput] = useState(true)
    const [wordChosen, setWordChosen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [guessWithResult, setGuessWithResult] = useState([])
    const [openSurrenderConfirmation, setOpenSurrenderConfirmation] = useState(false)
    const [openGameResultModal, setOpenGameResultModal] = useState(false)
    
    const alerts = {
        askForWord : "Please input a word for the opponent to guess upon",
        wordNotExist : "The word you've inputted is not in the word list",
        tooLessLetters : "Not enough letters inputted for a guess",
    }
    const [show, setShow] = useState(false)
    const handleShowAlert = (newMessage) => {
        setAlertMessage(newMessage)
        if(wordChosen){
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 1000);  
        }else{
            setTimeout(() => {
                setAlertMessage(alerts.askForWord)
            }, 1000);  
        }
        
    };

    socket.on("connected", (respond) =>{
        console.log(respond);
        setAlertMessage(alerts.askForWord)
        setShow(true);
    })

    socket.on("in-game-server-message", (message) => {
        console.log(message)
    })

    socket.on("receive-message", (respond) => {
        console.log(respond)
        setMessages(prevMessages =>[...prevMessages, {user:respond.user, message:respond.message}])
    })

    socket.on("receive-guess-result", (respond) => {
        console.log(respond)
        setGuessWithResult(prevResults => [...prevResults, 
            {
                guess:respond.guess, 
                correct_letters:respond.correct_letters
            }])
    })

    socket.on("game-begin")


    function sendMessage(message){
        socket.emit("send-message", message)
    }

    function verifyInput(input){
        if(input.length < 5){
            console.log('not enough letters')
            handleShowAlert(alerts.tooLessLetters)
        }

        return true
    }

    function sendGuess(input){
        const valid = verifyInput(input)

        if(!valid){
            return
        }else if(!wordChosen){
            // handle pick word
            console.log("chosed the word : " + input)
            socket.emit("update-my-choice-of-word", input)
            setWordChosen(true)
        }else{
            socket.emit("input-a-guess", input)
        }
    }

    function openSurrenderModal(){
        setOpenSurrenderConfirmation(true)
    }

    function closeSurrenderModal(){
        setOpenSurrenderConfirmation(false)
    }

    function exitGame(){
        closeSurrenderModal()
        console.log("exit from a game")
    }

    
    return(
        <>
        <GameResultModal/>
        <SurrenderModal
            closeSurrenderModal={closeSurrenderModal}
            exitGame={exitGame}
            openSurrenderConfirmation={openSurrenderConfirmation}
        />
        <InGameAlert
        alertMessage={alertMessage}
        show={show}
        />
        <ChatBox
            messages={messages}
            setMessages={setMessages}
            sendMessage={sendMessage}
            setOnInput={setOnInput}
        />
        <InGamgeHeader
            openSurrenderModal={openSurrenderModal}
        />
        <GuessView
            guessWithResult={guessWithResult}
        />
        <GuessInputBox
            sendGuess={sendGuess}
            onInput={onInput}
            setOnInput={setOnInput}
        />
        {/* <LetterDisplay/> */}
        </>
    )
}