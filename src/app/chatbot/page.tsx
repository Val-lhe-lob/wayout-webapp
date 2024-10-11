"use client";

import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { user: 'Nanny Bot', text: 'Bonjour, je suis Nanny Bot, je suis votre assistant personnel de grossesse. Comment puis-je vous aider ?' }
  ]); // Message de bienvenue par défaut
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { user: 'Vous', text: input }]);
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: 'Chatbot', text: 'Le chatbot est en cours de chantier, veuillez repasser plus tard.' }
      ]);
      setInput('');
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ background: 'linear-gradient(to bottom, #EED7F5, #FCCEC2, #C6E1FC)', padding: '20px' }}
    >
      <Typography variant="h4" color="#F4716A" sx={{ marginBottom: '20px' }}>
        Nanny Bot
      </Typography>

      <Box
        sx={{
          border: '1px solid #ccc',
          padding: '20px',
          width: '100%',
          maxWidth: '500px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box
          sx={{
            height: '300px',
            overflowY: 'auto',
            marginBottom: '20px',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            backgroundColor: '#f9f9f9',
          }}
        >
          {messages.map((message, index) => (
            <div key={index} style={{ margin: '10px 0' }}>
              <strong>{message.user}:</strong> {message.text}
            </div>
          ))}
        </Box>

        <Box sx={{ display: 'flex' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Tapez votre message..."
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            sx={{ marginRight: '10px' }}
          />
          <Button
            onClick={handleSendMessage}
            sx={{ backgroundColor: '#F4716A', color: 'white', padding: '10px' }}
          >
            Envoyer
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
