export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { ink: '#050510', line: '#1b2140', mute: '#94a0bd', brand: '#3b82f6', flame: '#ff7a1a' },
      fontFamily: { display: ['"Space Grotesk"', 'system-ui', 'sans-serif'], sans: ['Inter', 'system-ui', 'sans-serif'] }
    }
  },
  plugins: []
}
