# Bâti Renov Design

A responsive website built with **HTML, CSS, and vanilla JavaScript**.
No React, Tailwind, or other frontend framework is used.

## Website source

- `index.html` — page content
- `src/style.css` — styles
- `src/app.js` — interactions
- `src/project-videos.js` — video carousel and video file paths
- `public/images/` — images and logos

Add video files under `public/videos/` and set their paths in
`src/project-videos.js`, for example `/videos/chantier-01.mp4`.
Social account links still need to be configured.

## Build and publish

Vite is used only as a development server/build tool for the Make environment,
not as a frontend framework. Run `pnpm build`, then publish the contents of
`dist/` to any static web host. No Node.js server or framework is needed to
run the published website.
