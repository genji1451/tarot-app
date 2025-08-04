# Tarot Mystic - Telegram Web App

A full-screen Telegram Web App for daily tarot readings with animated card shuffling, multiple deck styles, and personalized mystical experiences.

## Features

### 🎴 Core Functionality
- **Daily Tarot Readings**: Get three cards with personalized interpretations
- **Multiple Deck Styles**: Choose from cartoonish, serious, or meme-style decks
- **Animated Card Interactions**: Smooth card shuffling and flipping animations
- **Precise Forecasts**: Detailed interpretations with advice, timing, and energy insights

### 👤 User Experience
- **Onboarding System**: Four user personas (curious newcomer, analytical believer, meme-lover, tarot collector)
- **Profile Management**: Complete user profiles with birth data for personalized readings
- **Karma System**: Earn points through daily activities and quests
- **Referral System**: Share with friends and earn rewards

### 🎨 Visual Design
- **Dynamic Backgrounds**: Cosmic and night-sky themes that adapt to deck selection
- **Glass Morphism**: Modern UI with blur effects and transparency
- **Responsive Design**: Optimized for Telegram's full-screen web view
- **Smooth Animations**: Framer Motion powered interactions

### 💎 Premium Features
- **Multiple Decks**: Access to all deck styles (free users get classic deck)
- **Extended Forecasts**: Week, month, year, fate, and love readings
- **Natal Chart Interpretation**: Astrological insights based on birth data
- **Ad-Free Experience**: Remove advertisements for premium users

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom animations
- **State Management**: Zustand with persistence
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tarot
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Home.tsx       # Main home screen
│   ├── Onboarding.tsx # User registration flow
│   ├── CardReading.tsx # Card display and interpretation
│   ├── Profile.tsx    # User profile management
│   ├── Settings.tsx   # App settings
│   └── LoadingScreen.tsx # Loading animations
├── data/              # Static data
│   ├── tarotCards.ts  # All 78 tarot cards
│   └── decks.ts       # Deck configurations
├── store/             # State management
│   └── index.ts       # Zustand store
├── types/             # TypeScript definitions
│   └── index.ts       # App types and interfaces
├── utils/             # Utility functions
│   ├── telegram.ts    # Telegram Web App integration
│   └── tarot.ts       # Tarot card operations
├── App.tsx            # Main app component
└── main.tsx          # Entry point
```

## Telegram Web App Integration

The app is designed to work seamlessly within Telegram's Web App environment:

- **Full-screen Experience**: Optimized for Telegram's viewport
- **Haptic Feedback**: Native mobile vibrations for interactions
- **Theme Integration**: Adapts to Telegram's light/dark themes
- **User Data**: Integrates with Telegram user information
- **Navigation**: Uses Telegram's back button and main button APIs

## Deployment

### Vercel Deployment

1. Connect your repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy!

### Environment Variables

No environment variables required for basic functionality.

## Customization

### Adding New Decks

1. Add deck configuration to `src/data/decks.ts`
2. Add card images to the public directory
3. Update card descriptions for different styles

### Modifying Card Meanings

Edit the card data in `src/data/tarotCards.ts` to customize interpretations for each deck style.

### Styling

The app uses Tailwind CSS with custom animations. Modify `tailwind.config.js` and `src/index.css` for styling changes.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support or questions, please open an issue in the repository.

---

**Note**: This app is designed specifically for Telegram Web App environment and may not work optimally in regular web browsers. 