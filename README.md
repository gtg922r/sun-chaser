# Sun Chaser

Sun Chaser is a React application built with TypeScript and Vite. It allows users to interact with a map, select a date, and determine the time when the shadow will flip based on the selected compass direction. This project leverages various libraries and tools to provide a seamless and interactive user experience.

## Features

- **Interactive Map**: Click on the map to set a marker at the desired location.
- **Date Picker**: Select a date to calculate the shadow flip time.
- **Compass**: Adjust the compass to set the facing direction.
- **Shadow Flip Time Calculation**: Determine the time when the shadow will flip based on the selected date and direction.
- **City Name Fetching**: Automatically fetches and displays the city name based on the marker position.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects.
- **Leaflet**: An open-source JavaScript library for mobile-friendly interactive maps.
- **SunCalc**: A library for calculating sun position and sunlight phases.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **DaisyUI**: A plugin for Tailwind CSS that provides a set of accessible and customizable UI components.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/gtg922r/sun-chaser.git
   cd sun-chaser
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run lint`: Runs ESLint to check for linting errors.
- `npm run preview`: Previews the production build.

## Project Structure

- `src/`: Contains the source code of the application.
  - `components/`: Contains the React components.
  - `App.tsx`: The main application component.
  - `main.tsx`: The entry point of the application.
- `public/`: Contains static assets.
- `index.html`: The main HTML file.
- `package.json`: Contains the project metadata and dependencies.
- `tsconfig.json`: TypeScript configuration file.
- `vite.config.ts`: Vite configuration file.

## Acknowledgements

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Leaflet](https://leafletjs.com/)
- [SunCalc](https://github.com/mourner/suncalc)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## Contact

For any inquiries, please contact RyanC at [https://github.com/gtg922r/sun-chaser](https://github.com/gtg922r/sun-chaser).
