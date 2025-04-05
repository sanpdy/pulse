import React, { useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

export function TwilioConnector() {
  const [messageStatus, setMessageStatus] = useState('');

  const sendWhatsAppMessage = async (to: string, body: string) => {
    try {
      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          From: TWILIO_WHATSAPP_FROM, // Twilio's WhatsApp sandbox number
          To: `whatsapp:${to}`, // Recipient's WhatsApp number
          Body: body,
        }).toString(),
      });

      const data = await response.json();
      if (response.ok) {
        setMessageStatus(`WhatsApp message sent: ${data.sid}`);
      } else {
        setMessageStatus(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessageStatus(`Error: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Send WhatsApp Message" onPress={() => sendWhatsAppMessage(TWILIO_WHATSAPP_TO, 'Hello from WhatsApp!')} />
      {messageStatus && <Text>{messageStatus}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});