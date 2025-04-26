# GameLayer Player Profile

A modern web application that displays player profiles using the GameLayer API.

## Features

- Fetches and displays player information from GameLayer API
- Modern UI with Tailwind CSS
- Responsive design
- Loading states and error handling

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically deploy your application

## Environment Variables

The following environment variables are used in the application:

- `NEXT_PUBLIC_GAMELAYER_API_KEY`: Your GameLayer API key
- `NEXT_PUBLIC_GAMELAYER_ACCOUNT`: Your GameLayer account ID
- `NEXT_PUBLIC_GAMELAYER_PLAYER_ID`: The player ID to display

## Technologies Used

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- GameLayer API 