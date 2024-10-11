"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArticleIcon from '@mui/icons-material/Article';
import ChatIcon from '@mui/icons-material/Chat';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérifie si l'utilisateur est authentifié au montage du composant
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          minHeight: '100vh',
          background: 'linear-gradient(to bottom, #EED7F5, #FCCEC2, #C6E1FC)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}

        {/* Menu en bas caché pour la page de connexion */}
        {isAuthenticated && (
          <Box
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              height: '60px',
              backgroundColor: '#fff',
              boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderTop: '1px solid #ddd',
            }}
          >
            <IconButton sx={{ color: 'grey' }} aria-label="Home" onClick={() => router.push('/')}>
              <HomeIcon fontSize="large" />
            </IconButton>
            <IconButton sx={{ color: 'grey' }} aria-label="Calendar" onClick={() => router.push('/calendar')}>
              <CalendarMonthIcon fontSize="large" />
            </IconButton>
            <IconButton sx={{ color: 'grey' }} aria-label="Articles" onClick={() => router.push('/articles')}>
              <ArticleIcon fontSize="large" />
            </IconButton>
            <IconButton sx={{ color: 'grey' }} aria-label="Chatbot" onClick={() => router.push('/chatbot')}>
              <ChatIcon fontSize="large" />
            </IconButton>
          </Box>
        )}
      </body>
    </html>
  );
}
