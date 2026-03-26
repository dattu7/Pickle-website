import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Godavari Pickles',
    short_name: 'Godavari',
    description: 'Authentic homemade pickles from West Godavari.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fdfcf8',
    theme_color: '#004225',
    icons: [
      {
        src: '/Round_logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/Round_logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
    ],
  }
}
