# A Little Something — Birthday Website

A responsive, minimal editorial birthday website built with React + Vite.

## Run locally

1. Install Node.js (Node 20 or newer recommended).
2. Extract the project folder.
3. Open a terminal in the project folder and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Run with Docker and display saved photos

1. Install and start Docker Desktop.
2. Copy `.env.example` to `.env` and use the same MongoDB settings as before so the site can read your saved photos.
3. From this project folder, run:

   ```bash
   docker compose up --build
   ```

4. Open `http://localhost:8080`. Saved photos will appear in their existing spots. Photo uploads are disabled.

## Personalize it before sharing

Open `src/App.jsx` and edit:
- The birthday letter inside the `letter-section`.
- The captions and image URLs in the `memories` array.
- The four items in the `reasons` array.
- The greeting and closing lines in the hero and footer.

Replace the sample stock-photo URLs with your own photos. Keep images reasonably sized and use photos she would be comfortable sharing.

## Build for deployment

```bash
npm run build
npm run preview
```

The production site is generated in `dist/`. Deploy the project to Vercel or Netlify by connecting its GitHub repository, or upload the built `dist` folder to a static host.

## Notes

- This project uses Google Fonts and sample images from Unsplash, so an internet connection is needed for those assets.
- Saved photos are read from MongoDB. The site does not provide photo uploads, login, analytics, or tracking.
- The candle interaction is a simple client-side surprise; it does not store data.
