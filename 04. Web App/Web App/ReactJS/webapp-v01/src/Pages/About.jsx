import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar, Button } from '@mui/material';
import teamImage from '../Images/passenger.jpg'; // Replace with your team image path

export default function AboutUs() {
  const teamMembers = [
    { name: "John Doe", title: "CEO", bio: "John is the visionary behind eConductor.", avatar: "../Images/Busowner.jpg" },
    { name: "Jane Smith", title: "CTO", bio: "Jane leads the technology team with a focus on innovation.", avatar: "/path/to/avatar2.jpg" },
    // Add more team members here
  ];

  return (
    <Box p={3} width="100%">
      {/* Header Section */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" mb={2}>About Us</Typography>
        <Typography variant="h6">Empowering the Future of Public Transportation</Typography>
      </Box>

      {/* Our Story */}
      <Box mb={6}>
        <Typography variant="h4" mb={2}>Our Story</Typography>
        <Typography variant="body1" mb={2}>
          eConductor started with a simple idea: to make public transportation more efficient and accessible for everyone. 
          Over the years, we've grown into a leading platform for bus ticket booking and management, offering live bus tracking, 
          easy seat reservation, and more.
        </Typography>
        <Typography variant="body1">
          From our humble beginnings, we've expanded our services to meet the growing needs of passengers and bus operators alike. 
          Today, eConductor is a trusted name in the industry, known for our commitment to innovation and customer satisfaction.
        </Typography>
      </Box>

      {/* Mission & Vision */}
      <Box mb={6}>
        <Typography variant="h4" mb={2}>Our Mission & Vision</Typography>
        <Typography variant="h6" mb={1}>Mission:</Typography>
        <Typography variant="body1" mb={2}>
          To revolutionize public transportation by providing a seamless, user-friendly platform that connects passengers and bus operators, 
          enhancing the travel experience for everyone.
        </Typography>
        <Typography variant="h6" mb={1}>Vision:</Typography>
        <Typography variant="body1">
          To be the global leader in public transportation solutions, ensuring safe, reliable, and sustainable travel for millions of people every day.
        </Typography>
      </Box>

      {/* Our Values */}
      <Box mb={6}>
        <Typography variant="h4" mb={2}>Our Values</Typography>
        <Typography variant="body1" mb={1}>- Customer Focus: We prioritize the needs and satisfaction of our customers in every decision we make.</Typography>
        <Typography variant="body1" mb={1}>- Innovation: We embrace technology and creativity to drive progress in public transportation.</Typography>
        <Typography variant="body1" mb={1}>- Integrity: We conduct our business with honesty and transparency.</Typography>
        <Typography variant="body1" mb={1}>- Community: We believe in contributing to the communities we serve.</Typography>
        <Typography variant="body1">- Sustainability: We are committed to promoting environmentally responsible practices.</Typography>
      </Box>

      {/* Meet the Team */}
      <Box mb={6}>
        <Typography variant="h4" mb={2}>Meet the Team</Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <Box display="flex" flexDirection="column" alignItems="center" p={2}>
                  <Avatar src={member.avatar} alt={member.name} sx={{ width: 100, height: 100, mb: 2 }} />
                  <Typography variant="h6">{member.name}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">{member.title}</Typography>
                  <Typography variant="body2" mt={1} textAlign="center">{member.bio}</Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Our Impact */}
      <Box mb={6}>
        <Typography variant="h4" mb={2}>Our Impact</Typography>
        <Typography variant="body1" mb={1}>- 1 Million+ Tickets Booked</Typography>
        <Typography variant="body1" mb={1}>- 500+ Buses Registered</Typography>
        <Typography variant="body1">- 50,000+ Satisfied Customers</Typography>
      </Box>

      {/* Contact Information */}
      <Box mb={6}>
        <Typography variant="h4" mb={2}>Contact Us</Typography>
        <Typography variant="body1" mb={1}>Email: support@econductor.com</Typography>
        <Typography variant="body1" mb={1}>Phone: +123 456 7890</Typography>
        <Typography variant="body1">Follow us on social media:</Typography>
        {/* Add social media icons/links here */}
      </Box>

      {/* Call to Action */}
      <Box textAlign="center" mt={6}>
        <Typography variant="h5" mb={3}>Ready to Join Us?</Typography>
        <Button variant="contained" color="primary">Sign Up Now</Button>
      </Box>
    </Box>
  );
}
