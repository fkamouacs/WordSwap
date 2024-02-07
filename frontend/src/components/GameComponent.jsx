import { useState , useEffect} from 'react';
import ChatBox from './ChatBox'; // Import your ChatBox component
import WaitingModal from './WaitingModal';
import { useSocket } from '../SocketContext'; 

const GameComponent = () => {
    // Dummy game and player IDs for testing purposes
    const [gameId] = useState('12345');
    const [playerId] = useState('player1');

    // State to track if currently waiting for a game
    const [isWaiting, setIsWaiting] = useState(false);
    // State to track the countdown to game start
    const [countdown, setCountdown] = useState(null);
    // Retrieve socket instance from context
    const socket = useSocket();

    useEffect(() => {
        // Setup listener for 'game starting' event from server
        if (!socket) return;
        
        socket.on('start or join game', (countdownTime) => {
            setCountdown(countdownTime);  // Update countdown state
        });

        // Cleanup listener on component unmount
        return () => {
            socket.off('start or join game');
        };
    }, [socket]);

    // Function to handle finding a game
    const handleFindGame = () => {
        setIsWaiting(true);  // Set waiting state to true
        socket.emit('find game'); // Emit event to find a game
    };

    // Function to handle canceling the wait
    const handleCancelWaiting = () => {
        setIsWaiting(false);  // Set waiting state to false
        socket.emit('cancel find game'); // Emit event to cancel finding a game
    };

    return (
        <div>
            <h1>Word Guessing Game</h1>
            <div>
                {/* Game content goes here */}
                <p>Game ID: {gameId}</p>
                <p>Player ID: {playerId}</p>
                {/* Other game elements */}
            </div>
            <div>
                <ChatBox gameId={gameId} playerId={playerId} />

                <button onClick={handleFindGame}>Find Game</button>
                {/* Waiting modal */}
                <WaitingModal 
                    isWaiting={isWaiting}
                    onCancel={handleCancelWaiting}
                    countdown={countdown}
                />
            </div>
        </div>
    );
};

export default GameComponent;
