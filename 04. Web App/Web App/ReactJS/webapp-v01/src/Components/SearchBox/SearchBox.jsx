import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: alpha(theme.palette.common.white, 0.7),
  border: '2px solid rgb(0,0,0,0.5)',
  borderRadius: '15px',  
  margin:'0 20px', 
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.5),
  },
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar({searching}) {
  const [search, setSearch] = React.useState('');

  const handleSearch = (e) =>{

    setSearch(e.target.value);
  }

  React.useEffect(()=>{
    //console.log(`searching: ${search}`);
    searching(search);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[search])

  return (
    <Search>
        <SearchIcon sx={{
            padding: '0 2px 0 13px',
            width: '35px',
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}/>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleSearch}
        value={search}
      />
    </Search>
  );
}
