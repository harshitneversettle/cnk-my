import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Instantly Holiday | Cox & Kings',
    short_name: 'Cox & Kings',
    description: 'Holiday planner by Cox & Kings',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/cnk-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/cnk-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
