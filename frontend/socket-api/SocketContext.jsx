// Import necessary React and Socket.IO-client packages
import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types'; // Import PropTypes

// Create a new Context for the socket
const SocketContext = createContext();

// Custom hook to use the socket context
export const useSocket = () => {
    return useContext(SocketContext);
};

// Component that provides the socket to its children
export const SocketProvider = ({ children }) => {
    // State to store the socket instance
    const [socket, setSocket] = useState();

    // Effect hook to initialize the socket connection when the component mounts
    useEffect(() => {
        // Create a new socket connection to the server
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);

        // Cleanup function to close the socket connection when the component unmounts
        return () => newSocket.close();
    }, []);

    // Render the context provider with the socket value
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

SocketProvider.propTypes = {
    children: PropTypes.node.isRequired
};