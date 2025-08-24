"use client"
import Link from "next/link"


export default function Nav() {
    return(
        <nav className="flex items-center justify-center gap-8
        mt-4">
            <div>
                <Link href="/">Timati</Link>
            </div>
        

        <button>Settings</button>
        <Link href="/">Sign In</Link>

        </nav>



    )
    

}