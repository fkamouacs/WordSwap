import {React, useEffect, useState} from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios"

const StatsTable = (props) => {

  

  const getNumGuesses = () => {};

 


 


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
            <TableCell align="right">Winner</TableCell>
            <TableCell align="right">Guesses to Win</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.games.map((row) => (
            
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
