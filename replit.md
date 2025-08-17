# Dropee - Dropshipping and Reselling Platform

## Overview

Dropee is a full-featured dropshipping and reselling platform built with React (Vite) frontend and Express.js backend. The application enables users to sell products without inventory, earn commissions, and build their business through a comprehensive multi-vendor marketplace.

## User Preferences

Preferred communication style: Simple, everyday language.
User prefers customer-focused homepage content rather than seller-focused messaging.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, modern UI
- **State Management**: React Query (TanStack Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Authentication**: Firebase Auth for user authentication and authorization
- **UI Components**: Radix UI primitives with custom styling for accessibility

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API with Express routes
- **Development**: Hot module replacement with Vite integration

### Authentication Strategy
- **Provider**: Firebase Authentication
- **Methods**: Email/password and Google OAuth
- **Session Management**: Firebase handles token management and session persistence
- **User Roles**: User, Seller, Admin with role-based access control

## Key Components

### User Management System
- **Multi-role Support**: Users can be buyers, sellers, or administrators
- **Seller Verification**: Phone verification process for seller registration
- **Profile Management**: Comprehensive user profiles with wallet integration

### Product Management
- **Multi-vendor Catalog**: Sellers can list their own products
- **AI-powered Tools**: Auto-generation of product descriptions and titles
- **Rating System**: Product reviews and ratings for trust building
- **Category Management**: Organized product categorization

### Order Processing
- **Multi-vendor Checkout**: Support for orders from multiple sellers
- **Commission System**: Automated 5% commission calculation and distribution
- **Order Tracking**: Real-time order status updates
- **Supplier Integration**: Direct order handling by suppliers

### Seller Dashboard
- **Analytics**: Revenue tracking, order analytics, and performance metrics
- **Shop Management**: Custom shop pages with unique URLs and branding
- **Wallet System**: Earnings tracking with manual withdrawal options
- **Premium Features**: Subscription-based premium seller plans (₹199/month)

### Payment Integration
- **Commission Processing**: Automated commission calculations
- **Wallet Management**: User wallet for earnings and transactions
- **Subscription Handling**: Razorpay integration for premium plans
- **Withdrawal System**: UPI/Bank transfer for seller payouts

## Data Flow

### User Registration and Authentication
1. User registers via Firebase Auth (email/Google)
2. User profile created in PostgreSQL with Firebase UID
3. Role assignment (user/seller/admin)
4. Seller verification process for elevated permissions

### Product Listing and Management
1. Sellers create product listings through dashboard
2. AI tools assist with description generation
3. Products stored with seller association
4. Real-time sync with external platforms (Meesho, IndiaMART)

### Order Processing Flow
1. Buyers browse and add products to cart
2. Multi-vendor checkout calculates commissions
3. Orders distributed to respective sellers
4. Commission automatically credited to platform
5. Seller earnings updated in wallet
6. Order fulfillment tracking

### Analytics and Reporting
1. Real-time data collection on user actions
2. Dashboard analytics for sellers and admins
3. Performance metrics and trend analysis
4. AI-powered product recommendations

## External Dependencies

### Core Infrastructure
- **Firebase**: Authentication, user management
- **Neon Database**: PostgreSQL hosting and management
- **Vercel/Railway**: Deployment platform
- **Razorpay**: Payment processing for subscriptions

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the application
- **Drizzle Kit**: Database migrations and schema management
- **TanStack Query**: Server state management and caching

### UI and Styling
- **Tailwind CSS**: Utility-first styling framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **shadcn/ui**: Pre-built component system

### Third-party Integrations
- **External APIs**: Product sync from Meesho, IndiaMART
- **AI Services**: Content generation for product descriptions
- **SMS Services**: Phone verification for sellers
- **Email Services**: Notifications and communications

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot reloading
- **Database**: Local PostgreSQL or Neon development instance
- **Environment Variables**: Firebase config, database URLs, API keys

### Production Deployment
- **Frontend**: Static build deployed to CDN (Vercel/Netlify)
- **Backend**: Express server on container platform (Railway/Render)
- **Database**: Neon PostgreSQL with connection pooling
- **Environment Management**: Secure environment variable management

### Database Management
- **Migrations**: Drizzle Kit for schema versioning
- **Backups**: Automated database backups
- **Performance**: Connection pooling and query optimization
- **Security**: Environment-based database credentials

### Monitoring and Maintenance
- **Error Tracking**: Application monitoring and error reporting
- **Performance Monitoring**: API response times and database queries
- **Security Updates**: Regular dependency updates and security patches
- **Scaling**: Horizontal scaling for increased traffic

## Recent Changes (January 2025)

### Homepage Content Updates
- Updated hero section from seller-focused to customer-focused messaging
- Changed "Start Your Dropshipping Journey" to "India's Best Online Shopping Platform"
- Updated call-to-action buttons: "Shop Now" and "Become a Seller"
- Revised statistics to highlight customer satisfaction rather than seller metrics
- Updated benefits section to focus on shopping benefits rather than selling benefits

### Trending Stories Enhancement
- Added Instagram-style trending stories section with dark gradient background
- Implemented animated floating elements and glassmorphism effects
- Added auto-play functionality with pause/play controls
- Created responsive design with mobile-friendly navigation
- Enhanced visual appeal with gradient text and animated borders

### Seller Dashboard & Supplier Integration
- Built comprehensive seller dashboard with analytics and progress tracking
- Integrated multiple supplier platforms: IndiaMart, Meesho, WooCommerce, Shopify
- Added supplier sync functionality with real-time status updates
- Implemented progress analysis with monthly targets and performance metrics
- Created supplier performance tracking and configuration management
- Added comprehensive analytics with conversion rates and growth trends

### Payment System Integration
- Integrated Cashfree payment gateway for Indian market
- Set up subscription system for premium seller plans (₹199/month)
- Created payment session handling and webhook processing
- Implemented commission tracking and wallet management
- Added automated billing and subscription management

### Authentication Flow Enhancement
- Implemented automatic redirect to dashboard after successful login
- Fixed Firebase authentication integration
- Resolved all TypeScript/LSP compilation errors
- Enhanced user experience flow from login to dashboard

### Database Architecture Updates
- Migrated from PostgreSQL to Firebase Firestore for better scalability
- Updated schema definitions for NoSQL document structure
- Maintained type safety with Zod validation schemas
- Optimized for real-time updates and offline capabilities

The application follows modern web development practices with a focus on scalability, maintainability, and user experience. The architecture supports the complex multi-vendor marketplace requirements while maintaining performance and security standards.