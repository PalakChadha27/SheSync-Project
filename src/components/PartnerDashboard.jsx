'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Activity, Bell, Brain, Calendar, ChevronRight, FileText, Heart, Mail, MessageCircle, Moon, Phone, Pill, Play, Plus, Sun, User, Sparkles, TrendingUp, Target, Gamepad2, Clock, Award, BarChart2 } from 'lucide-react'

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
  { title: "Sync Sleep Schedules", progress: 70, target: "8 hours daily", streak: 5 },
  { title: "Joint Meditation", progress: 60, target: "15 mins daily", streak: 3 },
  { title: "Shared Symptom Tracking", progress: 90, target: "Daily logging", streak: 10 }
]

const comparisonMetrics = [
  { label: 'Cycle Sync', value: 65 },
  { label: 'Mood Alignment', value: 80 },
  { label: 'Symptom Similarity', value: 45 }
]

export function PartnerDashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const renderOverview = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {partnersData.map(partner => (
        <motion.div
          key={partner.id}
          variants={cardVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-pink-100/20 p-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-lg" />
              <div className="h-12 w-12 rounded-full bg-pink-500 flex items-center justify-center text-white">
                {partner.name[0]}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">{partner.name}</h3>
              <p className="text-sm text-gray-500">Cycle: {partner.cycleLength} days</p>
            </div>
            <div className="ml-auto flex items-center gap-2 bg-pink-100 dark:bg-pink-900/20 px-3 py-1 rounded-full">
              <Sparkles className="h-4 w-4 text-pink-500" />
              <span className="text-sm text-pink-600 dark:text-pink-300">
                {partner.healthScore}% Health
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
              <p className="text-sm text-gray-500 mb-1">Current Phase</p>
              <p className="font-medium text-pink-600 dark:text-pink-300">{partner.currentPhase}</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
              <p className="text-sm text-gray-500 mb-1">Next Period</p>
              <p className="font-medium text-pink-600 dark:text-pink-300">{partner.nextPeriod}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Symptoms</h4>
              <TrendingUp className="h-4 w-4 text-pink-500" />
            </div>
            <div className="flex flex-wrap gap-2">
              {partner.symptoms.map((symptom, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-2 py-1 rounded-full bg-pink-100 dark:bg-pink-900/20 text-sm text-pink-600 dark:text-pink-300"
                >
                  {symptom}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderSharedGoals = () => (
    <motion.div variants={cardVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Shared Wellness Goals</h3>
      <div className="space-y-6">
        {sharedGoals.map((goal, i) => (
          <motion.div key={i} variants={cardVariants} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">{goal.title}</h4>
                <p className="text-sm text-gray-500">{goal.target}</p>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-pink-500" />
                <span className="text-sm font-medium">{goal.streak} days</span>
              </div>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${goal.progress}%` }}
                className="h-full bg-gradient-to-r from-pink-400 to-pink-600"
                transition={{ duration: 1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )

  const renderCycleComparison = () => (
    <motion.div variants={cardVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Cycle Synchronization</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {comparisonMetrics.map((metric, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{metric.label}</span>
                <span className="text-gray-500">{metric.value}%</span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.value}%` }}
                  className="h-full bg-gradient-to-r from-pink-400 to-pink-600"
                  transition={{ delay: i * 0.2 }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="relative h-64">
          <div className="absolute inset-0 flex items-end justify-between px-4">
            {sharedCycleData.days.map((day, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${day.symptoms * 15}%` }}
                className="w-2 bg-gradient-to-t from-pink-400 to-pink-600 rounded-full"
                transition={{ delay: i * 0.02 }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-full bg-pink-500/20">
                <Heart className="h-6 w-6 text-pink-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Partners Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-pink-500 rounded-full" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex overflow-x-auto p-1 gap-1 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-inner border border-gray-200 dark:border-gray-800"
          >
            {['overview', 'goals', 'cycle'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm rounded-lg min-w-max ${
                  activeTab === tab
                    ? 'bg-pink-500 text-white'
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-8"
            >
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'goals' && renderSharedGoals()}
              {activeTab === 'cycle' && renderCycleComparison()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}