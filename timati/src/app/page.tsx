"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";



 

export default function Home() {
  return (

    <div>
      <div className= " flex flex-col items-center justify-center h-screen">
        <div className="border p-6 rounded-lg">
        <div className=" justify-center text-2xl font-bold">Session Title</div>
        
        <p>23:00</p>
        <div className="flex gap-2 cursor-pointer">
        <Button>Start</Button>
        <Button>Pause</Button>
        <Button>Reset</Button>
        </div>
        <p>Session Type 1</p>

        </div>
      </div>
    </div>
  );
}
