#!/bin/bash

echo "🚀 Installing CV Builder Application..."

cd server

echo "📦 Installing server dependencies..."
npm install

echo "📦 Installing client dependencies..."
cd client && npm install

echo "✅ Installation complete!"
echo ""
echo "🔧 Next steps:"
echo "1. Set up your MongoDB connection in .env file"
echo "2. Run 'npm run dev' to start development servers"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "📚 Available commands:"
echo "- npm run dev     : Start both client and server"
echo "- npm run server  : Start only server"
echo "- npm run client  : Start only client"
echo "- npm run build   : Build for production"