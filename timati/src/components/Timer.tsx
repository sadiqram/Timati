"use client";

import { time } from "console";
import { useState, useEffect} from "react";
import Button from "./Button";
import Magnetic from "./Magnetic";
type SessionType = "pomodoro" | "shortBreak" | "longBreak" | "custom";

interface TimerSettings{
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
    custom: number;
    cycles: number;
    isRunning: boolean;
    isPaused: boolean;
    isFinished: boolean;
}

export default function Timer() {
  const [timeleft, setTimeleft] = useState(25*60);
  const [sessionType, setSessionType] = useState<SessionType>("pomodoro");
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [isCustomTime, setIsCustomTime] = useState(false);
  
 const settings : TimerSettings = {
    pomodoro: 25*60,
    shortBreak: 5*60,
    longBreak: 15*60,
    custom: 0,
    cycles: 4,
    isRunning: false,
    isPaused: false,
    isFinished: false,
 }
 useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isRunning && !isPaused && timeleft > 0 && !isFinished) {
        timer = setInterval(() => {
            setTimeleft((prev) => prev - 1);
        }, 1000);
    } 
    
    //auto switch session to short break every pomo, and long break ever 4 pomos
    if (timeleft === 0 && isFinished) {
        setIsRunning(false);
        setIsPaused(false);
        setIsFinished(true);
    }
    setTimeout(() => {
        switchSession()
    }, 1000)

    return () => clearInterval(timer)
 }, [isRunning, isPaused,timeleft]);

 const getProgress = () => {
    const totalTime = settings.pomodoro + settings.shortBreak + settings.longBreak;
    const progress = (timeleft / totalTime) * 100;
    return progress;
 }

 const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
    setIsFinished(false);

    // Reset to correct seesion length when starting afresh
    if (sessionType === "custom") {
        setTimeleft(settings.custom);
    } else {
        setTimeleft(settings[sessionType]);
    }

 }

 const formatTime = (time:number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`; 
 }

 

 const pauseTimer = () => {
    setIsPaused(true);
 }
 const resumeTimer =  () => {
    setIsRunning(true)
    setIsPaused(false)
    setIsFinished(false)
 }

 const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setIsFinished(false);
    setTimeleft(settings.pomodoro);
 }

 const switchSession = () => {
    if (sessionType === "pomodoro"){
        // finished a focus session
        setCompletedSessions((prev)=> prev + 1)
        // Only after every 4 Pomodoros, take a long break, else take short break
        if ((completedSessions + 1) % 4 === 0) {
            setSessionType("longBreak")
            setTimeleft(settings.longBreak)
        }
        else {
            setSessionType("shortBreak")
            setTimeleft(settings.shortBreak) 
        }
    }
    else if (sessionType === "shortBreak" || sessionType === "longBreak"){
        setSessionType("pomodoro")
        setTimeleft(settings.pomodoro)
    }
    //Reset state
    setIsFinished(false)
    setIsPaused(false)
    setIsRunning(false)

 }

  return (
  <div>
    <div className= " flex flex-col items-center justify-center h-screen">
        <div className="border p-6 rounded-lg text-center ">
            {/* Title */}
            <div className=" justify-center text-2xl font-bold">
                {sessionType.toUpperCase()}
            </div>
            {/* Timer display */}
            <p className="text-4xl font-mono mb-4">{formatTime(timeleft)}</p>

            {/* Controls */}
            <div className="flex gap-2 cursor-pointer mb-4 ">
                {!isRunning && !isPaused && (<Magnetic><button onClick = {startTimer}> Start </button></Magnetic>
            )}

            {isRunning && !isPaused && (<Magnetic><button onClick = {pauseTimer}> Pause </button></Magnetic>
            )}
            {( isPaused && !isFinished) && (<Magnetic><button onClick = {resumeTimer}> Resume </button></Magnetic>
            )}
                
            <Magnetic><button onClick = {resetTimer}> Reset </button></Magnetic>
            </div>




        </div>

    </div>

  </div>

);
}