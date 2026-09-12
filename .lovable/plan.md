# Professional motion portfolio update

## What will change
- Make the light theme the default on every fresh site visit while preserving the visitor’s manual theme choice.
- Simplify the opening area to one restrained, centered 3D object behind “Harshad Pakhale”; remove the extra orbs, rings, stars, grid, and animated color blobs that create visual clutter.
- Convert AI Films, Client AI Reels, and Portfolio graphics into smooth right-to-left sliders.
- Keep every card fully visible with stable portrait/image sizing across desktop and mobile.
- Add automatic movement, faster previous/next controls, drag/swipe, and a clear pause/play control.
- Autoplay only the video currently visible in each video slider, muted and inline; pause videos that leave view.
- Preserve click-to-expand viewing for videos and portfolio images, including existing filters and lightboxes.

## Quality checks
- Check the homepage in light mode on desktop and mobile.
- Confirm all slider controls, drag/swipe, autoplay, filtering, and expanded views work.
- Confirm images and videos load without broken media or page overflow.
- Check for runtime errors and run the existing automated tests.

## Technical details
- Reuse and refine the existing shared slider rather than creating separate implementations.
- Use stable responsive slide widths and scroll snapping to avoid cropped cards.
- Respect reduced-motion preferences and suspend automatic movement during interaction.
