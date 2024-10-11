"use client";

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuItem, Button, Fade, Menu, LinearProgress } from '@mui/material';
import { anecdote } from './anecdote';
import { useRouter } from 'next/navigation';

export default function HomeScreen() {
  const router = useRouter();
  const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  const handleAccountMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAccountAnchorEl(null);
  };

  const handleLogout =() => {
    router.push('/login');
  }

  // Get current date
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Calculer la progression basée sur la semaine sélectionnée (par exemple, 40 semaines de grossesse)
  const progress = selectedWeek !== null ? (selectedWeek / 40) * 100 : 0;

  return (
    <Box>
      {/* Titre et Menu */}
      <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
        <Typography variant={'h4'} color='#F4716A'>
          Way Out
        </Typography>
        <IconButton
          onClick={handleAccountMenuClick}
          size="medium"
          sx={{ position: 'absolute', right: 0 }}
        >
          <MenuIcon fontSize="medium" color='inherit'/>
        </IconButton>
      </Box>

      {/* MUI Menu */}
      <Menu
        anchorEl={accountAnchorEl}
        id="account-menu"
        open={Boolean(accountAnchorEl)}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Avatar sx={{ width: 24, height: 24 }} />
          Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Boutique</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Synchroniser</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Notifications</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Settings</MenuItem>
      </Menu>

      {/* Date */}
      <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 1 }} color='#F4716A'>
        {currentDate}
      </Typography>

      {/* Image, Background Color, et Ellipse */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 1, position: 'relative', backgroundImage: 'url("/assets/background-image.png")', backgroundSize: 'cover', backgroundPosition: 'center', padding: '20px' }}>
        {/* Background rond avec mouvement de va-et-vient */}
        <Box
          sx={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            backgroundColor: 'rgba(244, 113, 106, 0.1)',
            borderRadius: '50%',
            zIndex: 0,
            animation: 'circularMove 9s ease-in-out infinite',
            transformOrigin: 'center',
            top: 'calc(50% - 100px)',
            left: 'calc(50% - 100px)',
          }}
        />

        {/* Deuxième background rond statique */}
        <Box
          sx={{
            position: 'absolute',
            width: '180px',
            height: '180px',
            backgroundColor: 'rgba(244, 113, 106, 0.1)',
            borderRadius: '50%',
            top: 'calc(50% - 90px)',
            left: 'calc(50% - 90px)',
            zIndex: 0,
          }}
        />

        <img src={'/assets/image-accueil.png'} alt="Embryo" style={{ width: '150px', height: 'auto', position: 'relative', zIndex: 1 }} />

        {/* Ellipse en dessous de l'embryon */}
        <Box
          sx={{
            position: 'absolute',
            top: '170px',
            width: '80px',
            height: '10px',
            backgroundColor: '#F4716A',
            borderRadius: '50%',
            background: 'linear-gradient(to bottom, #d6716a, #F4716A, #d6716a)',
            opacity: 0.4,
            zIndex: 1,
          }}
        />
      </Box>

      {/* Scroll horizontal */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          overflowX: 'scroll',
          mt: 2,
          px: 1,
          '&::-webkit-scrollbar': {
            height: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#F4716A',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#e05b52',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f0f0f0',
            margin: '0 15px',
          },
        }}
      >
        {Array.from({ length: 40 }, (_, i) => (
          <Button
            key={i}
            onClick={() => setSelectedWeek(i)}
            sx={{
              minWidth: '60px',
              padding: '5px',
              textAlign: 'center',
              border: '1px solid #F4716A',
              borderRadius: '50%',
              margin: '0 5px',
              backgroundColor: selectedWeek === i ? '#F4716A' : '#f0f0f0', // Changer la couleur du fond
              color: selectedWeek === i ? '#fff' : '#F4716A', // Changer la couleur du texte
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, color 0.3s ease',
              '&:hover': {
                backgroundColor: selectedWeek === i ? '#F4716A' : '#e0e0e0',
              },
            }}
          >
            <Typography variant="body2">{i + 1}</Typography>
          </Button>
        ))}
      </Box>

      {/* Anecdote */}
      <Box>
        {selectedWeek !== null && (
          <Fade in unmountOnExit>
            <Box
              sx={{
                backgroundColor: '#fff', // Fond blanc
                borderRadius: '10px', // Bords arrondis
                padding: '16px', // Padding interne pour éviter que le texte soit collé
                margin: '16px', // Marges pour espacer la box des autres éléments
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Légère ombre pour effet de profondeur
              }}
            >
              <Typography margin={1} variant="caption" sx={{ textAlign: 'center', color:'#F4716A' }}>
                {anecdote[selectedWeek]}
              </Typography>
            </Box>
          </Fade>
        )}
      </Box>

      {/* Linear Progress */}
      <Box margin={5}>
        <Box
          sx={{
            backgroundColor: '#F4716A',
            borderRadius: '10px',
            padding: 2,
            marginTop: 2,
            color: 'white',
          }}
        >
          <Typography variant="h6" align="center">Progression de la grossesse</Typography>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2">Semaine {selectedWeek !== null ? selectedWeek + 1 : 1} sur 40</Typography>
            <LinearProgress variant="determinate" value={progress} sx={{ mt: 2, height: '10px', borderRadius: '5px', backgroundColor: '#f0f0f0' }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// Animation CSS pour le mouvement de va-et-vient
const styles = `
@keyframes circularMove {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg); 
  }
  50% {
    transform: translate(12px, 6px) rotate(160deg);
  }
}
`;

document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);
