import React from 'react';
import { Box, Typography, TextField, Accordion, AccordionSummary, AccordionDetails, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function HelpPage() {
  const faqs = [
    { question: "How do I reserve a seat?", answer: "You can reserve a seat by selecting your preferred seat on the booking page after choosing your bus and route." },
    { question: "How do I track the live location of my bus?", answer: "After booking a ticket, you can track the live location of your bus through the 'My Tickets' section in the app." },
    // Add more FAQs here
  ];

  const videos = [
    { title: "How to Register in eConductor", description: "Learn how to create an account.", videoUrl: "https://www.youtube.com/watch?v=dPoB4axnlEs" },
    { title: "How to Book a Ticket", description: "Step-by-step guide to booking a ticket.", videoUrl: "/path/to/video2.mp4" },
    // Add more videos here
  ];

  return (
    <Box width="100%" p={3}>
      {/* Search Bar */}
      <Box mb={4}>
        <TextField fullWidth variant="outlined" placeholder="Search for help..." />
      </Box>

      {/* FAQs Section */}
      <Box mb={6}>
        <Typography variant="h4" mb={2}>Frequently Asked Questions</Typography>
        {faqs.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Guiding Video Series */}
      <Box mb={6}>
        <Typography variant="h4" mb={2}>Guiding Video Series</Typography>
        <Grid container spacing={2}>
          {videos.map((video, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="video"
                  src={video.videoUrl}
                  title={video.title}
                  controls
                />
                <CardContent>
                  <Typography variant="h6">{video.title}</Typography>
                  <Typography variant="body2">{video.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
