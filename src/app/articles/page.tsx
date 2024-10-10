"use client";

import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, TextField, Button, Box } from '@mui/material';
import { articles } from './articles';

export default function Articles() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Filtrer les articles selon le terme recherché et le tag sélectionné
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedTag === '' || article.tags.includes(selectedTag))
  );

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Articles and Tips Page
      </Typography>

      {/* Champ de recherche */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <TextField
          label="Recherche..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: '50%',
            backgroundColor: '#F4716A',
            borderRadius: '10px',
            input: { color: 'white' },
            label: { color: 'white' }
          }}
        />
      </Box>

      {/* Boutons de tags */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        {['nutrition', 'sport', 'psychologie', 'santé', 'bien-être'].map((tag, index) => (
          <Button
            key={index}
            variant={selectedTag === tag ? 'contained' : 'outlined'}
            onClick={() => setSelectedTag(tag === selectedTag ? '' : tag)} // Sélection/déselection
            sx={{
              margin: '0 5px',
              color: selectedTag === tag ? 'white' : '#F4716A',
              backgroundColor: selectedTag === tag ? '#F4716A' : 'white',
              borderColor: '#F4716A',
              '&:hover': { backgroundColor: '#F4716A', color: 'white' }
            }}
          >
            {tag}
          </Button>
        ))}
      </Box>

      {/* Grille des articles */}
      <Grid container spacing={2} justifyContent="center">
        {filteredArticles.map((article, index) => (
          <Grid item xs={12} sm={6} key={index}> {/* Affiche 2 articles par ligne */}
            <Card 
              sx={{ 
                backgroundColor: '#F4716A', 
                borderRadius: '10px',
                color: 'white',
                maxWidth: 450,
                margin: '0 auto'
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={article.image}
                alt={article.title}
                sx={{ borderRadius: '10px 10px 0 0' }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                  {article.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
