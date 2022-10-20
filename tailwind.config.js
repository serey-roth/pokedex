/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.js', './src/**/*.jsx'],
    theme: {
        extend: {
            colors: {
                'normal': '#A8A77A',
                'fire': '#EE8130',
                'water': '#6390F0',
                'electric': '#F7D02C',
                'grass': '#7AC74C',
                'ice': '#96D9D6',
                'fighting': '#C22E28',
                'poison': '#A33EA1',
                'ground': '#E2BF65',
                'flying': '#A98FF3',
                'psychic': '#F95587',
                'bug': '#A6B91A',
                'rock': '#B6A136',
                'ghost': '#735797',
                'dragon': '#6F35FC',
                'dark': '#705746',
                'steel': '#B7B7CE',
                'fairy': '#D685AD', 
            },
            animation: {
                slideup: 'slideup 0.5s ease-in-out',
                slidedown: 'slidedown 1s ease-in-out',
                slideleft: 'slideleft 0.3s ease-out',
                slideright: 'slideright 0.1s ease-in',
                wave: 'wave 1.2s linear infinite',
                slowfade: 'slowfade 2.2s ease-in-out',
              },
            keyframes: {
                slowfade: {
                  from: { opacity: 0 },
                  to: { opacity: 1 },
                },
                slideup: {
                  from: { opacity: 0, transform: 'translateY(25%)' },
                  to: { opacity: 1, transform: 'none' },
                },
                slidedown: {
                  from: { opacity: 0, transform: 'translateY(-25%)' },
                  to: { opacity: 1, transform: 'none' },
                },
                slideleft: {
                  from: { opacity: 0, transform: 'translateX(-20px)' },
                  to: { opacity: 1, transform: 'translateX(0)' },
                },
                slideright: {
                  from: { opacity: 0, transform: 'translateX(20px)' },
                  to: { opacity: 1, transform: 'translateX(0)' },
                },
                wave: {
                  '0%': { transform: 'scale(0)' },
                  '50%': { transform: 'scale(1)' },
                  '100%': { transform: 'scale(0)' },
                },
              },
        },
    },
    plugins: [],
}
