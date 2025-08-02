import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Snippet from '@/models/Snippet';

// Mock languages for development
const mockLanguages = [
  'javascript',
  'typescript',
  'python',
  'css',
  'html',
  'bash',
  'yaml',
  'json',
  'sql',
  'markdown'
];

// GET all unique languages
export async function GET() {
  try {
    let languages;
    
    try {
      await dbConnect();
      languages = await Snippet.distinct('language');
    } catch (dbError) {
      console.log('MongoDB not available, using mock languages:', dbError);
      languages = mockLanguages;
    }
    
    return NextResponse.json({ success: true, data: languages.sort() });
  } catch (error) {
    console.error('Error in GET /api/languages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch languages' },
      { status: 500 }
    );
  }
}
