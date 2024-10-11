"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false); 
  
    const handleLogin = () => {
      if (username && password) {
        // Simuler une connexion réussie en définissant l'état dans localStorage
        localStorage.setItem('isAuthenticated', 'true');
        router.push('/'); // Rediriger vers la page d'accueil
      } else {
        setError(true); 
      }
    };
  
    const handleCloseError = () => {
      setError(false);
    };
  
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{
          background: 'linear-gradient(to bottom, #EED7F5, #FCCEC2, #C6E1FC)',
        }}
      >
        <img
          src="/assets/logo-login.png"
          alt="Logo"
          style={{ width: '350px', height: 'auto', marginBottom: '20px' }}
        />
        <h2 style={{ color: '#F4716A' }}>Connexion</h2>
  
        <Box
          sx={{
            border: '3px solid white',
            borderRadius: '10px',
            margin: '20px',
            padding:'20px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          <TextField
            label="Nom d'utilisateur"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              marginBottom: 2,
              backgroundColor: 'white',
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: '#F4716A' },
                '& input': { color: '#F4716A' },
              },
            }}
          />
          <TextField
            label="Mot de passe"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              marginBottom: 2,
              backgroundColor: 'white',
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: '#F4716A' },
                '& input': { color: '#F4716A' },
              },
            }}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#F4716A',
              color: 'white',
              '&:hover': { backgroundColor: '#d96158' },
            }}
            onClick={handleLogin}
          >
            Connexion
          </Button>
        </Box>
  
        <Snackbar
          open={error}
          autoHideDuration={6000}
          onClose={handleCloseError}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
            Veuillez remplir tous les champs.
          </Alert>
        </Snackbar>
      </Box>
    );
  }