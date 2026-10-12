export const contact = {
  whatsappNumber: '542234219772',
  phoneLabel: '+54 223 421-9772',
};

export function whatsappUrl(message = '') {
  const baseUrl = `https://wa.me/${contact.whatsappNumber}`;
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
}

export function orderWhatsAppUrl(items) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const productLines = items.flatMap((item) => [
    `• ${item.name}`,
    ...(item.color ? [`  Color: ${item.color}`] : []),
    ...(item.size ? [`  Tamaño: ${item.size}`] : []),
    `  Cantidad: ${item.quantity}`,
    `  Precio unitario: $${item.price.toLocaleString('es-AR')}`,
    `  Subtotal: $${(item.price * item.quantity).toLocaleString('es-AR')}`,
  ]);
  return whatsappUrl([
    '¡Hola! Quiero realizar el siguiente pedido:', '', ...productLines, '',
    `Total del pedido: $${total.toLocaleString('es-AR')}`,
  ].join('\n'));
}
