# CV Builder Application Backend

A full-stack dynamic CV builder with React frontend and Express backend.

## Features

-   Dynamic CV creation with multiple templates
-   Save and manage multiple CVs
-   Export to PDF
-   Real-time preview
-   Modular architecture

## Installation

1. Clone the repository
2. Install dependencies: `npm run install-all`
3. Start development: `npm run dev`

## Tech Stack

-   Frontend: React, Tailwind CSS
-   Backend: Express.js, MongoDB
-   PDF Generation: Puppeteer

## Folder Structure

```
cv-builder-app/
├── client/          # React frontend
├── server/          # Express backend
├── package.json     # Root package.json
└── README.md

```

# CV Builder Application Frontend

cv-builder-app/
├── package.json # Root package.json
├── .env # Environment variables
├── .env.example # Environment template
├── .gitignore # Git ignore rules
├── README.md # Project documentation
├── install.sh # Installation script
├── Dockerfile # Docker configuration
├── docker-compose.yml # Docker Compose setup
├── server/ # Backend Express app
│ ├── index.js # Server entry point
│ ├── config/
│ │ └── database.js # Database connection
│ ├── models/
│ │ ├── CV.js # CV model
│ │ └── User.js # User model
│ ├── routes/
│ │ ├── cvRoutes.js # CV CRUD routes
│ │ ├── pdfRoutes.js # PDF generation
│ │ └── authRoutes.js # Authentication
│ └── uploads/ # File uploads (created)
├── client/ # Frontend React app
│ ├── package.json # Client package.json
│ ├── tailwind.config.js # Tailwind configuration
│ ├── public/
│ │ ├── index.html # Main HTML template
│ │ └── favicon.ico # Site icon
│ └── src/
│ ├── index.js # React entry point
│ ├── index.css # Global styles
│ ├── App.js # Main App component
│ ├── components/
│ │ ├── common/
│ │ │ ├── Button.js # Reusable button
│ │ │ ├── LoadingSpinner.js
│ │ │ └── BulletPointsManager.js
│ │ ├── forms/
│ │ │ ├── PersonalInfoTab.js
│ │ │ ├── SkillsTab.js
│ │ │ ├── ExperienceTab.js
│ │ │ ├── ProjectsTab.js
│ │ │ └── EducationTab.js
│ │ └── preview/
│ │ └── CVPreview.js
│ ├── pages/
│ │ ├── CVBuilder.js # Main builder page
│ │ └── Dashboard.js # CV management
│ ├── hooks/
│ │ └── useCVData.js # CV data management
│ ├── services/
│ │ └── api.js # API service layer
│ ├── contexts/
│ │ └── AuthContext.js # Authentication context
│ └── utils/ # Utility functions
└── .vscode/
└── settings.json # VS Code settings

````

## 🚀 Quick Start Commands

```bash
# Clone and setup
git clone <repository>
cd cv-builder-app

# Install all dependencies
npm run install-all

# Start development (runs both client and server)
npm run dev

# Build for production
npm run build

# Start production server
npm start
````
