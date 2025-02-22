const supa = require('@supabase/supabase-js');
require('dotenv').config();
const supaUrl = process.env.SUPAURL;
const supaAnonKey = process.env.SUPAKEY;

const supabase = supa.createClient(supaUrl, supaAnonKey);

module.exports ={
    database: supabase
}