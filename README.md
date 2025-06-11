# Resource Finder 🔍

A modern web application for discovering and searching technical resources with AI-powered assistance.

[![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## 🎯 Overview

Resource Finder is a comprehensive web application designed to help software development professionals discover and search through technical resources efficiently. Built as part of Chingu Voyage 55, this application integrates modern authentication, intelligent search capabilities, and AI-powered assistance to create a seamless user experience.

The application pulls resources from the Chingu Discord community's `#resource-treasures` channel and presents them in an easily searchable, well-organized interface.

## ✨ Features

### 🔐 Authentication System

- **Firebase Authentication** - Secure authentication with multiple providers
- **GitHub Login** - GitHub authentication via Firebase Auth
- **Google Login** - Google authentication via Firebase Auth
- **Persistent Sessions** - Stay logged in across browser sessions

### 🔍 Advanced Search Capabilities

- **Real-time Search** - Instant results with debounced input
- **Tag-based Filtering** - Filter resources by relevant tags
- **Multi-criteria Search** - Search by title, author, or tags
- **Pagination** - Efficiently browse through large result sets
- **Responsive Design** - Works seamlessly on all devices

### 🤖 AI-Powered Assistant

- **Google Gemini Integration** - Powered by Google's latest AI model
- **Interactive Chat Interface** - Natural conversation experience
- **Context-Aware Responses** - AI understands the application context
- **Predefined Queries** - Quick access to common questions

### 🎨 Modern UI/UX

- **Responsive Design** - Mobile-first approach
- **Loading States** - Animated placeholders and smooth transitions
- **Modern Components** - Built with shadcn/ui components
- **Accessible Design** - Follows WCAG accessibility guidelines

## 🛠 Tech Stack

### Frontend

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tooling and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern, accessible UI components

### Authentication & Backend

- **Firebase Authentication** - Complete authentication solution with multiple providers
- **GitHub Provider** - GitHub authentication through Firebase
- **Google Provider** - Google authentication through Firebase

### AI & APIs

- **Google Generative AI** - Gemini 1.5 Flash model
- **Custom Resource API** - Integration with Chingu resource database

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm**
- **Git**

You'll also need accounts and API keys for:

- Firebase project with Authentication enabled
- Google Gemini API key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/chingu-voyages/V55-tier2-team-21.git
   cd V55-tier2-team-21
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   # API Configuration
   VITE_API_BASE_URL=https://seshatbe.up.railway.app
   VITE_GEMINI_API_KEY=your_gemini_api_key_here

   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Start the application**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to `http://localhost:5173` to view the application.

### Setting Up Authentication

#### Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication in your Firebase project
3. Configure authentication providers:
   - **GitHub Provider**: Enable GitHub sign-in in Authentication > Sign-in method
   - **Google Provider**: Enable Google sign-in in Authentication > Sign-in method
4. Add your domain to authorized domains in Authentication settings
5. Copy your Firebase configuration to the `.env` file

#### Google Gemini API Setup

1. Visit [Google AI Studio](https://ai.google.dev/)
2. Create a new API key
3. Add the key to your `.env` file

## 📁 Project Structure

```
src/
├── assets/                 # Images, icons, and static assets
├── components/             # Reusable UI components
│   ├── ui/                 # shadcn/ui components
│   └── common/             # Shared/common components
├── context/                # React context providers
│   └── AuthContext.tsx     # Authentication context
├── features/               # Feature-based modules
│   ├── auth/               # Authentication-related components
│   ├── chat/               # AI chat interface and logic
│   └── search/             # Search functionality and UI
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and configuration
├── types/                  # TypeScript type definitions
├── App.tsx                 # Main application component
└── main.tsx                # Application entry point
```

## 🔌 API Documentation

### Resource API Endpoints

#### Get Tags

```http
GET /tags
```

Returns an array of available tags for filtering resources.

**Response:**

```json
[
  { "tag": "General", "id": "1048176100892737618" },
  { "tag": "HTML", "id": "1048172063774486548" }
]
```

#### Get Resources

```http
GET /resources
```

Returns an array of available resources.

**Response:**

```json
[
  {
    "author": "andresc1310",
    "name": "Lazygit",
    "appliedTags": ["1048174499905937428"],
    "url": "https://www.freecodecamp.org/news/how-to-use-lazygit-to-improve-your-git-workflow/",
    "createdAt": "2025-04-12T18:04:11.224Z",
    "id": "1360676892071559340"
  }
]
```

## 🎯 Usage

1. **Authentication**: Sign in using GitHub or Google through Firebase Authentication
2. **Search Resources**: Use the search bar to find resources by name or author
3. **Filter by Tags**: Select relevant tags to narrow down results
4. **AI Assistant**: Click the chat icon for help and guidance
5. **Browse Results**: Navigate through paginated results
6. **Resource Access**: Click on resource cards to visit external links

## 🤝 Contributing

We welcome contributions to Resource Finder! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add tests for new features
- Ensure responsive design
- Follow accessibility guidelines

## 📝 License

This project is part of the Chingu Voyage 55 Tier 2 Team 21 collaboration. It is created for educational purposes and community learning.

## 👥 Team Members

- [@elva329](https://github.com/elva329) - Full Stack Developer
- [@rajin-siam](https://github.com/rajin-siam) - Full Stack Developer
- [@udaysiddapur](https://github.com/udaysiddapur) - Scrum Master

## 🙏 Acknowledgments

- **Chingu** - For providing the platform and community for collaborative learning
- **Discord Community** - For the valuable resources in the `#resource-treasures` channel
- **Google** - For the Gemini AI API
- **Firebase** - For authentication services
- **The Open Source Community** - For the amazing tools and libraries that made this project possible

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/chingu-voyages/V55-tier2-team-21/issues) page
2. Create a new issue with detailed information
3. Reach out to the team members

---

**Built with ❤️ by Chingu Voyage 55 Tier 2 Team 21**
