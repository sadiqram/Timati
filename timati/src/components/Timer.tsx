"use client";

import { time } from "console";
import { useState, useEffect } from "react";
import Button from "./Button";
import Magnetic from "./Magnetic";
import { IoSettingsSharp } from "react-icons/io5";
import SpotifyEmb from "./SpotifyEmb";
import Settings from "./Settings";
import { useSettings } from "@/contexts/SettingsContext";

type SessionType = "pomodoro" | "shortBreak" | "longBreak";

interface TimerSettings {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  customPomodoro: number;
  cycles: number;
  isRunning: boolean;
  isPaused: boolean;
  isFinished: boolean;
}

export default function Timer() {
  const { settings } = useSettings();
  const [timeleft, setTimeleft] = useState(settings.pomodoro * 60);
  const [sessionType, setSessionType] = useState<SessionType>("pomodoro");
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Update timer when settings change
  useEffect(() => {
    if (!isRunning && !isPaused) {
      setTimeleft(settings[sessionType] * 60);
    }
  }, [settings, sessionType, isRunning, isPaused]);
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && !isPaused && timeleft > 0 && !isFinished) {
      timer = setInterval(() => {
        setTimeleft((prev) => prev - 1);
      }, 1000);
    }

    //auto switch session to short break every pomo, and long break ever 4 pomos
    if (timeleft === 0 && !isFinished) {
      setIsRunning(false);
      setIsPaused(false);
      setIsFinished(true);
      switchSession();
    }

    return () => clearInterval(timer);
  }, [isRunning, isPaused, timeleft, isFinished]);

  const getProgress = () => {
    const totalTime = (settings.pomodoro + settings.shortBreak + settings.longBreak) * 60;
    const progress = (timeleft / totalTime) * 100;
    return progress;
  };

  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
    setIsFinished(false);

    // Set timer to the current session duration from settings
    setTimeleft(settings[sessionType] * 60);
  };

  const formatTime = (time: number) => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };
  const resumeTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
    setIsFinished(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setIsFinished(false);
    setCompletedSessions(0);

    // reset to default pomodoro
    setSessionType("pomodoro");
    setTimeleft(settings.pomodoro * 60);
  };
  const endSession = () => {
    setIsFinished(true);
    switchSession();
  };

  const switchSession = () => {
    if (sessionType === "pomodoro") {
      // finished a focus session
      setCompletedSessions((prev) => prev + 1);
      // Only after every 4 Pomodoros, take a long break, else take short break
      if ((completedSessions + 1) % 4 === 0) {
        setSessionType("longBreak");
        setTimeleft(settings.longBreak * 60);
      } else {
        setSessionType("shortBreak");
        setTimeleft(settings.shortBreak * 60);
      }
    } else {
      setSessionType("pomodoro");
      setTimeleft(settings.pomodoro * 60);
    }

    //Reset state
    setIsFinished(false);
    setIsPaused(false);
    setIsRunning(settings.autoStartBreaks || settings.autoStartPomodoros); // auto-start based on settings
  };

  const changeSession = (newSessionType: SessionType) => {
    setSessionType(newSessionType);
    setIsRunning(false);
    setIsPaused(false);
    setIsFinished(false);
    
    // Set the appropriate time for the new session
    setTimeleft(settings[newSessionType] * 60);
  };

  const focusPlaylists = {
    "Deep Focus": "37i9dQZF1DX0XUsuxWHRQd",
    "Lo-Fi Hip Hop": "37i9dQZF1DWWQRwui0ExPn",
    "Classical Focus": "37i9dQZF1DWWEJlAGA9gs0",
    "Nature Sounds": "37i9dQZF1DX4PP3DA4J0N8",
  };

  return (
    <div className="flex items-center justify-center">
      <div className=" flex flex-col items-center justify-center h-screen">
        <div className=" text-center ">
          {/* Title */}
          <div className=" flex flex-row  align-center justify-center  gap-4 text-2xl font-bold">
            {/* pomodoro, short break, long break, custom pomodoro */}
           
            <button onClick={() => changeSession("pomodoro")} className="glowy-button">Pomodoro</button>
            <button onClick={() => changeSession("shortBreak")} className="glowy-button">Short Break</button>
            <button onClick={() => changeSession("longBreak")} className="glowy-button">Long Break</button>

          </div>
          {/* Timer display */}
          <time className="text-9xl tracking-[-0.25rem] font-mono  "> {formatTime(timeleft)}</time>
          {/* <p className="text-9xl tracking-[-0.25rem] font-Roboto mb-4 ">{formatTime(timeleft)}</p> */}

          {/* Controls */}
          <div className="flex items-center justify-center gap-2 cursor-pointer mb-4 font-bold ">
            {!isRunning && !isPaused && (
              <Magnetic>
                <button onClick={startTimer} className="glowy-button"> Start </button>
              </Magnetic>
            )}

            {isRunning && !isPaused && (
              <Magnetic>
                <button onClick={pauseTimer} className="glowy-button"> Pause </button>
              </Magnetic>
            )}
            {isPaused && !isFinished && (
              <Magnetic>
                <button onClick={resumeTimer} className="glowy-button"> Resume </button>
              </Magnetic>
            )}

            {isRunning && (
              <Magnetic>
                <button onClick={resetTimer}  className="glowy-button"> Reset </button>
              </Magnetic>
            )}
             {isRunning && (
            <Magnetic>
              <button onClick={endSession} className="glowy-button"> End Session </button>
            </Magnetic>
            )}
            

            <Magnetic>
              <button onClick={() => setShowSettingsModal(true)}>
                {" "}
                <IoSettingsSharp />{" "}
              </button>
            </Magnetic>
          </div>
          
        </div>
        {/* Spotify */}
        
        <div className=" p-6 rounded-lg items-center justify-center">
           
            <SpotifyEmb playlistId={focusPlaylists["Deep Focus"]} />
          </div>
        
        {/* Settings Modal */}
        {showSettingsModal && (
          <Settings onClose={() => setShowSettingsModal(false)} />
        )}
      </div>
     
    </div>
  );
}
