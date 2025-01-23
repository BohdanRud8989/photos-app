# This is a Next.js application that displays Photos feed and allows navigating to particular photo details.

Features:

- Photos feed with infinite scroller
- Masonry Grid Layout - responsive masonry grid that dynamically arranges photos fetched from the API

Technologies Used:

- Next.js (App router mode)
- TypeScript
- Pexels - as API provider
- sass
- cx - classnames library(to display class list depending on conditions)
- vitest - testing framework

## Initial setup

Go to your project root folder and launch in terminal

```
nvm use
npm install
```

## Configuration of the app:

There is `.env` file, you can configure it.

```
NEXT_PUBLIC_PEXELS_API_KEY=your.pexels.api.key
```

## Run in Development mode:

- execute: `npm run dev`

## Run in Production mode:

- execute `npm run build`

## Run tests:

- execute `npm run test`

## Application performance tools and metrics:

- change .env var to `NEXT_PUBLIC_ENV === 'dev'` to run web-vitals
- execute `npm run analyze` to analyze bundle size

## Git default settings:

- husky - before each commit `prettier` will be run
