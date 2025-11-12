export const getWhatsAppLink = (productTitle?: string, whatsappNumber?: string): string => {
  // Use provided number, fallback to env variable, or empty string
  const number = whatsappNumber || '';
  const message = productTitle
    ? `Hi, I'm interested in ${productTitle}`
    : 'Hi, I would like to inquire about your jewelry products';
  
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

