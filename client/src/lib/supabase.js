import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xqbdlexwmorobgvidqrr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxYmRsZXh3bW9yb2JndmlkcXJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxODgxNjQsImV4cCI6MjA2OTc2NDE2NH0.5d7mR6HbI20cpH5dgP-SGF68Ojcd1NPKbdc2sR82sac';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
