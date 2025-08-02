import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Snippet from '@/models/Snippet';

// Mock categories for development
const mockCategories = [
  'javascript',
  'typescript', 
  'python',
  'react',
  'nextjs',
  'nodejs',
  'css',
  'html',
  'algorithms',
  'utils'
];

// GET all unique categories
export async function GET() {
  try {
    let categories;
    
    try {
      await dbConnect();
      categories = await Snippet.distinct('category');
    } catch (dbError) {
      console.log('MongoDB not available, using mock categories:', dbError);
      categories = mockCategories;
    }
    
    return NextResponse.json({ success: true, data: categories.sort() });
  } catch (error) {
    console.error('Error in GET /api/categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
