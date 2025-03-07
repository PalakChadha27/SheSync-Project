'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Activity, Bell, Brain, Calendar, ChevronRight, FileText, Heart, Mail, MessageCircle, Moon, Phone, Pill, Play, Plus, Sun, User, Sparkles, TrendingUp, Target, Gamepad2, Clock, Award, BarChart2 } from 'lucide-react'

// Animation variants
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.645, 0.045, 0.355, 1],
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.645, 0.045, 0.355, 1]
    }
  }
}

const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.645, 0.045, 0.355, 1]
    }
  },
  hover: { 
    y: -8,
    transition: {
      duration: 0.3,
      ease: [0.645, 0.045, 0.355, 1]
    }
  },
  tap: { 
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: [0.645, 0.045, 0.355, 1]
    }
  }
}

// Mock data for partners
const partnersData = [
  {
    id: 1,
    name: 'Alex',
    lastPeriod: '2024-01-01',
    nextPeriod: '2024-01-28',
    cycleLength: 28,
    currentPhase: 'Menstrual',
    symptoms: ['Cramps', 'Fatigue'],
    mood: 'Tired',
    sleep: 'Good',
    medications: ['Iron supplement'],
    healthScore: 85
  },
  {
    id: 2,
    name: 'Jordan',
    lastPeriod: '2024-01-05',
    nextPeriod: '2024-02-02',
    cycleLength: 30,
    currentPhase: 'Follicular',
    symptoms: ['Bloating'],
    mood: 'Energetic',
    sleep: 'Fair',
    medications: ['Multivitamin'],
    healthScore: 90
  }
]

const sharedCycleData = {
  days: Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    symptoms: Math.random() * 5,
    mood: Math.random() * 5,
    energy: Math.random() * 5
  }))
}

const sharedGoals = [
  {
    title: "Sync Sleep Schedules",
    progress: 70,
    target: "8 hours daily",
    streak: 5
  },
  {
    title: "Joint Meditation",
    progress: 60,
    target: "15 mins daily",
    streak: 3
  },
  {
    title: "Shared Symptom Tracking",
    progress: 90,
    target: "Daily logging",
    streak: 10
  }
]

export function PartnerDashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.toggle('dark', darkMode)
  }, [darkMode])

  const renderOverviewCards = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {partnersData.map(partner => (
        <motion.div
          key={partner.id}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="relative overflow-hidden bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-pink-100/20"
        >
          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full blur-lg opacity-20 animate-pulse" />
                <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center border-2 border-white dark:border-gray-700">
                  <span className="text-xl font-semibold text-white">{partner.name[0]}</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  {partner.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Cycle Length: {partner.cycleLength} days</p>
              </div>
              <div className="ml-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-1 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30"
                >
                  <Sparkles className="h-4 w-4 text-pink-500" />
                  <span className="text-sm font-medium text-pink-700 dark:text-pink-300">
                    {partner.healthScore}% Health
                  </span>
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-100/20 dark:border-pink-900/20">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Current Phase</p>
                <p className="text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  {partner.currentPhase}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-100/20 dark:border-pink-900/20">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Next Period</p>
                <p className="text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  {partner.nextPeriod}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300">Current Symptoms</h4>
                <TrendingUp className="h-4 w-4 text-pink-500" />
              </div>
              <div className="flex flex-wrap gap-2">
                {partner.symptoms.map((symptom, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/20 text-sm text-pink-700 dark:text-pink-300"
                  >
                    {symptom}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderSharedGoals = () => (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="grid gap-6"
    >
      <motion.div
        variants={cardVariants}
        className="relative overflow-hidden bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-pink-100/20"
      >
        <div className="p-6">
          <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
            Shared Wellness Goals
          </h3>
          <div className="grid gap-6">
            {sharedGoals.map((goal, index) => (
              <motion.div
                key={index}
                variants={listItemVariants}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{goal.title}</h4>
                    <p className="text-sm text-gray-500">{goal.target}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-pink-500" />
                    <span className="text-sm font-medium">{goal.streak} days</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    transition={{
                      duration: 1,
                      ease: [0.645, 0.045, 0.355, 1]
                    }}
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-600"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-pink-100/20 dark:border-pink-900/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full blur-lg opacity-20 animate-pulse" />
                <Heart className="h-8 w-8 text-pink-500 relative" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Partners Dashboard
              </h1>
            </motion.div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-500"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-500 relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-pink-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.645, 0.045, 0.355, 1]
            }}
            className="flex space-x-1 p-1 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-lg border border-pink-100/20 dark:border-pink-900/20"
          >
            {['overview', 'goals'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
            >
              {activeTab === 'overview' && renderOverviewCards()}
              {activeTab === 'goals' && renderSharedGoals()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
