# 🐦 MicroTalk

A modern social media platform clone built with **Next.js** and **Firebase** - inspired by Twitter/X.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- 🔐 **Firebase Authentication** - Email/Password authentication with profile management
- 💬 **Real-time Messaging** - Instant message feed using Firestore real-time listeners
- 👤 **User Profiles** - Edit profile information with real-time updates
- 📝 **Edit Posts** - Update your messages with optimized UI
- 🎨 **Dark Mode Support** - Beautiful dark theme integration
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🔔 **Toast Notifications** - User feedback with react-hot-toast
- 🚀 **Optimistic UI Updates** - Instant UI feedback before server confirmation

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - App Router with Server & Client Components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Hook Form + Zod** - Form validation
- **Zustand** - State management with persistence
- **react-hot-toast** - Beautiful toast notifications

### Backend

- **Firebase Authentication** - Secure user authentication
- **Cloud Firestore** - Real-time database
- **Firebase Storage** - User avatars and media
- **Firebase Security Rules** - Secure data access

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase project created

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd microtalk
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/              # Protected routes
│   │   ├── feed/            # Main message feed
│   │   ├── profile/         # User profile
│   │   └── layout.tsx       # Shared layout with Navbar
│   ├── login/               # Login page
│   ├── register/            # Registration page
│   └── layout.tsx           # Root layout
├── lib/
│   ├── firebase.ts          # Firebase initialization
│   ├── authService.ts       # Authentication functions
│   ├── userService.ts       # User profile operations
│   └── messageService.ts    # Message operations
├── store/
│   └── userStore.ts         # Zustand state management
└── components/
    ├── MessageCard.tsx      # Create messages
    └── RecentMessages.tsx   # Display messages
```

## 🔥 Key Implementations

### Real-time Updates

- **Firestore Listeners** - Messages update instantly without page refresh
- **Optimistic UI** - UI updates immediately before server confirmation
- **Live Authentication State** - `onAuthStateChanged` for reactive UI

### State Management

- **Zustand with Persistence** - User state saved to localStorage
- **Server/Client Separation** - Proper hydration with mounted checks
- **Context-Free Approach** - Direct store access without prop drilling

### Security

- **Firestore Security Rules** - Users can only edit their own messages
- **Authentication Guards** - Protected routes and authentication checks
- **Input Validation** - Zod schemas for form validation

### User Experience

- **Toast Notifications** - Success/error feedback
- **Loading States** - Disabled buttons during operations
- **Error Handling** - Graceful error messages
- **Responsive Design** - Mobile-first approach

## 🎯 Routes

- `/` - Home page
- `/login` - Sign in
- `/register` - Create account
- `/auth/feed` - Main message feed
- `/auth/profile` - User profile
- Dynamic routes coming soon: `/user/[username]`, `/post/[id]`

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

## 🚀 Deploy on Vercel

The easiest way to deploy MicroTalk is using the [Vercel Platform](https://vercel.com/new):

```bash
npm run build
```

Then connect your GitHub repository to Vercel for automatic deployments.

## 📝 License

This project is open source and available for learning purposes.

## 🙏 Acknowledgments

Inspired by Twitter/X. Built for educational purposes using modern web technologies.
