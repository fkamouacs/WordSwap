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




// const StatsTable = (props) => {
  
//   const columns = [
//     { field: 'id', headerName: 'Game ID' },
//     { field: 'p1', headerName: 'Player 1' },
//     { field: 'p2', headerName: 'Player 2' },
//     { field: 'p1Word', headerName: 'Player 1 Word Choice' },
//     { field: 'p2Word', headerName: 'Player 2 Word Choice' },
//     { field: 'winner', headerName: 'Winner' },
//     { field: 'guesses', headerName: 'Guesses to Win' },
//   ]

//   const [rows, setRows] = useState([]);
  
//  useEffect(() => {

//   for (let i = 0; i < props.games.length; i++) {
//     console.log(props.usernames)
//     setRows((r) => ([...r, {id: props.games[i]._id, p1: props.usernames[props.games[i].user1.player], p2: props.usernames[props.games[i].user2.player],
//       p1Word: props.games[i].user1.wordChoice, p2Word: props.games[i].user1.wordChoice, winner: props.games[i].winner, guesses: getNumGuesses(),
    
//     }]))
//   }

//  },[props.usernames])


//  const getNumGuesses = () => {

//  }

//   console.log(props.games)
//   return (
//     <Box sx={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: {
//               pageSize: 5,
//             },
//           },
//         }}
//         pageSizeOptions={[5]}
    
//       />
//     </Box>)
// }

// export default StatsTable




// const StatsTable = (props) => {
//   const [order, setOrder] = useState('asc');
//   const [orderBy, setOrderBy] = useState('calories');
//   const [selected, setSelected] = useState([]);
//   const [page, setPage] = useState(0);
//   const [dense, setDense] = useState(false);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
  
//   const getNumGuesses = () => {};
  
//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };
  
//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = props.games.map((n) => n._id);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   function descendingComparator(a, b, orderBy) {
//     if (b[orderBy] < a[orderBy]) {
//       return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//       return 1;
//     }
//     return 0;
//   }

//   function getComparator(order, orderBy) {
//     return order === 'desc'
//       ? (a, b) => descendingComparator(a, b, orderBy)
//       : (a, b) => -descendingComparator(a, b, orderBy);
//   }
  
//   const visibleRows = useMemo(
//     () =>
//       stableSort(props.games, getComparator(order, orderBy)).slice(
//         page * rowsPerPage,
//         page * rowsPerPage + rowsPerPage,
//       ),
//     [order, orderBy, page, rowsPerPage],
//   );
//   const isSelected = (id) => selected.indexOf(id) !== -1;
 
//   const handleClick = (event, id) => {
//     const selectedIndex = selected.indexOf(id);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }
//     setSelected(newSelected);
//   };

//   return (
//     <TableContainer>
//       <Table size="small" aria-label="stats table">
//         {/* <TableHead>
//           <TableRow>
//             <TableCell>Game ID</TableCell>
//             <TableCell align="right">Player 1</TableCell>
//             <TableCell align="right">Player 2</TableCell>
//             <TableCell align="right">Player 1 Word Choice</TableCell>
//             <TableCell align="right">Player 2 Word Choice</TableCell>
//             <TableCell align="right">Winner</TableCell>
//             <TableCell align="right">Guesses to Win</TableCell>
//           </TableRow>
//         </TableHead> */}
//          <EnhancedTableHead
//               numSelected={selected.length}
//               order={order}
//               orderBy={orderBy}
//               onSelectAllClick={handleSelectAllClick}
//               onRequestSort={handleRequestSort}
//               rowCount={props.games.length}
//             />
//         <TableBody>
//         {visibleRows.map((row, index) => {
//                 const isItemSelected = isSelected(row.id);
//                 const labelId = `enhanced-table-checkbox-${index}`;

//                 return (
//                   <TableRow
//                     hover
//                     onClick={(event) => handleClick(event, row.id)}
//                     role="checkbox"
//                     aria-checked={isItemSelected}
//                     tabIndex={-1}
//                     key={row._id}
//                     selected={isItemSelected}
//                     sx={{ cursor: 'pointer' }}
//                   >
                    
//                     <TableCell
//                       component="th"
//                       id={labelId}
//                       scope="row"
//                       padding="none"
//                     >
//                       {row._id}
//                     </TableCell>
//                     <TableCell align="right">{props.usernames[row.user1.player]}</TableCell>
//                     <TableCell align="right">{props.usernames[row.user2.player]}</TableCell>
//                     <TableCell align="right">{row.user1.wordChoice}</TableCell>
//                     <TableCell align="right">{row.user2.wordChoice}</TableCell>
//                   </TableRow>
//                 );
//               })}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default StatsTable;



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


const headCells = [
  {
    id: 'player1',
    numeric: false,
    disablePadding: true,
    label: 'Player 1',
  },
  {
    id: 'player2',
    numeric: false,
    disablePadding: false,
    label: 'Player 2',
  },
  {
    id: 'p1Word',
    numeric: false,
    disablePadding: false,
    label: 'Player 1 Word Choice',
  },
  {
    id: 'p2Word',
    numeric: false,
    disablePadding: false,
    label: 'Player 2 Word Choice',
  },
  {
    id: 'winner',
    numeric: false,
    disablePadding: false,
    label: 'Winner',
  },
  {
    id: 'guesses',
    numeric: false,
    disablePadding: false,
    label: 'Guess to Win',
  },
];


function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
