"use client";
import React, { useState, useEffect } from "react";

import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Chip } from "@mui/material";
import Stack from '@mui/material/Stack';


const [metaMask, hooks] = initializeConnector(
  actions => new MetaMask({ actions })
);
const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider } =
  hooks;
const contractChain = 11155111;

const contractAddress = "0xa88160f2Ae70830890359364c8988b67705e4118";

export default function Page() {
  const chainId = useChainId();
  const accounts = useAccounts();
  const isActive = useIsActive();

  const provider = useProvider();
  const [error, setError] = useState(undefined);

  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug("Failed to connect  to metamask");
    });
  }, []);

  const handleConnect = () => {
    metaMask.activate(contractChain);
  };

  const handleDisconnect = () => {
    metaMask.resetState();
  };

  const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);



  return (
    <div>
      
     


      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <p>chainId: {chainId}</p>
          </Typography> 

           
       
       {isActive ? (
              <Stack direction="row" spacing={1}>
            <Chip label={accounts ? accounts[0] : ""} variant="outlined" />
    
          <Button color="inherit" onClick={handleDisconnect}>
                Disconnect
              </Button> </Stack>
            ) : (
              <Button color="inherit" onClick={handleConnect}>
                Connect
              </Button>
            )}
      

        </Toolbar>
      </AppBar>
    </Box>



  

      
    </div>
  );
}
// w3school - React Ternary operator https://www.w3schools.com/react/react_es6_ternary.asp