const WHATSAPP_API_URL = `https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

export const sendWhatsAppMessage = async (to, message) => {

 
  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: to,
    type: "text",
    text: {
      preview_url: false,
      body: message,
    },
  };
  console.log(to);
  console.log(payload);
 
  const response = await fetch(WHATSAPP_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
    },
    body: JSON.stringify(payload),
  });
 
  const data = await response.json();
 
  if (!response.ok) {
    // WhatsApp error shape: { error: { message, type, code, fbtrace_id } }
    const errMsg = data?.error?.message || "WhatsApp API request failed";
    throw new Error(`WhatsApp API Error [${data?.error?.code}]: ${errMsg}`);
  }
 
  console.log(`WhatsApp sent to ${to} | Message ID: ${data?.messages?.[0]?.id}`);
  return data;
};

