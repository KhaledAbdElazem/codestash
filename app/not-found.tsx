"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-8xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-white mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-400 mb-8">
            The code snippet or page you're looking for doesn't exist in our stash.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-pink-600 hover:from-cyan-500 hover:to-pink-500 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
          >
            <Home className="h-5 w-5" />
            <span>Go Home</span>
          </Link>

          <Link
            href="/search"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700/50 hover:border-gray-600/50 text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-300"
          >
            <Search className="h-5 w-5" />
            <span>Search Snippets</span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
