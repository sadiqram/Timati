import { createClient } from "@supabase/supabase-js";
import { env } from "process";




const supabase = createClient(
    // import.meta.env.NEXT_PUBLIC_SUPABASE_URL,
    // import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
//example sign in

// const {data,error} = await supabase.auth.signInWithPassword({
//     email: "test@example.com",
//     password: "mypassword"
// })
export default supabase;