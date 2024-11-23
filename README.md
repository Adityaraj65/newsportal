# News Portal

A modern, responsive news portal with multi-language support and theme customization.

## Features

- Real-time news updates using GNews API
- Multiple language support (EN, ES, FR, HI, ZH)
- Light/Dark theme switching
- Reading mode for better readability
- Responsive design
- Local storage for user preferences

## Deployment to Netlify

1. Sign up for a [Netlify account](https://app.netlify.com/signup)
2. Click "New site from Git"
3. Choose your Git provider (GitHub, GitLab, or Bitbucket)
4. Select the repository
5. Configure build settings:
   - Build command: (leave empty)
   - Publish directory: /
6. Click "Deploy site"

### Environment Variables

Add the following environment variable in Netlify:
- Name: `GNEWS_API_KEY`
- Value: `dd2d5dd6dbd3c56b95e6badfceadf324`

## Development

1. Clone the repository
2. Open `index.html` in your browser
3. Make changes to HTML, CSS, or JavaScript files
4. Test thoroughly before deployment

## API Usage

This project uses the [GNews API](https://gnews.io/) for fetching news articles. The API has rate limits:
- Free tier: 100 requests per day
- Consider upgrading for production use

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## License

MIT License
