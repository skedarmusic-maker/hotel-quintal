import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dpibdwbabkqearoiduwe.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwaWJkd2JhYmtxZWFyb2lkdXdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNjk4OTcsImV4cCI6MjEwNTg0NTg5N30.AjkznGog-4S2E5wP-W02GcQmYhVluiKRtKC3ijXqRWY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
