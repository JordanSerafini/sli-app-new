/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      borderWidth: {
        '0.5': '0.5px',
        '1': '1px',
      },

      backgroundColor: ['active'],

      minWidth: {
        '0.5/10': '5%',
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '4.5/10': '45%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '8.5/10': '85%',
        '9/10': '90%',
        '9.5/10': '95%',
        '10/10': '100%',
      },

      maxWidth: {
        '0.5/10': '5%',
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '4.5/10': '45%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '8.5/10': '85%',
        '9/10': '90%',
        '9.5/10': '95%',
        '10/10': '100%',
      },

      width: {
        '0.5/10': '5%',
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '4.5/10': '45%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '8.5/10': '85%',
        '9/10': '90%',
        '9.5/10': '95%',
        '10/10': '100%',
      },

      minHeight: {
        '0.5/10': '5%',
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '4.5/10': '45%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '8.5/10': '85%',
        '9/10': '90%',
        '9.5/10': '95%',
        '10/10': '100%',
      },

       maxHeight: {
        '0.5/10': '5%',
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '4.5/10': '45%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '8.5/10': '85%',
        '9/10': '90%',
        '9.5/10': '95%',
        '10/10': '100%',
      },

      height: {
        '0.5/10': '5%',
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '4.5/10': '45%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '8.5/10': '85%',
        '9/10': '90%',
        '9.5/10': '95%',
        '10/10': '100%',
      },
      fontSize: {
        'xxs': '.5rem',
        'xxxs': '.4rem',
      },
      colors: {
        'noir': '#1E0F1C',
        'mainBG': '#F0F0F0',
        'mainBG2': '#F5F5F5', // plus clair
        'grayblue':"#2d3748",
        "primary": "#2F27CE",
        "secondary": "#b6b2e0",
        "tertiary": "#cdc9ea",
        "greenPerso": "#43A047",
        "bluePerso": "#42A5F5",
        "orangePerso": "#FFA500",

        "gray-light": "#B8CBD0",
        "blue-primary": "#344D59",
        "blue-secondary":"#b6b2e0",
        "blue-pass": "#709CA7",
        "dark": "#131114",
        "dark-light": "#232826",


       
      },

      screens: {
        'custom-breakpoint': '900px',
      },

      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
      },
    },
  },
  
  
  plugins: [],
}
