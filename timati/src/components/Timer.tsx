"use client";

import { time } from "console";
import { useState, useEffect} from "react";
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
    
    if (timeleft === 0) {
        setIsRunning(false);
        setIsPaused(false);
        setIsFinished(true);
    }

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

    // Start the timer
 }

 const switchSession = () => {

 }

 const pauseTimer = () => {}

 const resetTimer = () => {}
 const pauseTimer = () => {}



  return <div>Timer</div>;
}