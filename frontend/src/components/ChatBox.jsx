import { useState, useEffect } from 'react';
import { useSocket } from '../SocketContext'; // Import the custom hook for using Socket.IO
import PropTypes from 'prop-types';

const ChatBox = ({ gameId }) => {
    const [messages, setMessages] = useState([]); // State to store chat messages displayed in the chat box
    const [inputMessage, setInputMessage] = useState(''); // State for storing the current value of the chat input field
    const socket = useSocket(); // Retrieve the socket instance from the Socket.IO context

    useEffect(() => {
        if (socket == null) return; // If the socket is not initialized, exit the effect

        // Define a function to handle new incoming chat messages
        const handleNewMessage = (newMessage) => {
            console.log('New message received:', newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]); // Append the new message to the existing messages
        };
        // console.log(messages);
        // Register 'receive chat message' event listener with the socket
        socket.on('receive chat message', handleNewMessage);

        // Cleanup function: remove the event listener when the component unmounts
        return () => {
            socket.off('receive chat message', handleNewMessage);
        };
    }, [socket]); // Re-run the effect when the socket instance changes

    // Function to be called when the user sends a message
    const sendMessage = () => {
        if (inputMessage.trim() !== '') { // Check if the message is not empty
            const messageData = { gameId, message: inputMessage }; // Prepare the message data
            console.log(gameId);
            console.log(inputMessage);
            socket.emit('send chat message', messageData); // Emit the message to the server via the socket
            setInputMessage(''); // Clear the input field after sending
        }
    };

    return (
        <div>
            <div id="chat-messages">
                {messages.map((msg, index) => (
                    <p key={index}>{msg.message}</p> // Map each message in the state to a <p> element for display
                ))}
            </div>
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)} // Update inputMessage state as the user types
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button> {/* Button to trigger sendMessage when clicked */}
        </div>
    );
};

ChatBox.propTypes = {
    gameId: PropTypes.string.isRequired,  // Assuming gameId is a string
};

export default ChatBox;
