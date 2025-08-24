"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Timer from  "@/components/Timer"
import Header from "@/components/Header"



 

export default function Home() {
  return (
    <div>
      <Header />
      <Timer />
    </div>
  );
}
