const PHONE = '5568999548146';
const SITE = 'https://mimos-personalizados-tan.vercel.app';

export function whatsappLink(productName: string, price: number, image?: string): string {
  let msg = `Olá, tenho interesse neste produto:\n\n*${productName}*\nValor: R$ ${price.toFixed(2).replace('.', ',')}`;
  if (image && (image.startsWith('http') || image.startsWith('data:image/jpeg') || image.startsWith('data:image/png'))) {
    msg += `\n\né Link da imagem: ${image}`;
  }
  msg += `\n\nVeja mais em: ${SITE}`;
  msg += `\n\nPoderia me passar mais informações?`;
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
}

export function openWhatsapp(productName: string, price: number, image?: string) {
  window.open(whatsappLink(productName, price, image), '_blank');
}
