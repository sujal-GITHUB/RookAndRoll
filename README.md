# ♔ Chess Game - RookAndRoll ♚

A beautiful, real-time multiplayer chess game built with Node.js, Socket.IO, and modern web technologies.

## ✨ Features

### 🎨 Beautiful UI
- **Modern Design**: Clean, elegant interface with gradient backgrounds
- **Smooth Animations**: Hover effects, transitions, and piece interactions
- **Glassmorphism**: Translucent elements with backdrop blur effects
- **Responsive Layout**: Works perfectly on different screen sizes

### 🎮 Game Features
- **Real-time Multiplayer**: Play against friends instantly with Socket.IO
- **Drag & Drop**: Intuitive piece movement with visual feedback
- **Board Flipping**: Switch perspectives with properly oriented pieces
- **Move Validation**: Full chess rule validation using chess.js
- **Turn Management**: Automatic turn switching and validation

### 🚀 Technical Features
- **Real-time Synchronization**: Instant move updates across all clients
- **Player Roles**: Automatic white/black player assignment
- **Spectator Mode**: Watch ongoing games
- **Connection Management**: Robust handling of player connections/disconnections

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Real-time Communication**: Socket.IO
- **Chess Engine**: chess.js library
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS, Custom CSS animations
- **Template Engine**: EJS

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RookAndRoll
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 How to Play

1. **Join a Game**: Open the game in your browser
2. **Player Assignment**: You'll be automatically assigned as White or Black
3. **Make Moves**: Drag and drop pieces to make your moves
4. **Flip Board**: Click "Flip Board" to change your perspective
5. **New Game**: Click "New Game" to start fresh

## 📁 Project Structure

```
RookAndRoll/
├── app.js                 # Main server file with Socket.IO logic
├── package.json           # Dependencies and scripts
├── views/
│   └── index.ejs         # Main HTML template
├── public/
│   └── js/
│       └── chessgame.js  # Client-side game logic
└── README.md
```

## 🎨 UI Components

- **Header**: Game title with New Game and Flip Board buttons
- **Chess Board**: Interactive 8x8 grid with traditional styling
- **Game Messages**: Real-time status updates and notifications
- **Responsive Design**: Adapts to different screen sizes

## 🔧 Development

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (placeholder)

### Key Files

- **`app.js`**: Server-side logic, Socket.IO event handlers
- **`views/index.ejs`**: HTML template with embedded CSS
- **`public/js/chessgame.js`**: Client-side game logic and UI interactions

## 🌟 Features in Detail

### Real-time Multiplayer
- Automatic player role assignment (White/Black)
- Spectator mode for additional players
- Real-time move synchronization
- Connection status management

### Chess Engine
- Full chess rule validation
- Move history tracking
- Game state management
- Turn validation

### User Experience
- Drag and drop interface
- Visual feedback for valid moves
- Smooth animations and transitions
- Clean, distraction-free design

## 🎮 Game Controls

- **Drag & Drop**: Move pieces by dragging them to valid squares
- **New Game Button**: Reset the game and start fresh
- **Flip Board Button**: Rotate the board 180° for different perspective
- **Auto-turn**: Game automatically switches turns after valid moves

## 🔒 Security & Validation

- Server-side move validation
- Turn-based move restrictions
- Input sanitization
- Connection validation

## 🚀 Deployment

The application can be deployed to any Node.js hosting platform:

- **Heroku**: Ready for Heroku deployment
- **Vercel**: Can be deployed with serverless functions
- **DigitalOcean**: Compatible with App Platform
- **AWS**: Works with Elastic Beanstalk or EC2

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Enjoy playing chess! ♔♚**