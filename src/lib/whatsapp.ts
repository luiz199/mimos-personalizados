const PHONE = '5568999548146';

export function whatsappLink(productName: string, price: number, image?: string): string {
  let msg = `Olá, tenho interesse neste produto:\n*${productName}*\nValor: R$ ${price.toFixed(2).replace('.', ',')}`;
  if (image) msg += `\n\n📸 Foto do produto: ${image}`;
  msg += `\n\nPoderia me passar mais informações?`;
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
}

export function openWhatsapp(productName: string, price: number, image?: string) {
  window.open(whatsappLink(productName, price, image), '_blank');
}
