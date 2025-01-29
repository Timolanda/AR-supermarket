"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Wallet } from "lucide-react"

const COLORS = {
  RED: "#FF0055",
  TEAL: "#00FFC8",
  BLUE: "#0088FF",
  YELLOW: "#FFE600",
  CYAN: "#00FFFF",
}

const LEVELS = [
  { time: 30, required: 10 },
  { time: 25, required: 15 },
  { time: 20, required: 20 },
  { time: 15, required: 25 },
  { time: 10, required: 30 },
]

export default function NeonMatcher({ onGameComplete, initialLoyaltyPoints }) {
  const [gameState, setGameState] = useState("start") // start, playing, end, incorrect
  const [currentLevel, setCurrentLevel] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(LEVELS[0].time)
  const [currentWord, setCurrentWord] = useState({ text: "", color: "" })
  const [walletConnected, setWalletConnected] = useState(false)
  const [levelScores, setLevelScores] = useState([0, 0, 0, 0, 0])
  const [loyaltyPoints, setLoyaltyPoints] = useState(initialLoyaltyPoints)
  const [pointsGained, setPointsGained] = useState(0)

  const generateNewWord = useCallback(() => {
    const colors = Object.keys(COLORS)
    const textIndex = Math.floor(Math.random() * colors.length)
    const colorIndex = Math.floor(Math.random() * colors.length)
    setCurrentWord({
      text: colors[textIndex],
      color: COLORS[colors[colorIndex]],
    })
  }, [])

  const startGame = () => {
    setGameState("playing")
    setCurrentLevel(0)
    setScore(0)
    setTimeLeft(LEVELS[0].time)
    setLevelScores([0, 0, 0, 0, 0])
    setPointsGained(0)
    generateNewWord()
  }

  const handleColorClick = (selectedColor) => {
    if (selectedColor === currentWord.text) {
      setScore((prev) => prev + 1)
      setLevelScores((prev) => {
        const newScores = [...prev]
        newScores[currentLevel] += 1
        return newScores
      })
      generateNewWord()
    } else {
      setGameState("incorrect")
    }
  }

  const calculatePoints = (finalScore) => {
    if (finalScore >= 100) return 500
    if (finalScore >= 75) return 300
    if (finalScore >= 50) return 200
    return 100
  }

  useEffect(() => {
    let timer
    if (gameState === "playing") {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (currentLevel === LEVELS.length - 1) {
              // Game complete
              const finalScore = score
              const pointsEarned = calculatePoints(finalScore)
              setPointsGained(pointsEarned)
              setLoyaltyPoints((prev) => prev + pointsEarned)
              setGameState("end")
              return 0
            } else {
              // Next level
              setCurrentLevel((prev) => prev + 1)
              generateNewWord()
              return LEVELS[currentLevel + 1].time
            }
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [gameState, currentLevel, score, generateNewWord])

  const connectWallet = async () => {
    // Simulate wallet connection
    setWalletConnected(true)
  }

  const handleKeepPoints = () => {
    onGameComplete(loyaltyPoints)
  }

  const handleQuitGame = () => {
    onGameComplete(loyaltyPoints)
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-gray-900 rounded-2xl shadow-xl">
      <AnimatePresence mode="wait">
        {gameState === "start" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6 p-8"
          >
            <h2 className="text-4xl font-bold text-cyan-400 mb-8">Neon Matcher</h2>
            <p className="text-gray-300 mb-8">
              Match the word with its correct color to earn loyalty points! Complete all levels for maximum rewards. Be
              careful, one wrong answer and you'll have to choose between quitting or starting over!
            </p>
            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-bold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all"
            >
              Start Game
            </button>
            {!walletConnected && (
              <button
                onClick={connectWallet}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 rounded-full text-white mt-4 hover:bg-purple-700 transition-all w-full"
              >
                <Wallet size={20} />
                Connect Wallet
              </button>
            )}
          </motion.div>
        )}

        {gameState === "playing" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-cyan-400">Level {currentLevel + 1}/5</div>
              <div className="text-yellow-400">Score: {score}</div>
              <div className="text-purple-400">Time: {timeLeft}s</div>
            </div>

            <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden mb-8">
              <motion.div
                className="absolute left-0 top-0 h-full bg-cyan-400"
                initial={{ width: "100%" }}
                animate={{ width: `${(timeLeft / LEVELS[currentLevel].time) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="text-6xl font-bold text-center mb-12 p-8" style={{ color: currentWord.color }}>
              {currentWord.text}
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {Object.entries(COLORS).map(([colorName, colorValue]) => (
                <motion.button
                  key={colorName}
                  onClick={() => handleColorClick(colorName)}
                  className="p-4 rounded-xl text-white font-semibold"
                  style={{ backgroundColor: colorValue }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {colorName}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {gameState === "incorrect" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6 p-8"
          >
            <h3 className="text-3xl font-bold text-red-500 mb-4">Incorrect Answer!</h3>
            <p className="text-xl text-white">Your current score: {score}</p>
            <div className="space-y-4 mt-8">
              <button
                onClick={startGame}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-bold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all w-full"
              >
                Restart Game
              </button>
              <button
                onClick={handleQuitGame}
                className="px-8 py-4 bg-red-600 rounded-full text-white font-bold hover:bg-red-700 transition-all w-full"
              >
                Quit to Shop
              </button>
            </div>
          </motion.div>
        )}

        {gameState === "end" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6 p-8"
          >
            <h3 className="text-3xl font-bold text-cyan-400 mb-4">Game Complete!</h3>
            <div className="space-y-2">
              <p className="text-2xl text-white">Final Score: {score}</p>
              <p className="text-xl text-yellow-400">Points Gained: {pointsGained}</p>
              <p className="text-xl text-green-400">Total Loyalty Points: {loyaltyPoints}</p>
            </div>

            <div className="mt-8 space-y-4">
              {levelScores.map((levelScore, index) => (
                <div key={index} className="flex justify-between text-gray-300">
                  <span>Level {index + 1}:</span>
                  <span>{levelScore} points</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 mt-8">
              <button
                onClick={startGame}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-bold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all w-full"
              >
                Play Again
              </button>
              <button
                onClick={handleKeepPoints}
                className="px-8 py-4 bg-green-600 rounded-full text-white font-bold hover:bg-green-700 transition-all w-full"
              >
                Keep Points and Return to Shop
              </button>
              {!walletConnected && (
                <button
                  onClick={connectWallet}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 rounded-full text-white font-bold hover:bg-purple-700 transition-all w-full"
                >
                  <Wallet size={20} />
                  Connect Wallet to Save Points
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

