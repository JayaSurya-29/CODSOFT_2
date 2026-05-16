# 🎮 Tic-Tac-Toe - Unbeatable AI

A beautiful, professional Tic-Tac-Toe game with an unbeatable AI opponent, built with modern web technologies.

## ✨ Features

### 🎯 Game Features
- **Unbeatable AI**: Uses the Minimax algorithm with Alpha-Beta Pruning
- **3 Difficulty Levels**:
  - **Easy**: AI makes random moves (you can win!)
  - **Medium**: AI uses limited-depth minimax (challenging but beatable)
  - **Hard**: Full minimax (UNBEATABLE!)
- **Score Tracking**: Keep track of Player wins, AI wins, and Draws
- **Confetti Celebration**: Beautiful confetti animation when you win!

### 🎨 Professional Design
- Modern, sleek interface with glassmorphism effects
- Professional blue-purple color scheme
- Smooth animations and transitions
- Fully responsive design (works on all screen sizes)
- Floating particles background
- Pop-in animations for X and O

## 🚀 How to Play

1. **Clone or download** this repository
2. **Open `index.html`** in your web browser, or
3. **Start a local server**:
   ```bash
   python -m http.server 8000
   ```
4. **Navigate to** `http://localhost:8000`
5. **Select a difficulty level** and start playing!

## 🎮 Game Rules

- You play as **X**, AI plays as **O**
- Click on any cell to make your move
- Get three in a row (horizontally, vertically, or diagonally) to win
- If all cells are filled without a winner, it's a draw

## 📁 Files Included

- `index.html` - Game structure and UI
- `style.css` - Professional styling and animations
- `script.js` - Game logic and AI implementation
- `tictactoe.py` - Python version of the game (console-based)

## 🛠️ Technologies Used

- **HTML5** - Markup structure
- **CSS3** - Styling with animations and gradients
- **JavaScript (ES6+)** - Game logic and AI
- **Minimax Algorithm** - AI decision making
- **Alpha-Beta Pruning** - Optimizes minimax performance

## 🧠 AI Algorithm

The AI uses the **Minimax algorithm** with **Alpha-Beta Pruning**:

- **Minimax**: Recursive algorithm that explores all possible game states
- **Alpha-Beta Pruning**: Optimizes the algorithm by eliminating unnecessary branches
- **Evaluation Function**:
  - +1 if AI wins
  - -1 if player wins
  - 0 for a draw

## 📱 Responsive Design

- Desktop: Full-sized game board
- Tablet: Slightly reduced dimensions
- Mobile: Compact layout with stacked buttons

## 🎯 Features in Detail

### Score Board
- Tracks Player wins, Draws, and AI wins
- Persists across multiple games
- Can be reset with "Reset Scores" button

### Difficulty Levels
- **Easy**: AI picks random empty cells
- **Medium**: AI looks 3 moves ahead
- **Hard**: AI explores all possible moves (unbeatable)

### Visual Effects
- Floating particles in background
- Glowing gradient text
- Pop-in animations for X/O
- Pulse animation for winning cells
- Confetti celebration for player wins

## 🤝 Contributing

Feel free to fork this repository and make improvements!

## 📄 License

This project is open source and available for educational purposes.

---

**Enjoy playing! Try to beat the AI on Hard mode - if you can! 🎉**
