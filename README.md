# Music Player UI

A React-based music player application with a modern UI, built as part of the Samespace Front-End Developer challenge.

## Features

1. React-based frontend with responsive design
2. Music playback functionality (play, pause, next, previous)
3. Song list display with cover images
4. Search functionality for songs and artists
5. Tab-based navigation ("For You" and "Top Tracks")
6. Background gradient color changes based on the current song's cover image
7. Continuous playback when switching tabs
8. Interactive UI with animations and transitions

## Technologies Used

- React.js
- React Router for navigation
- Styled-components for styling
- Axios for API calls

## Setup and Installation

1. Clone the repository:

2. Navigate to the project directory:

3. Install dependencies:

4. Start the development server:

5. Open your browser and visit `http://localhost:3000`

## Project Structure

- `src/components`: Reusable UI components
- `src/pages`: Page components for different routes
- `src/contexts`: React context for state management
- `src/utils`: Utility functions and API calls
- `src/styles`: Global styles and theme

## API Integration

The application uses the Samespace API to fetch song data:
- API Endpoint: `https://cms.samespace.com/items/songs`
- Cover images: `https://cms.samespace.com/assets/{COVER_IMAGE_ID}`

## Responsive Design

The application is designed to be responsive:
- On smaller screens, the player becomes the main interface
- A menu button is provided to access the song list on mobile devices

## Future Improvements

- Implement user authentication
- Add playlist creation and management
- Integrate with a backend for user-specific data storage
- Improve accessibility features

## License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.