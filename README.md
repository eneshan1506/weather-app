# Weather App

A clean React weather app that lets you search for a city and view a 5-day forecast. The project uses the Open-Meteo APIs for geocoding and weather data, so no API key is required.

## Preview

- Search any city by name
- See a simple 5-day forecast
- View daily max/min temperatures
- Get a readable weather condition summary
- Fast setup with `pnpm`

## Tech Stack

- React
- Create React App
- Open-Meteo Geocoding API
- Open-Meteo Forecast API
- pnpm

## How It Works

1. The app sends the city name to the Open-Meteo geocoding endpoint.
2. It reads the returned latitude and longitude.
3. It fetches the current weather and daily forecast using those coordinates.
4. It renders the next 5 days in a compact card layout.

## Getting Started

### Requirements

- Node.js 18+ recommended
- pnpm 10+

### Installation

```bash
pnpm install
```

### Run in Development

```bash
pnpm start
```

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
pnpm build
```

### Run Tests

```bash
pnpm test
```

## Project Structure

```text
.
├── public/
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.css
│   └── index.js
├── package.json
└── pnpm-lock.yaml
```

## API Notes

- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`
- Forecast: `https://api.open-meteo.com/v1/forecast`
- The app currently requests:
  - current temperature
  - current wind speed
  - current weather code
  - daily min/max temperatures
  - daily weather codes

## Possible Improvements

- Add weather icons for each forecast code
- Show current temperature and wind details in the UI
- Add loading skeletons and empty states
- Persist recent searches
- Add unit tests for data mapping helpers

## Scripts

- `pnpm start` starts the development server
- `pnpm build` creates a production build
- `pnpm test` runs the test suite
- `pnpm eject` ejects the CRA configuration

## License

This project is open for personal learning and portfolio use.
