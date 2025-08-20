// "use client";

// import { useState, useEffect, useCallback } from "react";
// type SessionType = "pomodoro" | "shortBreak" | "longBreak" | "custom";

// interface TimerSettings{
//     pomodoro: number;
//     shortBreak: number;
//     longBreak: number;
//     custom: number;
//     cycles: number;
//     isRunning: boolean;
//     isPaused: boolean;
//     isFinished: boolean;
// }

// export default function Timer() {
//   const [timeleft, setTimeleft] = useState(25*60);
//   const [sessionType, setSessionType] = useState<SessionType>("pomodoro");
//   const [isRunning, setIsRunning] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isFinished, setIsFinished] = useState(false);
//   const [completedSessions, setCompletedSessions] = useState(0);
//   const [cycles, setCycles] = useState(0);
//   const [isCustomTime, setIsCustomTime] = useState(false);
  
//  const settings : TimerSettings = {
//     pomodoro: 25*60,
//     shortBreak: 5*60,
//     longBreak: 15*60,
//     custom: 0,
//     cycles: 4,
//     isRunning: false,
//     isPaused: false,
//     isFinished: false,
//  }

//  const getProgress = () => {
//     const totalTime = settings.pomodoro + settings.shortBreak + settings.longBreak;
//     const progress = (timeleft / totalTime) * 100;
//     return progress;
//  }

//  const startTimer = () => {
//     setIsRunning(true);
//     setIsPaused(false);
//     setIsFinished(false);
//  }

//  const switchSession = () => {

//  }

//  const pauseTimer = () => {}

//  const resetTimer = () => {}
//  const pauseTimer = () => {}



//   return <div>Timer</div>;
// }