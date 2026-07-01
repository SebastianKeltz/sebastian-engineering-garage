# Sebastian Keltz Engineering Portfolio

Static personal portfolio website for Sebastian Keltz, an Electrical Engineering student at UCF. It is built for GitHub Pages with plain HTML, CSS, and JavaScript only.

## Files

Put these files at the root of your GitHub Pages repository:

```text
index.html
styles.css
script.js
README.md
assets/
  README_IMAGES.txt
  Sebastian_Keltz_Resume.pdf
  about-me.jpg
  about-me-project.jpg
  electric-dirt-bike-1.jpg
  electric-dirt-bike-battery.jpg
  electric-dirt-bike-motor.jpg
  electric-dirt-bike-controller.jpg
  electric-dirt-bike-wiring.jpg
  scooter-build-1.jpg
  scooter-cad-1.jpg
  cad-print-1.jpg
  lab-breadboard-1.jpg
  oscilloscope-1.jpg
  circuit-test-1.jpg
  scooter-action-1.mp4
```

## Editing Checklist

1. Open `index.html` and search for `EDIT:` comments.
2. Replace the contact email, LinkedIn URL, and GitHub URL near the Contact section.
3. Replace project descriptions with your real dates, parts, measurements, and lessons learned.
4. Add your resume PDF at `assets/Sebastian_Keltz_Resume.pdf`.
5. Add your photos to `assets/` using the filenames listed in `assets/README_IMAGES.txt`.
6. Keep image files reasonably small for GitHub Pages. A good target is under 500 KB per image when possible.

## Image Replacement

The HTML already points to the image filenames in the `assets` folder. If a file is missing, the site shows a clean placeholder. When you add the real image with the exact filename, it appears automatically.

Example:

```text
assets/electric-dirt-bike-1.jpg
```

No HTML change is needed if you keep the expected filename.

## Coursework Safety

Use the Coursework section for your own summaries, original explanations, allowed project photos, and permitted lab images. Do not publicly upload exams, quizzes, answer keys, professor slides, Canvas files, homework solutions, or lab manuals unless you have explicit permission.

## GitHub Pages Setup

In your repository settings:

1. Go to `Settings`.
2. Open `Pages`.
3. Set the source to the branch you use for the website, usually `main`.
4. Set the folder to `/root`.
5. Save.

Your site will usually appear at one of these:

```text
https://your-username.github.io/
https://your-username.github.io/your-repository-name/
```

## Commit and Push with GitHub Desktop

1. Open GitHub Desktop.
2. Choose your portfolio repository.
3. Add or update the files listed above in the repository root.
4. Confirm the changed files appear in the left sidebar.
5. Type a commit summary like `Upgrade engineering portfolio website`.
6. Click `Commit to main`.
7. Click `Push origin`.
8. Wait a minute or two, then refresh your GitHub Pages URL.

## Local Preview

Because this site is fully static, you can open `index.html` directly in a browser. For best results, preview it from the repository folder so the `styles.css`, `script.js`, and `assets` paths resolve correctly.
