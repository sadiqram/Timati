"use client";

import { useEffect, useState } from "react";
// import Timer from "@/Timer/Timer";


 

export default function Home() {
  return (

    <div>
      <div className= " flex flex-col items-center justify-center h-screen">
        <div className="border p-6 rounded-lg">
        <p>Session Title</p>
        <p>Session Type 1</p>
        <p>23:00</p>
        <button>Start</button>
        <button>Pause</button>
        <button>Reset</button>

        </div>
      </div>
    </div>
  );
}
