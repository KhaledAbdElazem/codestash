import mongoose, { Document, Schema } from 'mongoose';

export interface ISnippet extends Document {
  _id: string;
  title: string;
  language: string;
  category: string;
  code: string;
  githubLink?: string;
  markdownContent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SnippetSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  language: {
    type: String,
    required: [true, 'Language is required'],
    trim: true,
    maxlength: [50, 'Language cannot be more than 50 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    maxlength: [50, 'Category cannot be more than 50 characters']
  },
  code: {
    type: String,
    required: [true, 'Code is required']
  },
  githubLink: {
    type: String,
    required: false,
    trim: true
  },
  markdownContent: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

// Index for better search performance
SnippetSchema.index({ title: 1, language: 1, category: 1 });

export default mongoose.models.Snippet || mongoose.model<ISnippet>('Snippet', SnippetSchema);
