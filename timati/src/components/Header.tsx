"use client"

import Link from "next/link"
import Nav from "@/components/Nav"

export default function Header(){
    return(

        <header>
            {/* logo *** moved into Nav component*/}
            {/* <div>
                <Link href="/">Timati</Link>
            </div> */}

            {/* Desktop Nav */}
            <Nav />



            {/* mobile nav */}
        </header>

    )
}