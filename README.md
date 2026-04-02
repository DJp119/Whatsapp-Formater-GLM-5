# WAFormat - WhatsApp Text Formatter

A mobile-first, lightweight web app for formatting text for WhatsApp. Apply bold, italic, strikethrough, and monospace formatting instantly.

## Features

- **Live Formatting**: Real-time text conversion as you type
- **WhatsApp Integration**: Share directly to WhatsApp with one click
- **Copy to Clipboard**: Instant copy functionality
- **Keyboard Shortcuts**: Ctrl+B (bold), Ctrl+I (italic), Ctrl+S (strikethrough), Ctrl+M (monospace)
- **Dark Mode**: Toggle between light and dark themes
- **Character & Word Count**: Track your text length
- **Save Messages**: Logged-in users can save formatted templates
- **Mobile-First Design**: Optimized for mobile devices
- **PWA Ready**: Works offline

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI primitives
- **Backend**: Supabase (Auth + Database)
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/
│   ├── auth/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── reset-password/page.tsx
│   ├── saved/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── refund/page.tsx
│   ├── contact/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── textarea.tsx
│   ├── ActionButtons.tsx
│   ├── CharacterCount.tsx
│   ├── Footer.tsx
│   ├── FormatToolbar.tsx
│   ├── Formatter.tsx
│   ├── Header.tsx
│   ├── OutputPreview.tsx
│   ├── TextInput.tsx
│   └── ThemeToggle.tsx
├── lib/
│   ├── supabase.ts
│   └── utils.ts
└── types/
    └── index.ts
```

## Setup Instructions

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/waformat.git
cd waformat
npm install
```

### 2. Environment Variables

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=WAFormat
```

### 3. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API and copy your URL and anon key
3. Run the following SQL in the Supabase SQL Editor:

```sql
-- Create messages table
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  raw_text TEXT NOT NULL,
  formatted_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own messages" ON messages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own messages" ON messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own messages" ON messages
  FOR DELETE USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_messages_user_id ON messages(user_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
```

4. Configure Auth Settings:
   - Go to Authentication > Providers
   - Enable Email provider
   - Configure email templates if needed
   - Set site URL and redirect URLs

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## Deployment on Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in project settings
4. Deploy

## WhatsApp Formatting Syntax

| Style | Syntax | Example |
|-------|--------|---------|
| Bold | `*text*` | *hello* |
| Italic | `_text_` | _hello_ |
| Strikethrough | `~text~` | ~hello~ |
| Monospace | `` ```text `` ` | `hello` |

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.