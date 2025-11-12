# 💍 Jewelry Showcase - Client Website

Elegant showcase website for browsing and inquiring about jewelry products.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Backend API running on port 5000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## ✨ Features

### Home Page
- Hero banner with call-to-action
- Category grid for easy navigation
- Featured products showcase
- Elegant and modern design

### Category Pages
- Browse products by category
- Advanced filtering system:
  - Filter by color (Yellow, Rose, White, Black)
  - Filter by carat (10k, 14k, 18k, 22k)
  - Filter by stone type (Diamonds, etc.)
- Responsive product grid
- Real-time filter updates

### Product Detail Page
- High-quality product images with gallery
- Complete product information
- Price and specifications
- Direct WhatsApp contact button
- Related product information

### WhatsApp Integration
- Floating WhatsApp button on all pages
- Pre-filled inquiry messages
- Direct contact with product details
- Mobile-optimized

### About & Contact Pages
- Company information
- Contact details
- FAQ section
- Multiple contact methods

## 🎨 Design Features

- **Elegant Typography**: Cormorant Garamond for headings, Lato for body
- **Color Scheme**: Gold accents with clean whites and grays
- **Smooth Animations**: Framer Motion for delightful interactions
- **Responsive Design**: Mobile-first approach
- **SEO Optimized**: Next.js with proper metadata

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with categories and featured products |
| `/category/[slug]` | Category page with products and filters |
| `/product/[slug]` | Product detail page |
| `/about` | About the company |
| `/contact` | Contact information and form |

## 🛠️ Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - API requests

## 🔄 API Integration

The website fetches data from the backend API:
- Categories and subcategories
- Products with filtering
- Stone types
- Settings (WhatsApp number)

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
4. Deploy

### Other Platforms

Build for production:
```bash
npm run build
npm start
```

## 📝 Environment Variables

```env
NEXT_PUBLIC_API_URL=https://your-api-url.com/api
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

## 🎯 Business Model

This is a **showcase-only** website:
- No shopping cart
- No payment processing
- Contact via WhatsApp for orders
- Perfect for businesses that handle orders manually

## 📄 License
MIT
