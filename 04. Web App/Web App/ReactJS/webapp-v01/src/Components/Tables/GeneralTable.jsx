import * as React from 'react';
import Paper from '@mui/material/Paper';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Box, Button, Grid, IconButton, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Toolbar, Tooltip, Typography } from '@mui/material';
import SearchBox from '../SearchBox/SearchBox';


/* 
  ------------------------------------------------------- API For General Table -------------------------------------------------------------------------
  +--------------+---------------------------+------------------+---------------------------------------------------------------------------------------+
  |   bodyData   | date, time, amount, other |   string object  | Data for the table body. JSON type object. All data types must be in string format.   | 
  +--------------+---------------------------+------------------+---------------------------------------------------------------------------------------+
  |  headerData  |     id, align, label      |   string object  | Data for the table header. JSON type object. All data types must be in string format. |
  +--------------+---------------------------+------------------+---------------------------------------------------------------------------------------+
  |    title     |  ( Topic of the Table )   |      string      | Topic for the table header.                                                           |
  +--------------+---------------------------+------------------+---------------------------------------------------------------------------------------+
  |  filterData  |(Options for the filtering)|    string list   | Options for the table filter. JSON type list. All data types must be in string format.|
  +--------------+---------------------------+------------------+---------------------------------------------------------------------------------------+
  | filterColumn |(An excisting column name) |      string      | Column name for filtering the table.                                                  |
  +--------------+---------------------------+------------------+---------------------------------------------------------------------------------------+

  NOTE: Always headerData cells and the keyValues of the bodyData must be the same.
*/


// Function to generate table header
function TableHeadGenerator({ order, orderBy, onRequestSort, headerData, buttonDisable }){

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
          {headerData.map((cell) => (
            <TableCell
              key={cell.id}
              align={cell.align}
              sortDirection={orderBy === cell.id ? order : false}
            > 
              <TableSortLabel
                active={cell.id === orderBy}
                direction={orderBy === cell.id ? order : 'asc'}
                onClick={createSortHandler(cell.id)}
                align='center'
                sx={{fontSize:'18px', fontFamily:'system-UI', fontWeight:'bold', }}
              >
                {cell.label}
              </TableSortLabel>              	
            </TableCell>
          ))}
          <TableCell 
            align='center'
            sx={{fontSize:'18px', fontFamily:'system-UI', fontWeight:'bold', }}
            hidden={buttonDisable}
          >
            Options
          </TableCell>
      </TableRow>
    </TableHead>
  );
}

