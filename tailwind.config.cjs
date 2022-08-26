/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      title: ['Cabin', 'sans-serif'],
    },
    extend: {
      colors: {
        valhalla: {
          '50': '#525173',
          '100': '#484769',
          '200': '#3e3d5f',
          '300': '#343355',
          '400': '#2a294b',
          '500': '#201f41',
          '600': '#161537',
          '700': '#0c0b2d',
          '800': '#020123',
          '900': '#000019',
        },
        jagger: {
          '50': '#745f85',
          '100': '#6a557b',
          '200': '#604b71',
          '300': '#564167',
          '400': '#4c375d',
          '500': '#422d53',
          '600': '#382349',
          '700': '#2e193f',
          '800': '#240f35',
          '900': '#1a052b',
        },
        lipstick: {
          '50': '#c36086',
          '100': '#b9567c',
          '200': '#af4c72',
          '300': '#a54268',
          '400': '#9b385e',
          '500': '#912e54',
          '600': '#87244a',
          '700': '#7d1a40',
          '800': '#731036',
          '900': '#69062c',
        },
        charm: {
          '50': '#ffaac1',
          '100': '#f9a0b7',
          '200': '#ef96ad',
          '300': '#e58ca3',
          '400': '#db8299',
          '500': '#d1788f',
          '600': '#c76e85',
          '700': '#bd647b',
          '800': '#b35a71',
          '900': '#a95067',
        },
        deepBlush: {
          '50': '#ffaeb8',
          '100': '#ffa4ae',
          '200': '#fb9aa4',
          '300': '#f1909a',
          '400': '#e78690',
          '500': '#dd7c86',
          '600': '#d3727c',
          '700': '#c96872',
          '800': '#bf5e68',
          '900': '#b5545e',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
