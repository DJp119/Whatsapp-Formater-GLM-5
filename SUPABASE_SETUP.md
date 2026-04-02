-- WAFormat Supabase Setup Guide

-- STEP 1: Create a new Supabase project
-- Go to https://supabase.com and create a new project

-- STEP 2: Get your credentials
-- Navigate to Project Settings > API
-- Copy:
-- - Project URL (NEXT_PUBLIC_SUPABASE_URL)
-- - anon public key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

-- STEP 3: Run the SQL schema
-- Go to SQL Editor in Supabase dashboard
-- Copy and paste the contents of supabase-schema.sql
-- Execute the SQL

-- STEP 4: Configure Authentication
-- Go to Authentication > Providers
-- Enable Email provider
-- Configure email templates (optional)

-- STEP 5: Set up redirect URLs
-- Go to Authentication > URL Configuration
-- Add your URLs:
-- - Development: http://localhost:3000/auth/callback
-- - Production: https://yourdomain.com/auth/callback

-- STEP 6: Test the setup
-- Run the development server and test signup/login

-- That's it! Your Supabase backend is ready.