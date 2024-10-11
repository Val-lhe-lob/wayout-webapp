"use client";

import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Modal, TextField, Button, Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Importer l'icône de suppression
import dayjs, { Dayjs } from 'dayjs';

// Styles de couleur personnalisée pour les événements
const customDayStyles = (day: Dayjs, events: Record<string, string>) => {
  const formattedDate = day.format('YYYY-MM-DD');
  return events[formattedDate]
    ? { backgroundColor: '#F4716A', color: 'white' } // Couleur pour les dates avec événements
    : {};
};

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [events, setEvents] = useState<Record<string, string>>({}); // Stocke les événements (date -> titre)

  // Ouvrir le modal pour ajouter un événement
  const handleDateClick = (date: Dayjs | null) => {
    setSelectedDate(date);
    setOpenModal(true);
  };

  // Ajouter l'événement à la date sélectionnée
  const handleAddEvent = () => {
    if (selectedDate && eventTitle) {
      const formattedDate = selectedDate.format('YYYY-MM-DD');
      setEvents((prev) => ({ ...prev, [formattedDate]: eventTitle }));
      setOpenModal(false);
      setEventTitle('');
    }
  };

  // Supprimer un événement
  const handleDeleteEvent = (date: string) => {
    setEvents((prev) => {
      const updatedEvents = { ...prev };
      delete updatedEvents[date];
      return updatedEvents;
    });
  };

  // Récupérer la liste des événements triés par date
  const sortedEvents = Object.entries(events).sort((a, b) => dayjs(a[0]).diff(dayjs(b[0])));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{ background: 'linear-gradient(to bottom, #EED7F5, #FCCEC2, #C6E1FC)', paddingBottom: '50px' }}
      >
        <Typography variant="h4" color="#F4716A" sx={{ marginBottom: '20px' }}>
          Calendrier
        </Typography>

        {/* Calendrier */}
        <DateCalendar
          value={selectedDate}
          onChange={(newDate) => handleDateClick(newDate)}
          renderDay={(day, _value, DayComponentProps) => (
            <Box sx={customDayStyles(day, events)}>
              <DayComponentProps.Day {...DayComponentProps} />
            </Box>
          )}
        />

        {/* Liste des événements */}
        <Typography variant="h6" sx={{ marginTop: 4, color: '#F4716A' }}>
          Liste des événements
        </Typography>
        <List sx={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '50px' }}>
          {sortedEvents.map(([date, title]) => (
            <ListItem key={date} secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteEvent(date)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={title} secondary={dayjs(date).format('DD/MM/YYYY')} />
            </ListItem>
          ))}
        </List>

        {/* Modal pour ajouter un événement */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 300,
              bgcolor: 'background.paper',
              p: 4,
              borderRadius: '8px',
              boxShadow: 24,
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Ajouter un événement
            </Typography>
            <TextField
              label="Titre de l'événement"
              variant="outlined"
              fullWidth
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <Button variant="contained" fullWidth sx={{ backgroundColor: '#F4716A', color: 'white' }} onClick={handleAddEvent}>
              Ajouter
            </Button>
          </Box>
        </Modal>
      </Box>
    </LocalizationProvider>
  );
}
