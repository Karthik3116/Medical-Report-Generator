import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WebhookVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // Extract query parameters from the URL
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('hub.mode');
    const challenge = params.get('hub.challenge');
    const token = params.get('hub.verify_token');

    console.log('Received Webhook Verification Request', { mode, token });

    // Define the dynamic server URL
    let webhookUrl;
    if (token === 'my_verify_token') {
      webhookUrl = 'https://your-firebase-function-url.com/verify'; // or another server for a specific token
    } else if (token === 'another_token') {
      webhookUrl = 'https://another-server.com/verify';
    } else {
      setErrorMessage('Invalid token');
      return;
    }

    // Function to verify the webhook dynamically
    const verifyWebhook = async () => {
      try {
        // Send the GET request to the dynamic URL
        const response = await axios.get(webhookUrl, {
          params: {
            'hub.mode': mode,
            'hub.challenge': challenge,
            'hub.verify_token': token,
          },
        });

        if (response.status === 200) {
          setVerificationStatus(`Webhook verified successfully. Challenge: ${response.data}`);
        } else {
          setVerificationStatus('Webhook verification failed.');
        }
      } catch (error) {
        console.error('Error during webhook verification:', error);
        setErrorMessage('Webhook verification failed: ' + error.message);
      }
    };

    if (mode && challenge && token) {
      verifyWebhook();
    } else {
      setErrorMessage('Missing required query parameters.');
    }
  }, []);

  return (
    <div>
      <h2>Webhook Verification</h2>
      {verificationStatus && <p>{verificationStatus}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default WebhookVerification;
