import React from 'react'
import Paper  from '@mui/material/Paper'
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import SendIcon from '@mui/icons-material/Send';

export default function Sidebar() {
  return (
    <Paper sx={{
        background: "#333",
        height:'95vh',
        borderRadius: "25px",
        color: "white",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: "4rem 2rem",
    
    }}>
       
    <Box>
        <SendIcon />
    </Box>
    <Box>
        <SendIcon />
    </Box>
    <Box>
        <SendIcon />
    </Box>
    <Box>
        <SendIcon />
    </Box>
      
    </Paper>
  )
}
