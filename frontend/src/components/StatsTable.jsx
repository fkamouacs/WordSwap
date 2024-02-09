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
  const [ascend, setAscend] = useState(true);


  useEffect(() => {
    setSortedGames(props.games)
  },[props.games])

 const getNumGuesses = (game) => {
    const winnerSteps = game.steps.filter((step) => step.player == game.winner)
    const winnerGuesses = winnerSteps.filter(step => step.action.substring(0,4) == "guess")
    
    return winnerGuesses.length
 }

 useEffect(() => {
  if (sort == "winner a" || sort == "winner d") {
    let temp = props.games;
    const arr = sortWinners(temp) 
    setSortedGames([...sortWinners(temp)])
  } else if (sort == "time a" || sort == "time d") {
    let temp = props.games;
    setSortedGames([...sortTime(temp)])
  }
 }, [sort])


 const sortTime = (arr) => {
  if (ascend) {
    setAscend(!ascend)
    return arr.sort((a,b) => {
      const dateA = a.endTime;
      const dateB = b.endTime;
      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
    
      // names must be equal
      return 0;
    })
  } else {
    setAscend(!ascend)
    return arr.sort((a,b) => {
      const dateA = a.endTime;
      const dateB = b.endTime;
      if (dateA > dateB) {
        return -1;
      }
      if (dateA < dateB) {
        return 1;
      }
    
      // names must be equal
      return 0;
    })
  }
 }


 const sortWinners = (arr) => {

  if (ascend) {
    setAscend(!ascend)
    return arr.sort((a,b)=> {
  
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

 const highlightUser = (p1, p2) => {
    return p1 == props.user || p2 == props.user ? "highlight" : "";
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
            <TableCell align="right" className="sortTable" onClick={()=>{setSort(()=> ascend? "winner a" : "winner d")}}>{ `Winner ${ascend? "↑" : "↓"}`}</TableCell>
            <TableCell align="right" className="sortTable">Guesses to Win</TableCell>
            <TableCell align="right" className="sortTable" onClick={() =>{setSort(()=>ascend? "time a": "time d")}}>{`End Time ${ascend? "↑" : "↓"}`}</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {sortedGames.map((row) => (
            
            <TableRow
            className={`${highlightUser(row.user1.player, row.user2.player)}`}
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
              <TableCell align="right">{getNumGuesses(row)}</TableCell>
              <TableCell align="right">{convertDate(row.endTime)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatsTable;

const convertDate = (date) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const curr = new Date();
  // same day

  date = new Date(date);
  if (
    curr.getFullYear() === date.getFullYear() &&
    curr.getMonth() === date.getMonth() &&
    curr.getDate() === date.getDate()
  ) {
    // same hour
    if ((curr - date) / 3600000 < 1) {
      // same minute
      if ((curr - date) / 1000 < 60) {
        return Math.floor((curr - date) / 1000) + " seconds ago";
      }
      return Math.floor((curr - date) / 60000) + " minutes ago";
    }

    return Math.floor((curr - date) / 3600000) + " hours ago";
  }
  // same year
  if (curr.getFullYear() === date.getFullYear()) {
    return (
      monthNames[date.getMonth()] +
      " " +
      date.getDate() +
      " at " +
      date.getHours() +
      ":" +
      date.getMinutes()
    );
  }

  // different year
  return (
    monthNames[date.getMonth()] +
    " " +
    date.getDate() +
    ", " +
    date.getFullYear() +
    " at " +
    date.getHours() +
    ":" +
    date.getMinutes()
  );
};



