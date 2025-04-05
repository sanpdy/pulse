import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM } from '@env';

export const sendWhatsAppMessage = async (to: string, body: string): Promise<string> => {
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
      return `WhatsApp message sent: ${data.sid}`;
    } else {
      throw new Error(data.message || 'Failed to send message');
    }
  } catch (error: any) {
    throw new Error(error.message || 'An unknown error occurred');
  }
};