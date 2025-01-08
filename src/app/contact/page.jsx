"use client"
import React , { useState }from 'react';
import { Box, TextField, Button, Typography, Grid, Container } from '@mui/material';
export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mailToLink = `mailto:gnfeventspakistan@gmail.com?subject=Contact%20Us%20Form%20Submission&body=` +
      `Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AComment: ${formData.comment}`;

    window.location.href = mailToLink;
  };
  return (
    <>
      <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'hsl(204, 91%, 25%)',
        color: 'white',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: 4,
            borderRadius: 2,
            boxShadow: '0 4px 15px rgba(255, 255, 255, 0.5)',
            border: '2px solid white',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ color: 'white' }}>
            Contact Us
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  variant="outlined"
                  required
                  InputLabelProps={{ style: { color: 'grey' } }}
                  InputProps={{
                    style: { color: 'black', backgroundColor: 'white' },
                  }}
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  required
                  InputLabelProps={{ style: { color: 'grey' } }}
                  InputProps={{
                    style: { color: 'black', backgroundColor: 'white' },
                  }}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  variant="outlined"
                  InputLabelProps={{ style: { color: 'grey' } }}
                  InputProps={{
                    style: { color: 'black', backgroundColor: 'white' },
                  }}
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Comment"
                  name="comment"
                  variant="outlined"
                  multiline
                  rows={4}
                  required
                  InputLabelProps={{ style: { color: 'grey' } }}
                  InputProps={{
                    style: { color: 'black', backgroundColor: 'white' },
                  }}
                  placeholder="Enter your comment"
                  value={formData.comment}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Box mt={3} display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: 'hsl(204, 91%, 25%)',
                  color: 'white',
                  px: 6,
                  py: 1.5,
                  border: '2px solid white',
                  boxShadow: '0 4px 15px rgba(255, 255, 255, 0.5)',
                  fontSize: '1.1rem',
                }}
              >
                Send
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </Box>
    </>
  )
}
