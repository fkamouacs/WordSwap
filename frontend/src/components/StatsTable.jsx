/* eslint-disable react/prop-types */
import {React, useEffect, useState, useMemo} from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';
import { DataGrid } from '@mui/x-data-grid';
import Paper from "@mui/material/Paper";
import axios from "axios"




const StatsTable = (props) => {

  const [sort, setSort] = useState("");
  const [sortedGames, setSortedGames] = useState(props.games);
  const [ascend, setAscend] = useState(false);


  useEffect(() => {
    setSortedGames(props.games)
  },[props.games])

 const getNumGuesses = () => {

 }

 useEffect(() => {
  if (sort == "winner a" || sort == "winner d") {
    let temp = props.games;
    const arr = sortWinners(temp) 
    setSortedGames([...sortWinners(temp)])
  }
 }, [sort])


 const sortWinners = (arr) => {

  if (!ascend) {
    setAscend(!ascend)
    return arr.sort((a,b)=> {
      console.log(a)
      const nameA = a.winner.toUpperCase();
      const nameB = b.winner.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      // names must be equal
      return 0;
    })
  } else {
    setAscend(!ascend)
    return arr.sort((a,b)=> {
      console.log(a)
      const nameA = a.winner.toUpperCase();
      const nameB = b.winner.toUpperCase();
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
    
      // names must be equal
      return 0;
    })
  }

  
 }

  return (
    <TableContainer>
      <Table size="small" aria-label="stats table">
        <TableHead>
          <TableRow>
            <TableCell>Game ID</TableCell>
            <TableCell align="right">Player 1</TableCell>
            <TableCell align="right">Player 2</TableCell>
            <TableCell align="right">Player 1 Word Choice</TableCell>
            <TableCell align="right">Player 2 Word Choice</TableCell>
            <TableCell align="right" onClick={()=>{setSort(()=> ascend? "winner a" : "winner d")}}>Winner</TableCell>
            <TableCell align="right">Guesses to Win</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {sortedGames.map((row) => (
            
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
          
              <TableCell component="th" scope="row">
                {row._id}
              </TableCell>
              <TableCell align="right">{props.usernames[row.user1.player]}</TableCell>
              <TableCell align="right">{props.usernames[row.user2.player]}</TableCell>
              <TableCell align="right">{row.user1.wordChoice}</TableCell>
              <TableCell align="right">{row.user2.wordChoice}</TableCell>
              <TableCell align="right">{props.usernames[row.winner]}</TableCell>
              <TableCell align="right">{getNumGuesses()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatsTable;




