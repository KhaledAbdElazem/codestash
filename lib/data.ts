"use client"

// Static categories for navigation
export const categories = [
  "javascript",
  "typescript",
  "python",
  "react",
  "nextjs",
  "nodejs",
  "css",
  "html",
  "algorithms",
  "utils"
]

// Static languages for navigation
export const languages = [
  "javascript",
  "typescript",
  "python",
  "css",
  "html",
  "bash",
  "yaml",
  "json",
  "sql",
  "markdown"
]

export interface CodeSnippet {
  _id: string
  title: string
  language: string
  category: string
  code: string
  githubLink?: string
  markdownContent?: string
  createdAt?: string
  updatedAt?: string
}

// API functions to fetch data from MongoDB
export async function fetchSnippets(options?: {
  search?: string
  category?: string
  language?: string
  limit?: number
}): Promise<CodeSnippet[]> {
  try {
    const params = new URLSearchParams()
    
    if (options?.search) params.append('search', options.search)
    if (options?.category) params.append('category', options.category)
    if (options?.language) params.append('language', options.language)
    if (options?.limit) params.append('limit', options.limit.toString())
    
    const response = await fetch(`/api/snippets?${params.toString()}`)
    const data = await response.json()
    
    if (data.success) {
      return data.data
    } else {
      throw new Error(data.error || 'Failed to fetch snippets')
    }
  } catch (error) {
    console.error('Error fetching snippets:', error)
    return []
  }
}

export async function fetchSnippetById(id: string): Promise<CodeSnippet | null> {
  try {
    const response = await fetch(`/api/snippets/${id}`)
    const data = await response.json()
    
    if (data.success) {
      return data.data
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching snippet:', error)
    return null
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetch('/api/categories')
    const data = await response.json()
    
    if (data.success) {
      return data.data
    } else {
      throw new Error(data.error || 'Failed to fetch categories')
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function fetchLanguages(): Promise<string[]> {
  try {
    const response = await fetch('/api/languages')
    const data = await response.json()
    
    if (data.success) {
      return data.data
    } else {
      throw new Error(data.error || 'Failed to fetch languages')
    }
  } catch (error) {
    console.error('Error fetching languages:', error)
    return []
  }
}
