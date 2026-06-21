const PHONE = '5568999548146';
const SITE = 'https://mimos-personalizados-tan.vercel.app';

export function whatsappLink(productName: string, price: number, productUrl?: string, image?: string): string {
  let msg = `Olá, tenho interesse neste produto:\n\n*${productName}*\nValor: R$ ${price.toFixed(2).replace('.', ',')}`;
  if (productUrl) {
    msg += `\n\né Link do produto: ${productUrl}`;
  }
  if (image && (image.startsWith('http') || image.startsWith('data:image/jpeg') || image.startsWith('data:image/png'))) {
    msg += `\né Imagem: ${image}`;
  }
  msg += `\n\nPoderia me passar mais informações?`;
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
}

export function openWhatsapp(productName: string, price: number, productUrl?: string, image?: string) {
  window.open(whatsappLink(productName, price, productUrl, image), '_blank');
}
