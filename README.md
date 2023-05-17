# Football Magnetic Board

This application is a football (soccer) magnetic board that allows users to simulate tactics and strategies by moving players on a virtual field. The app replicates the functionality of a physical magnetic board commonly used by coaches and players to plan and visualize game tactics. Key features include player movement using the Drag and Drop (DnD) HTML API, multiple player selection, doodling on the field using the canvas element, and the ability to take screenshots for sharing or saving.

## Features

- Player Movement: Drag and drop players on the field to simulate positioning and movement during a football match.
- Multiple Selection: Select and move multiple players at once, enabling easier adjustment of formations or group movements.
- Doodling: Use the canvas element to draw lines, shapes, or annotations on the field, providing additional visual context or highlighting specific areas.
- Screenshots: Capture screenshots of the board to save or share the tactics and strategies created.
- Responsive Design: The application is built with a responsive layout to ensure usability on different screen sizes and devices.

## Technologies Used

- Vanilla TypeScript: Programming language used to write the application code with static typing.
- Vite: Fast build tooling for modern web development.
- HTML Drag and Drop API: Native web API used for implementing drag and drop functionality.
- Canvas API: HTML5 element used for drawing graphics and implementing doodling features.

## Installation Instructions

1. Clone the repository: `git clone https://github.com/wichoGZF/pizarraJS.git`
2. Navigate to the project directory: `cd pizarraJS`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Access the application locally via: `http://localhost:3000`

## Code Structure and Organization

The project's codebase is organized as follows:

```plaintext 
  ├── src/
  │ ├── assets/ # Contains static assets (e.g., images, icons)
  │ ├── components/ # Contains reusable HTML components and their CSS modules.
  │ ├── theme/ # MaterialUI 3 theme tokens.
  │ ├── index.html # Main HTML file
  │ ├── main.ts # Entry point of the application
  │ └── ...
  ├── public/ # Contains public assets and index.html
  └── ...
```
