// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = "https://liutkidvtansfwccxdhe.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpdXRraWR2dGFuc2Z3Y2N4ZGhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2NjQ2NjYsImV4cCI6MjA0NDI0MDY2Nn0.hV3DfoVHua_dDsxiHUQZ2srZZJw_FfQUFwcFI_0igJc";
const servicekey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpdXRraWR2dGFuc2Z3Y2N4ZGhlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyODY2NDY2NiwiZXhwIjoyMDQ0MjQwNjY2fQ.Uj5sW211Mi2CrzoBZ4ACcwD8r9L50ZbW_yX09zsLQlA"


export const supabaseAdmin = createClient(supabaseUrl, servicekey)

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
