"use client";

import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArticleIcon from '@mui/icons-material/Article';
import ChatIcon from '@mui/icons-material/Chat';
import { useRouter, usePathname } from 'next/navigation'; // Import du router et de usePathname

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter(); // Utilisation du hook useRouter pour la navigation
  const pathname = usePathname(); // Utilisation de usePathname pour récupérer l'URL actuelle

  // Fonction pour déterminer la couleur de l'icône
  const getColor = (path: string) => (pathname === path ? '#8461D5' : 'grey');

  return (
    <html lang="en">
      <body style={{ 
        margin: 0, 
        padding: 0, 
        minHeight: '100vh', 
        background: 'linear-gradient(to bottom, #EED7F5, #FCCEC2, #C6E1FC)', 
        display: 'flex', 
        flexDirection: 'column' 
      }}>
        {children}

        {/* Footer Menu */}
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
          {/* Home Button */}
          <IconButton 
            sx={{ color: getColor('/') }}
            aria-label="Home"
            onClick={() => router.push('/')} // Navigation programmatique
          >
            <HomeIcon fontSize="large" />
          </IconButton>

          {/* Calendar Button */}
          <IconButton 
            sx={{ color: getColor('/calendar') }}
            aria-label="Calendar"
            onClick={() => router.push('/calendar')} // Navigation programmatique
          >
            <CalendarMonthIcon fontSize="large" />
          </IconButton>

          {/* Tips/Articles Button */}
          <IconButton 
            sx={{ color: getColor('/articles') }}
            aria-label="Articles"
            onClick={() => router.push('/articles')} // Navigation programmatique
          >
            <ArticleIcon fontSize="large" />
          </IconButton>

          {/* Chatbot Button */}
          <IconButton 
            sx={{ color: getColor('/chatbot') }}
            aria-label="Chatbot"
            onClick={() => router.push('/chatbot')} // Navigation programmatique
          >
            <ChatIcon fontSize="large" />
          </IconButton>
        </Box>
      </body>
    </html>
  );
}
