import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Snippet from '@/models/Snippet';
import mongoose from 'mongoose';

// Mock snippets for development (same as in main route)
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

// GET snippet by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    let snippet;
    
    try {
      await dbConnect();

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json(
          { success: false, error: 'Invalid snippet ID' },
          { status: 400 }
        );
      }

      snippet = await Snippet.findById(id);
      
      if (!snippet) {
        return NextResponse.json(
          { success: false, error: 'Snippet not found' },
          { status: 404 }
        );
      }
    } catch (dbError) {
      console.log('MongoDB not available, using mock data:', dbError);
      
      // Find snippet in mock data
      snippet = mockSnippets.find(s => s._id === id);
      
      if (!snippet) {
        return NextResponse.json(
          { success: false, error: 'Snippet not found' },
          { status: 404 }
        );
      }
    }

    return NextResponse.json({ success: true, data: snippet });
  } catch (error) {
    console.error('Error in GET /api/snippets/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch snippet' },
      { status: 500 }
    );
  }
}
