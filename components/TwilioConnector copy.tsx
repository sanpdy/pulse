import React, { useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { sendWhatsAppMessage } from './utils/twilioUtils'; // Adjust the import path as needed
import { TWILIO_WHATSAPP_TO } from '@env';

export function TwilioConnector() {
  const [messageStatus, setMessageStatus] = useState('');

  const handleSendMessage = async () => {
    try {
      const status = await sendWhatsAppMessage(TWILIO_WHATSAPP_TO, 'Hello from WhatsApp!');
      setMessageStatus(status);
    } catch (error: any) {
      setMessageStatus(`Error: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Send WhatsApp Message" onPress={handleSendMessage} />
      {messageStatus && <Text>{messageStatus}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});