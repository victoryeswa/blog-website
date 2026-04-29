# Blog Website

This project is a simple blog website focused on trending news and updates. It is designed to be user-friendly and easy to navigate, providing visitors with the latest information in an engaging format.

## Project Structure

```
blog-website
├── src
│   ├── index.html        # Main HTML document for the blog
│   ├── css
│   │   └── styles.css    # Styles for the blog website
│   ├── js
│   │   └── script.js      # JavaScript for interactivity
│   └── posts
│       └── sample-post.md # Sample Markdown post
├── package.json           # npm configuration file
└── README.md              # Project documentation
```

## Features

- Responsive design for mobile and desktop users
- Dynamic content loading using JavaScript
- Markdown support for blog posts
- Easy to customize and extend

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd blog-website
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the local preview server:
   ```
   npm run start
   ```

5. For a deployable static build, run:
   ```
   npm run build
   ```

This creates a `dist/` folder with the ready-to-publish static site.

## Deployment

- Host the contents of `dist/` on any static site provider.
- This project is configured for GitHub Pages and is ready to deploy from your repository.
- Use GitHub Pages:
  - publish the `dist/` folder to the `gh-pages` branch using the `gh-pages` package, or
  - push to `main`/`master` and let GitHub Actions deploy automatically.
- The `src/404.html` page is included so your site supports not-found redirects on static hosts.

### GitHub Pages

1. Install dependencies:
   ```
   npm install
   ```

2. Deploy manually from your local machine:
   ```
   npm run deploy
   ```

3. Or use GitHub Actions: push your code to `main` or `master`, and the workflow will build and deploy `dist/` to the `gh-pages` branch automatically.

4. Replace `https://your-github-username.github.io/blog-website/` in `src/index.html` with your actual GitHub Pages URL after deployment.

> Note: If your repository uses a different default branch name, update `.github/workflows/deploy-gh-pages.yml` accordingly.

## Usage

- Add new blog posts by creating Markdown files in the `src/posts` directory.
- Customize styles in `src/css/styles.css` to match your branding.
- Modify `src/js/script.js` to enhance interactivity and functionality.
- Use the `dist/` directory for static hosting once built with `npm run build`.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.