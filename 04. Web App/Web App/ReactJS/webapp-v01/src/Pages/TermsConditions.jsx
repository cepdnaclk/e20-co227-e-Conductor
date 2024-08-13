import { Box, Typography, Container } from '@mui/material';
import React from 'react';

export default function TermsAndConditions() {
  return (
    <Container maxWidth="md">
      <Box py={4}>
        <Typography variant="h4" gutterBottom>
          Terms and Conditions
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          1. Introduction
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to e-conductor! These Terms and Conditions outline the rules and regulations for the use of our website and services.
          By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use [Your Company Name]'s website if you do not accept all of the terms and conditions stated on this page.
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. Intellectual Property Rights
        </Typography>
        <Typography variant="body1" paragraph>
          Unless otherwise stated, e-conductor and/or its licensors own the intellectual property rights for all material on this website.
          All intellectual property rights are reserved. You may view and/or print pages from [Your URL] for your own personal use, subject to restrictions set in these terms and conditions.
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. Restrictions
        </Typography>
        <Typography variant="body1" paragraph>
          You are specifically restricted from all of the following:
        </Typography>
        <ul>
          <Typography component="li" variant="body1" paragraph>
            Publishing any website material in any other media;
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            Selling, sublicensing, and/or otherwise commercializing any website material;
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            Using this website in any way that is, or may be, damaging to this website;
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            Using this website in any way that impacts user access to this website;
          </Typography>
          {/* Add more points as necessary */}
        </ul>

        <Typography variant="h6" gutterBottom>
          4. Your Privacy
        </Typography>
        <Typography variant="body1" paragraph>
          Please read our Privacy Policy.
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Governing Law & Jurisdiction
        </Typography>
        <Typography variant="body1" paragraph>
          These Terms will be governed by and interpreted in accordance with the laws of Sri Lanka, and you submit to the non-exclusive jurisdiction of the state and federal courts located in [Your Country/State] for the resolution of any disputes.
        </Typography>

        {/* Add more sections as needed */}
      </Box>
    </Container>
  );
}
