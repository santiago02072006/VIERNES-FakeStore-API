// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dhcdddpvmptalmsxhbwe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoY2RkZHB2bXB0YWxtc3hoYndlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMjkwMDIsImV4cCI6MjA2MzcwNTAwMn0.n9hi4wd8Es3mVc8PtrM0yvMi5yBLXRWGyixbuHpxvJE';
export const supabase = createClient(supabaseUrl, supabaseKey);