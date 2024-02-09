import { useEffect, useState } from 'react'
import { io } from "socket.io-client"
import ChatBox from './chat'
import GuessView from './guesses_view'
import GuessInputBox from './guess_input_box'
// import MatchInfo from './match_info'
// import WordPick from './word_pick'
// import SurrenderButton from './surrender_button'
import InGamgeHeader from './in_game_header'
import InGameAlert from './in_game_alert'
import SurrenderModal from './surrenderConfirmModal'
import GameResultModal from './game_result_modal'

export default function InGamePage({socket,playerName,opponentName,setHomePage}){

    const [messages, setMessages] = useState([]) 
    const [onInput, setOnInput] = useState(true)
    const [wordChosen, setWordChosen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("Please input a word for the opponent to guess upon")
    const [guessWithResult, setGuessWithResult] = useState([])
    const [openSurrenderConfirmation, setOpenSurrenderConfirmation] = useState(false)
    const [openGameResultModal, setOpenGameResultModal] = useState(true)
    const [isMyTurn, setIsMyTurn] = useState(true);
    const [winner, setWinner] = useState("");
    
    const alerts = {
        askForWord : "Please input a word for the opponent to guess upon",
        wordNotExist : "The word you've inputted is not in the word list",
        tooLessLetters : "Not enough letters inputted for a guess",
        yourTurn: "It's your turn to make a guess",
        repeatedLetter: "Please choose a word that have unique letter"
    }
    const [show, setShow] = useState(true)
    const handleShowAlert = (newMessage) => {
        setAlertMessage(newMessage)
        if(wordChosen){
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 2000);  
        }else{
            setTimeout(() => {
                setAlertMessage(alerts.askForWord)
            }, 2000);  
        }
        
    };

    useEffect(()=> {
        if(wordChosen){
            setShow(false)
        }
    }, [wordChosen])

    useEffect(() => {
        if(isMyTurn){
            if(wordChosen){
                handleShowAlert(alerts.yourTurn)
            }
        }else{

        }
    }, [isMyTurn])



    socket.on("connected", (respond) =>{
        console.log(respond);
        setAlertMessage(alerts.askForWord)
        setShow(true);
    })

    socket.on("in-game-server-message", (message) => {
        console.log(message)
    })

    // socket.on("receive-message", (message) => {
    //     setMessages(prevMessages =>[...prevMessages, message])
    // })

    useEffect(() => {
        socket.on('receive-message', (message) => {
            setMessages(prevMessages =>[...prevMessages, message])
        });
      
        return () => {
          socket.off('receive-message');
        };
      }, []); 


    socket.on("guessing begin", (username) => {
        setIsMyTurn(username == playerName)

    })

    socket.on("game finished", (winner) => {
        console.log("winner : ",winner)
        setWinner(winner)
    })


    socket.on("change turn", () => {
        setIsMyTurn(prevTurn => !prevTurn)
    })

    socket.on("not a valid word", () => {
        handleShowAlert(alerts.wordNotExist)
    })

    socket.on("player left", (username)=> {
        // handle opponent left
        console.log("other person left")

        if(playerName != username){
            setWinner(playerName)
        }else{
            setHomePage()
        }
    })


    function sendMessage(message){
        socket.emit("send-message", message, playerName)
    }

    function verifyInput(input){
        if(input.length < 5){
            console.log('not enough letters')
            handleShowAlert(alerts.tooLessLetters)
            return false
        }

        return true
    }

    function sendGuess(input){
        const valid = verifyInput(input)
        if(!valid){
            return -1
        }else if(!wordChosen){
            // handle pick word

            //check if there are repeating letters
            const letters = new Set(input)
            console.log(letters)
            console.log(letters.size)
            if(letters.size != 5){
                handleShowAlert(alerts.repeatedLetter)
                return -1;
            }
            console.log("chosed the word : " + input)
            socket.emit("set word", input, playerName)
            socket.on("valid word", () => {
                setWordChosen(true)
                socket.on("valid word")
                setIsMyTurn(false)
            })
        }else{
            socket.emit("input-a-guess", input, playerName)
            socket.on("guess result", (guess,result)=>{
                console.log("guess result", guess, result)
                const newGuess = {
                    guess: guess, 
                    correct_letters:result
                }
        
                setGuessWithResult(prevResults => [...prevResults, newGuess])
                socket.off("guess result")
            })
        }
        return 0;
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
        socket.off("player left")
        socket.emit("leave game", playerName)
    }

    function toggleOpenGameResultModal(){
        setOpenGameResultModal(prev => !prev)
    }

    
    return(
        <>
        <GameResultModal
            winner={winner}
            openGameResultModal={openGameResultModal}
            toggleOpenGameResultModal={toggleOpenGameResultModal}
        />
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
            playerName={playerName}
            opponentName={opponentName}
            winner={winner}
            setHomePage={setHomePage}
        />
        <GuessView
            guessWithResult={guessWithResult}
        />
        <GuessInputBox
            sendGuess={sendGuess}
            onInput={onInput}
            setOnInput={setOnInput}
            isMyTurn={isMyTurn}
            winner={winner}
            toggleOpenGameResultModal={toggleOpenGameResultModal}
        />
        {/* <LetterDisplay/> */}
        </>
    )
}