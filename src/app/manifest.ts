import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mimos & Personalizados AC',
    short_name: 'Mimos AC',
    description: 'Transformamos momentos especiais em lembranças inesquecíveis.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fdf2f8',
    theme_color: '#f472b6',
    icons: [
      { src: '/icons/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' },
      { src: '/icons/icon-512.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
  };
}