// Function to generate table toolbar
function TableToolbar({title, setSearching, filterList, filter}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    filter(e.target.id);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        width:'100%',
        height:'auto',
        cursor: 'pointer',
        backgroundColor:'rgb(230, 230, 230)',
        padding:0,
      }}
    >      
      <Grid container spacing={2} sx={{ width: '100%', padding:'10px 0 0 0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <Grid item sm={12} md={7} sx={{ 
          height:'auto', 
          alignItems:'center' ,
          display:'flex',
          width:'100%',
          justifyContent: {sm:'space-between', md:'start'}, 
          flexDirection: 'row', 
          padding: {sm:'0 0 10px 0px', md:0},
        }}>
          <Typography
            sx={{ width:'100%', fontFamily:'System-UI', fontWeight:'bold', fontSize:'22px', textAlign:{xs:'center', md:'start'}}}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {title}
          </Typography>
        </Grid>

        <Grid item sm={12} md={4} sx={{ 
          height:'70px', 
          alignItems:'center' ,
          display:'flex',
          width:'100%',
          justifyContent: {sm:'space-between', md:'end'}, 
          flexDirection: 'row', 
          padding: {sm:'0 0px 10px 0px', md:0},
        }}>
          <SearchBox searching={setSearching} />

          <Tooltip title="Filter list">
            <IconButton
              onClick={handleClick}
              sx={{ margin: { xs: '10px 0', md: '0' } }}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem id={null} onClick={handleClose}><em>None</em></MenuItem>
            {filterList.map((item, index) => (
              <MenuItem key={index} id={item} onClick={handleClose}> {item} </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>

    </Toolbar>
  );
}

// Main Function
export default function CustomTable({ headerData, bodyData, title, filterData, filterColumn, buttonDisable, buttonLabel, handleButton }) {
  // Initial States
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [filter, setFilter] = React.useState('');
  const [searching, setSearching] = React.useState('');


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Veryfing Search and filter
/*React.useEffect(()=>{
    console.log(`Filtered: ${filter}     Searched: ${searching}`);
  }, [filter, searching]);
*/

  // Filtering and Sorting data
  const filteredRows = bodyData.filter(row => {
    const matchesSearchTerm = headerData.some(cell => 
      String(row[cell.id]).toLowerCase().includes(searching.toLowerCase())
    );
    const matchesFilter = filter ? row[filterColumn].toLowerCase().includes(filter.toLowerCase()) : true;
    return matchesSearchTerm && matchesFilter;
  });

  const sortedRows = React.useMemo(() => {
    return filteredRows.sort((a, b) => {
      if (orderBy === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return (order === 'asc' ? dateA - dateB : dateB - dateA);
      } else if (orderBy === 'time') {
        const timeA = new Date(`2020-01-01T${a.time}:00`);
        const timeB = new Date(`2020-01-01T${b.time}:00`);
        return (order === 'asc' ? timeA - timeB : timeB - timeA);
      } else if (orderBy === 'amount') {
        return (order === 'asc' ? a.amount - b.amount : b.amount - a.amount);
      } else {
        return (order === 'asc' ? a[orderBy].localeCompare(b[orderBy]) : b[orderBy].localeCompare(a[orderBy]));
      }
    });
  }, [filteredRows, order, orderBy]);

  return (
    <Box sx={{ width: '100%', margin: '20px' }}>
      <Paper 
        sx={{ 
          width: '100%', 
          borderRadius: '15px',
          backgroundColor:'rgb(248, 248, 255, 0.8)',
          overflowX: 'hidden',
        }}
      >
        
        <TableToolbar 
          setSearching={setSearching} 
          title={title} 
          filterList={filterData} 
          filter={setFilter}
        />

        <TableContainer 
          sx={{ 
            width: '100%',
            backgroundColor:'transparent' ,             
            overflow: 'auto',
            maxHeight: '63vh',
          }}
        >
          <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650, width: '100%' }}>
            <TableHeadGenerator 
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headerData={headerData}
              buttonDisable={buttonDisable}
            />

            <TableBody>{ 
              sortedRows.length > 0 ? sortedRows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 }, 
                    cursor: 'pointer', 
                    "&:hover":{backgroundColor:'rgb(179, 179, 179, 0.5)'} }}
                >
                  {headerData.map((cell)=>(
                    <TableCell 
                      key={cell.id}
                      align={cell.align}
                      sx={{fontFamily:'system-UI', fontSize:'16px', fontWeight:'bold'}}
                    >
                      {row[cell.id]}
                    </TableCell>
                  ))}       
                  <TableCell hidden={buttonDisable} align='center'>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={handleButton} 
                      sx={{ color: 'black', 
                            borderColor: 'black', 
                            '&:hover': { 
                              backgroundColor: 'black', 
                              color: 'white', 
                              border: 'none'
                          }}}
                    >
                      {buttonLabel}
                    </Button>
                  </TableCell>           
                </TableRow>
              )):(
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }}} >
                  <TableCell 
                    colSpan={headerData.length} 
                    align="center"  
                    sx={{fontSize:'16px', fontFamily:'system-UI', fontWeight:'bold'}}
                  >
                    No&nbsp;Transaction&nbsp;Records!
                  </TableCell>
                </TableRow>
              )
            }
            </TableBody>
                        
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
