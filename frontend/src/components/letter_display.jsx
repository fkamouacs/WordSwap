import React, { useState } from 'react';
import { Button, Box} from '@mui/material';

const LetterDisplay = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    const colorDict = {};
    for (const letter of alphabet) {
        colorDict[letter] = true;
    }

    const [colors, setColors] = useState(colorDict);

    const toggleColor = (letter) => {
        setColors(prev => ({
            ...prev,
            [letter]: !prev[letter]
        }));
    };

    return (
        <Box 
            display="flex"
            flexWrap="wrap" // Allows items to wrap to the next line
            justifyContent="center" // Centers items horizontally
            alignItems="center" // Centers items vertically
            sx={{
                width: '80%', // Takes full width of the container
                padding: '20px' // Adds some padding around the items
            }}>
            {Object.keys(colors).map((letter) => (
                <Button
                    key={letter}
                    onClick={() => toggleColor(letter)}
                    sx={{ 
                        background: colors[letter] ? '#ffffff' : 'red',
                        margin: '5px', minWidth: '30px',
                        alignSelf: "center"
                    }} 
                >{letter}</Button>
            ))}
        </Box>
    );
};

export default LetterDisplay;
