export function generatePlaceholder(name: string, subcategory?: string): string {
  const palettes: Record<string, string[]> = {
    canecas: ['#fce7f3','#f9a8d4','#f472b6'],
    cadernetas: ['#e0f2fe','#bae6fd','#7dd3fc'],
    lembrancinhas: ['#f3e8ff','#d8b4fe','#c084fc'],
    caixas: ['#fef3c7','#fde68a','#fcd34d'],
    'topos-bolo': ['#fff7ed','#fed7aa','#fdba74'],
    agendas: ['#fce7f3','#e0f2fe','#f9a8d4'],
    kits: ['#fdf2f8','#fce7f3','#fbcfe8'],
    'dia-das-maes': ['#fdf2f8','#fbcfe8','#f9a8d4'],
    'dia-dos-pais': ['#f0fdf4','#bbf7d0','#86efac'],
    pascoa: ['#fef3c7','#fde68a','#fcd34d'],
    natal: ['#f0fdf4','#dcfce7','#bbf7d0'],
    'festa-junina': ['#fff7ed','#fed7aa','#fdba74'],
  };
  const colors = palettes[subcategory || ''] || ['#fce7f3','#e0f2fe','#f9a8d4'];
  const [c1, c2, c3] = colors;
  const initial = name.charAt(0).toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
    <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${c1}"/>
      <stop offset="50%" style="stop-color:${c2}"/>
      <stop offset="100%" style="stop-color:${c3}"/>
    </linearGradient></defs>
    <rect width="400" height="300" fill="url(#g)" rx="8"/>
    <circle cx="200" cy="120" r="50" fill="rgba(255,255,255,0.25)"/>
    <text x="200" y="145" text-anchor="middle" font-family="system-ui" font-size="60" font-weight="300" fill="rgba(255,255,255,0.7)">${initial}</text>
    <text x="200" y="220" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="400" fill="rgba(255,255,255,0.5)">${name.length > 25 ? name.slice(0, 22) + '...' : name}</text>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
