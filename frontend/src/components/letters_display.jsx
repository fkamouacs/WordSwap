import { Box } from '@mui/material';

const lettersRows = [
    ["q","w","e","r","t","y","u","i","o","p"],
    ["a","s","d","f","g","h","j","k","l"],
    ["z","x","c","v","b","n","m"]]

export default function LetterDisplay(){
    
    let line = 0;

    return (<>
    {lettersRows.map((letters) => {
        line++;
        return(<Box key={"letters-line-" + line}>
            {letters.map((letter)=>{
                return(<Box key={"letter-" + letter}>
                {letter}
                </Box>)
            })}
        </Box>)
    })}
    
    </>)
}