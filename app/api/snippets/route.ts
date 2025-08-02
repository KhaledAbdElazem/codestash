import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Snippet from '@/models/Snippet';

// Mock data for development when MongoDB is not available
const mockSnippets = [
  {
    _id: '1',
    title: 'React useState Hook Example',
    language: 'javascript',
    category: 'react',
    code: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Python List Comprehension',
    language: 'python',
    category: 'python',
    code: `# Create a list of squares for even numbers
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
squares = [x**2 for x in numbers if x % 2 == 0]
print(squares)  # [4, 16, 36, 64, 100]`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '3',
    title: 'CSS Flexbox Center',
    language: 'css',
    category: 'css',
    code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// GET all snippets
export async function GET(request: NextRequest) {
  try {
    // Try to connect to MongoDB, but fall back to mock data if it fails
    let snippets;
    
    try {
      await dbConnect();
      
      const { searchParams } = new URL(request.url);
      const search = searchParams.get('search');
      const category = searchParams.get('category');
      const language = searchParams.get('language');
      const limit = parseInt(searchParams.get('limit') || '0');
      
      // Build query
      let query: any = {};
      
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { code: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } },
          { language: { $regex: search, $options: 'i' } }
        ];
      }
      
      if (category) {
        query.category = { $regex: category, $options: 'i' };
      }
      
      if (language) {
        query.language = { $regex: language, $options: 'i' };
      }
      
      let snippetsQuery = Snippet.find(query).sort({ createdAt: -1 });
      
      if (limit > 0) {
        snippetsQuery = snippetsQuery.limit(limit);
      }
      
      snippets = await snippetsQuery;
    } catch (dbError) {
      console.log('MongoDB not available, using mock data:', dbError);
      
      // Use mock data when MongoDB is not available
      const { searchParams } = new URL(request.url);
      const search = searchParams.get('search');
      const category = searchParams.get('category');
      const language = searchParams.get('language');
      const limit = parseInt(searchParams.get('limit') || '0');
      
      let filteredSnippets = mockSnippets;
      
      // Apply filters to mock data
      if (search) {
        const searchLower = search.toLowerCase();
        filteredSnippets = filteredSnippets.filter(snippet => 
          snippet.title.toLowerCase().includes(searchLower) ||
          snippet.code.toLowerCase().includes(searchLower) ||
          snippet.category.toLowerCase().includes(searchLower) ||
          snippet.language.toLowerCase().includes(searchLower)
        );
      }
      
      if (category) {
        filteredSnippets = filteredSnippets.filter(snippet => 
          snippet.category.toLowerCase().includes(category.toLowerCase())
        );
      }
      
      if (language) {
        filteredSnippets = filteredSnippets.filter(snippet => 
          snippet.language.toLowerCase().includes(language.toLowerCase())
        );
      }
      
      if (limit > 0) {
        filteredSnippets = filteredSnippets.slice(0, limit);
      }
      
      snippets = filteredSnippets;
    }
    
    return NextResponse.json({ success: true, data: snippets });
  } catch (error) {
    console.error('Error in GET /api/snippets:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch snippets' },
      { status: 500 }
    );
  }
}
