"use client";

import { time } from "console";
import { useState, useEffect } from "react";
import Button from "./Button";
import Magnetic from "./Magnetic";
import { IoSettingsSharp } from "react-icons/io5";
import SpotifyEmb from "./SpotifyEmb";

type SessionType = "pomodoro" | "shortBreak" | "longBreak" | "customPomodoro";

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
  const [timeleft, setTimeleft] = useState(25 * 60);
  const [sessionType, setSessionType] = useState<SessionType>("pomodoro");
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  //   const [cycles, setCycles] = useState(0);

  // Customize Pomodoro Settings
  const [isCustomPomodoro, setIsCustomPomodoro] = useState(false);
  const [customPomodoro, setCustomPomodoro] = useState(25);
  const [customShortBreak, setCustomShortBreak] = useState(5);
  const [customLongBreak, setCustomLongBreak] = useState(15);

  //   Custom Timer Settings
  //   const [isCustomTimer, setIsCustomTimer] = useState(false);
  //   const [customTimer,setCustomTimer] = useState(25)
  //   const [customCycles, setCustomCycles] = useState(4);

  const settings: TimerSettings = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
    customPomodoro: 0,
    cycles: 4,
    isRunning: false,
    isPaused: false,
    isFinished: false,
  };
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
    const totalTime =
      settings.pomodoro + settings.shortBreak + settings.longBreak;
    const progress = (timeleft / totalTime) * 100;
    return progress;
  };

  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
    setIsFinished(false);

    // Reset to correct seesion length when starting afresh
    // if (sessionType === "custom") {
    //     setTimeleft(settings.custom);
    // } else {
    //     setTimeleft(settings[sessionType]);
    // }

    // Dynamically compute durations from state, instead of mutating settings
    if (isCustomPomodoro) {
      if (sessionType === "pomodoro" || sessionType === "customPomodoro") {
        setTimeleft(customPomodoro * 60);
      } else if (sessionType === "shortBreak") {
        setTimeleft(customShortBreak * 60);
      } else if (sessionType === "longBreak") {
        setTimeleft(customLongBreak * 60);
      }
    } else {
      setTimeleft(settings[sessionType]);
    }
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
    setIsCustomPomodoro(false);
    setSessionType("pomodoro");
    setTimeleft(settings.pomodoro);
  };
  const endSession = () => {
    setIsFinished(true);
    switchSession();
  };

  const switchSession = () => {
    if (sessionType === "pomodoro" || sessionType === "customPomodoro") {
      // finished a focus session
      setCompletedSessions((prev) => prev + 1);
      // Only after every 4 Pomodoros, take a long break, else take short break
      if ((completedSessions + 1) % 4 === 0) {
        setSessionType("longBreak");
        setTimeleft(
          isCustomPomodoro ? customLongBreak * 60 : settings.longBreak
        );
      } else {
        setSessionType("shortBreak");
        setTimeleft(
          isCustomPomodoro ? customShortBreak * 60 : settings.shortBreak
        );
      }
    } else {
      setSessionType(isCustomPomodoro ? "customPomodoro" : "pomodoro");
      setTimeleft(isCustomPomodoro ? customPomodoro * 60 : settings.pomodoro);
    }

    //Reset state
    setIsFinished(false);
    setIsPaused(false);
    setIsRunning(true); // auto-start next session
  };

  const changeSession = (newSessionType: SessionType) => {
    setSessionType(newSessionType);
    setIsRunning(false);
    setIsPaused(false);
    setIsFinished(false);
    
    // Set the appropriate time for the new session
    if (isCustomPomodoro) {
      if (newSessionType === "pomodoro" || newSessionType === "customPomodoro") {
        setTimeleft(customPomodoro * 60);
      } else if (newSessionType === "shortBreak") {
        setTimeleft(customShortBreak * 60);
      } else if (newSessionType === "longBreak") {
        setTimeleft(customLongBreak * 60);
      }
    } else {
      setTimeleft(settings[newSessionType]);
    }
  };
  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // update settings
    settings.pomodoro = customPomodoro * 60;
    settings.shortBreak = customShortBreak * 60;
    settings.longBreak = customLongBreak * 60;

    // set session type
    setSessionType("customPomodoro");
    setTimeleft(settings.pomodoro);
    setIsCustomPomodoro(true);
  };

  const cancelCustom = () => {
    setIsCustomPomodoro(false);
    setSessionType("pomodoro");
    setTimeleft(settings.pomodoro);
    setIsRunning(false);
    setIsPaused(false);
    setIsFinished(false);
    setShowSettings(!showSettings);
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
          <div className=" flex flex-row  align-center justify-center gap-4 text-2xl font-bold">
            {/* pomodoro, short break, long break, custom pomodoro */}
           
            <button onClick={() => changeSession("pomodoro")} className="">Pomodoro</button>
            <button onClick={() => changeSession("shortBreak")}>Short Break</button>
            <button onClick={() => changeSession("longBreak")}>Long Break</button>

          </div>
          {/* Timer display */}
          <time className="text-9xl tracking-[-0.25rem] font-mono mb-4 "> {formatTime(timeleft)}</time>
          {/* <p className="text-9xl tracking-[-0.25rem] font-Roboto mb-4 ">{formatTime(timeleft)}</p> */}

          {/* Controls */}
          <div className="flex items-center justify-center gap-2 cursor-pointer mb-4 ">
            {!isRunning && !isPaused && (
              <Magnetic>
                <button onClick={startTimer}> Start </button>
              </Magnetic>
            )}

            {isRunning && !isPaused && (
              <Magnetic>
                <button onClick={pauseTimer}> Pause </button>
              </Magnetic>
            )}
            {isPaused && !isFinished && (
              <Magnetic>
                <button onClick={resumeTimer}> Resume </button>
              </Magnetic>
            )}

            {isRunning && (
              <Magnetic>
                <button onClick={resetTimer}> Reset </button>
              </Magnetic>
            )}
             {isRunning && (
            <Magnetic>
              <button onClick={endSession}> End Session </button>
            </Magnetic>
            )}
            

            <Magnetic>
              <button onClick={() => setShowSettings(!showSettings)}>
                {" "}
                <IoSettingsSharp />{" "}
              </button>
            </Magnetic>
            {showSettings && (
              <form
                onSubmit={handleCustomSubmit}
                className="flex flex-col gap-2 mt-4"
              >
                <label>
                  Pomodoro (minutes):
                  <input
                    type="number"
                    min="1"
                    value={customPomodoro}
                    onChange={(e) => setCustomPomodoro(Number(e.target.value))}
                  />
                </label>

                <label>
                  Short Break (minutes):
                  <input
                    type="number"
                    min="1"
                    value={customShortBreak}
                    onChange={(e) =>
                      setCustomShortBreak(Number(e.target.value))
                    }
                  />
                </label>

                <label>
                  Long Break (minutes):
                  <input
                    type="number"
                    min="1"
                    value={customLongBreak}
                    onChange={(e) => setCustomLongBreak(Number(e.target.value))}
                  />
                </label>

                <button type="button" onClick={cancelCustom}>
                  Cancel
                </button>
                <button type="submit">Save Custom Settings</button>
              </form>
            )}
          </div>
          
        </div>
        {/* Spotify */}
        
        <div className=" p-6 rounded-lg items-center justify-center">
           
            <SpotifyEmb playlistId={focusPlaylists["Deep Focus"]} />
          </div>
        
      </div>
     
    </div>
  );
}
