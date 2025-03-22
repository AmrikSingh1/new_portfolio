/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-blue': '#00f0ff',
        'cyber-pink': '#ff00ff',
        'cyber-purple': '#b967ff',
        'cyber-black': '#0a0a0a',
        'cyber-dark': '#121212',
      },
      fontFamily: {
        'cyber': ['Orbitron', 'sans-serif'],
        'future': ['Rajdhani', 'sans-serif'],
      },
      boxShadow: {
        'neon-blue': '0 0 5px #00f0ff, 0 0 10px #00f0ff, 0 0 15px #00f0ff',
        'neon-pink': '0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff00ff',
        'neon-purple': '0 0 5px #b967ff, 0 0 10px #b967ff, 0 0 15px #b967ff',
      },
      animation: {
        'glitch': 'glitch 1s infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-3px, 3px)' },
          '40%': { transform: 'translate(-3px, -3px)' },
          '60%': { transform: 'translate(3px, 3px)' },
          '80%': { transform: 'translate(3px, -3px)' },
        },
      },
    },
  },
  plugins: [],
} 