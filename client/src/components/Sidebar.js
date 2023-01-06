import React from 'react'
import Paper  from '@mui/material/Paper'
import Box from '@mui/material/Box';

import PhotoIcon from '@mui/icons-material/Photo';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

export default function Sidebar() {
  return (
    <Paper sx={{
        background: "#333",
        height:'100vh',
        borderRadius: 0,
        color: "white",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: "4rem 2rem",
    
    }} elevation={3}>
       
    <Box>
        <PhotoIcon fontSize='large'/>
    </Box>
    <Box>
        <AddPhotoAlternateIcon fontSize='large' />
    </Box>
    <Box>
        <AddPhotoAlternateIcon fontSize='large' />
    </Box>
    <Box>
        <AddPhotoAlternateIcon fontSize='large' />
    </Box>
      
    </Paper>
  )
}
