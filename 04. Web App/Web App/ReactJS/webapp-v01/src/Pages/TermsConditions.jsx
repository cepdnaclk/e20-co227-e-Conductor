import React from 'react';
import { Box } from '@mui/material';
import Texts from '../Components/InputItems/Texts';
import { ViewFadeIn } from '../Components/Animations/Entrance.View';

const TermsAndConditions = () => {
  return (
    <Box padding="40px 7%" bgcolor={'ghostwhite'}>
      <Texts variant="h3" textAlign="center" gutterBottom whiteSpace='normal'>
        Terms and Conditions
      </Texts>

      <ViewFadeIn duration={2000}>
        <Texts variant="h6" gutterBottom>
          1. Introduction
        </Texts>
        <Texts variant="body1" paragraph whiteSpace='normal' textAlign='justify'>
          Welcome to the e-conductor bus ticket booking app. By accessing and using our services, you agree to comply with the following terms and conditions. Please read them carefully.
        </Texts>
      </ViewFadeIn>

      <ViewFadeIn duration={2000}>
        <Texts variant="h6" gutterBottom>
          2. Account Registration
        </Texts>
        <Texts variant="body1" paragraph whiteSpace='normal' textAlign='justify'>
          You must be at least 18 years old to create an account.<br/>
          You are responsible for maintaining the confidentiality of your account credentials and all activities that occur under your account.
        </Texts>
      </ViewFadeIn>

      <ViewFadeIn duration={2000}>
        <Texts variant="h6" gutterBottom>
          3. Booking and Payments
        </Texts>
        <Texts variant="body1" paragraph whiteSpace='normal' textAlign='justify'>
          All bookings are subject to availability and confirmation.<br/>
          Prices for tickets may vary depending on factors like demand and route.<br/>
          Payments must be made through the provided payment gateways, and all transactions are secure.
        </Texts>
      </ViewFadeIn>

      <ViewFadeIn duration={2000}>
        <Texts variant="h6" gutterBottom>
          4. Cancellations and Refunds
        </Texts>
        <Texts variant="body1" paragraph whiteSpace='normal' textAlign='justify'>
          Cancellations must be made within the time frame specified for the selected service.<br/>
          Refunds are processed according to our cancellation policy. Some services may have non-refundable conditions.
        </Texts>
      </ViewFadeIn>

      <ViewFadeIn duration={2000}>
        <Texts variant="h6" gutterBottom>
          5. Code of Conduct
        </Texts>
        <Texts variant="body1" paragraph whiteSpace='normal' textAlign='justify'>
          You agree not to misuse our services, including attempting unauthorized access or disrupting the system.<br/>
          Harassment, abuse, or inappropriate behavior towards other users or staff is prohibited.
        </Texts>
      </ViewFadeIn>
      
      <ViewFadeIn duration={2000}>
        <Texts variant="h6" gutterBottom>
          6. Intellectual Property
        </Texts>
        <Texts variant="body1" paragraph whiteSpace='normal' textAlign='justify'>
          All content, including logos, design, text, and graphics, is the property of e-conductor and protected by intellectual property laws.<br/>
          You may not reproduce, duplicate, or exploit any part of our service without our express written permission.
        </Texts>
      </ViewFadeIn>

      <ViewFadeIn duration={2000}>
        <Texts variant="h6" gutterBottom>
          7. Limitation of Liability
        </Texts>
        <Texts variant="body1" paragraph whiteSpace='normal' textAlign='justify'>
          e-conductor is not liable for any indirect, incidental, or consequential damages arising from the use of our services.<br/>
          We do not guarantee the accuracy or reliability of the information provided on our platform.
        </Texts>
      </ViewFadeIn>

      <ViewFadeIn duration={2000}>
        <Texts variant="h6" gutterBottom>
          8. Modifications
        </Texts>
        <Texts variant="body1" paragraph whiteSpace='normal' textAlign='justify'>
          We reserve the right to modify these terms and conditions at any time. Users will be notified of any significant changes.<br/>
          Continued use of the service after any changes constitutes acceptance of the new terms.
        </Texts>
      </ViewFadeIn>

      <ViewFadeIn duration={2000}>
        <Texts variant="h6" gutterBottom>
          9. Governing Law
        </Texts>
        <Texts variant="body1" paragraph whiteSpace='normal' textAlign='justify'>
          These terms and conditions are governed by and construed in accordance with the laws of e-conductor.
        </Texts>
      </ViewFadeIn>

      <Texts variant="h4" textAlign="center" gutterBottom mt={10}>
        Privacy Policy
      </Texts>

      <ViewFadeIn duration={2000}>
        <Texts variant="h6" gutterBottom>
          1. Data Collection
        </Texts>
        <Texts variant="body1" paragraph whiteSpace='normal' textAlign='justify'>
          We collect personal information such as your name, email address, phone number, and payment details to provide and improve our services.<br/>
          Information may be collected directly from you or through automated means, such as cookies and web beacons.
        </Texts>
      </ViewFadeIn>

      <ViewFadeIn duration={2000}>
        <Texts variant="h6" gutterBottom>
          2. Data Usage
        </Texts>
        <Texts variant="body1" paragraph whiteSpace='normal' textAlign='justify'>
          Your data is used to process bookings, facilitate payments, and provide customer support.<br/>
          We may use your data to send promotional offers and updates about our services.
        </Texts>
      </ViewFadeIn>

      <ViewFadeIn duration={2000}>
        <Texts variant="h6" gutterBottom>
          3. Data Sharing
        </Texts>
        <Texts variant="body1" paragraph whiteSpace='normal' textAlign='justify'>
          We do not sell, trade, or otherwise transfer your personal information to outside parties, except as required to process your booking or as required by law.<br/>
          We may share your information with trusted third-party service providers who assist us in operating our website and conducting our business.
        </Texts>
      </ViewFadeIn>

      <ViewFadeIn duration={2000}>
        <Texts variant="h6" gutterBottom>
          4. Data Security
        </Texts>
        <Texts variant="body1" paragraph whiteSpace='normal' textAlign='justify'>
          We implement a variety of security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.<br/>
          Despite our best efforts, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
        </Texts>
      </ViewFadeIn>

      <ViewFadeIn duration={2000}>
        <Texts variant="h6" gutterBottom>
          5. User Rights
        </Texts>
        <Texts variant="body1" paragraph whiteSpace='normal' textAlign='justify'>
          You have the right to access, correct, or delete your personal information. Requests can be made through our customer support.<br/>
          You may also opt out of receiving promotional communications at any time.
        </Texts>
      </ViewFadeIn>

      <ViewFadeIn duration={2000}>
        <Texts variant="h6" gutterBottom>
          6. Cookies
        </Texts>
        <Texts variant="body1" paragraph whiteSpace='normal' textAlign='justify'>
          Our platform uses cookies to enhance user experience and analyze site traffic.<br/>
          You can choose to disable cookies through your browser settings, but this may affect your ability to use some features of our services.
        </Texts>
      </ViewFadeIn>

      <ViewFadeIn duration={2000}>
        <Texts variant="h6" gutterBottom>
          7. Changes to Privacy Policy
        </Texts>
        <Texts variant="body1" paragraph whiteSpace='normal' textAlign='justify'>
          We may update this Privacy Policy to reflect changes in our practices or for other operational, legal, or regulatory reasons.<br/>
          Users will be notified of significant changes via email or a prominent notice on our site.
        </Texts>
      </ViewFadeIn>

      <ViewFadeIn duration={2000}>
        <Texts variant="h6" gutterBottom>
          8. Contact Information
        </Texts>
        <Texts variant="body1" paragraph whiteSpace='normal' textAlign='justify'>
          If you have any questions or concerns about these terms or our privacy practices, please contact us via provided methods.
        </Texts>
      </ViewFadeIn>
    </Box>
  );
};

export default TermsAndConditions;
