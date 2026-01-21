# ArtDisplay

A sleek, Apple-inspired web application for showcasing your artwork in stunning 3D mockups with realistic perspective transformation.

## Features

- **Beautiful Landing Page** - Apple-style design with smooth animations
- **Easy Upload** - Drag and drop your artwork or click to upload
- **3D Perspective Control** - Drag corner points to adjust perspective and create realistic 3D placement
- **Multiple Mockup Templates** - Choose from classic frames, modern frames, and gallery walls
- **Export Ready** - Download high-quality PNG mockups instantly
- **Responsive Design** - Works beautifully on desktop, tablet, and mobile
- **Dark Mode Support** - Automatic dark mode based on system preferences

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with Apple-inspired design system
- **Animations**: Framer Motion for smooth, fluid animations
- **Icons**: Lucide React
- **Export**: HTML2Canvas for high-quality image exports

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd artdisplay
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Upload Your Artwork**: Click "Get Started" and upload your artwork (JPG, PNG, SVG)
2. **Choose a Mockup**: Select from the available mockup templates in the left sidebar
3. **Adjust Perspective**: Drag the corner control points to adjust the 3D perspective of your artwork
4. **Export**: Click "Export" to download your mockup as a high-resolution PNG

## Project Structure

```
artdisplay/
├── app/
│   ├── layout.tsx        # Root layout with metadata
│   ├── page.tsx          # Main page with Hero/Studio toggle
│   └── globals.css       # Global styles and utilities
├── components/
│   ├── Hero.tsx          # Landing page with animated hero section
│   ├── MockupStudio.tsx  # Main studio interface
│   ├── MockupCanvas.tsx  # 3D canvas with perspective transformation
│   └── MockupSelector.tsx # Mockup template selector
├── public/
│   └── mockups/          # Mockup template images (if needed)
└── package.json
```

## Key Features Explained

### 3D Perspective Transformation

The app uses CSS 3D transforms with a custom matrix calculation to achieve realistic perspective transformation. Each mockup has four draggable corner points that allow users to adjust how their artwork fits into the scene.

### Apple-Inspired Design

- Clean, minimalist interface
- SF Pro Display font family
- Glass morphism effects
- Smooth animations and transitions
- Gradient accents (purple to blue)
- High-contrast, accessible color schemes

## Deploy to Vercel

The easiest way to deploy ArtDisplay is using Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/artdisplay)

### Manual Deployment

1. Install the Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

## Building for Production

```bash
npm run build
npm start
```

### Performance Optimizations

- ⚡ **Dynamic Imports**: html2canvas is loaded only when needed
- 🎯 **Memoization**: Transform calculations are memoized with useMemo
- 📦 **Bundle Optimization**: Automatic package imports optimization for framer-motion and lucide-react
- 🗜️ **Code Splitting**: Automatic code splitting by Next.js
- 🚀 **SWC Minification**: Lightning-fast builds with SWC compiler
- 🔒 **Security Headers**: XSS protection, clickjacking prevention via Vercel config

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- More mockup templates (rooms, outdoor scenes, devices)
- Custom mockup upload
- Artwork library management
- Batch export functionality
- Social media optimized formats
- Collaborative sharing features

## License

MIT

## Credits

Built with love using Next.js, TypeScript, and Tailwind CSS.
