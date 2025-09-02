'use client'

import { useState } from 'react';

interface SettingsProps {
  onClose: () => void;
}

export default function Settings({ onClose }: SettingsProps) {
  const [activeSection, setActiveSection] = useState('theme');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25);
  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const sections = [
    { id: 'theme', label: 'Themes', icon: '' },
    { id: 'timer', label: 'Timers', icon: '' },
    { id: 'sound', label: 'Sounds', icon: '' },
    { id: 'auth', label: 'Account', icon: '' }
  ];

  return (
    <div  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center ">
        <div>
            <h2>Settings</h2>
            <p>Customize your Timati experience</p>
        </div>
        <div>
            <h2>Themes</h2>
        </div>
        <div>
            <h2>Timers</h2>
        </div>
        <div>
            <h2>Sounds</h2>
        </div>
        <div>
            <h2>Account</h2>
        </div>

        {/* footer */}
        <div className='modal-footer'> 
        <div>
            <h2>Reset all</h2>
        </div>
        <div>
            <h2>Cancel</h2>
        </div>
        <div>
            <h2>Save Changes</h2>
        </div>
        </div>

    </div>
    // <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    //   <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
    //     {/* Header */}
    //     <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
    //       <h2 className="text-xl font-bold">Settings</h2>
    //       <p className="text-blue-100 text-sm">Customize your Timati experience</p>
    //     </div>

    //     <div className="flex">
    //       {/* Sidebar Navigation */}
    //       <div className="w-64 bg-gray-50 p-4 border-r">
    //         {sections.map((section) => (
    //           <button
    //             key={section.id}
    //             onClick={() => setActiveSection(section.id)}
    //             className={`w-full text-left p-3 rounded-lg mb-2 ${
    //               activeSection === section.id
    //                 ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600'
    //                 : 'text-gray-700'
    //             }`}
    //           >
    //             <span className="text-xl mr-3">{section.icon}</span>
    //             {section.label}
    //           </button>
    //         ))}
    //       </div>

    //       {/* Content Area */}
    //       <div className="flex-1 p-6 overflow-y-auto">
    //         {/* Theme Settings */}
    //         {activeSection === 'theme' && (
    //           <div className="space-y-6">
    //             <h3 className="text-lg font-semibold text-gray-800">Themes</h3>
                
    //             <div className="space-y-4">
    //               <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
    //                 <div>
    //                   <h4 className="font-medium">Dark Mode</h4>
    //                   <p className="text-sm text-gray-600">Switch between light and dark themes</p>
    //                 </div>
    //                 <label className="relative inline-flex items-center cursor-pointer">
    //                   <input
    //                     type="checkbox"
    //                     checked={isDarkMode}
    //                     onChange={(e) => setIsDarkMode(e.target.checked)}
    //                     className="sr-only peer"
    //                   />
    //                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    //                 </label>
    //               </div>

    //               <div className="grid grid-cols-3 gap-4">
    //                 <div className="p-4 border-2 border-gray-200 rounded-lg text-center cursor-pointer">
    //                   <div className="w-12 h-12 bg-blue-500 rounded-lg mx-auto mb-2"></div>
    //                   <span className="text-sm font-medium">Blue</span>
    //                 </div>
    //                 <div className="p-4 border-2 border-gray-200 rounded-lg text-center cursor-pointer">
    //                   <div className="w-12 h-12 bg-green-500 rounded-lg mx-auto mb-2"></div>
    //                   <span className="text-sm font-medium">Green</span>
    //                 </div>
    //                 <div className="p-4 border-2 border-gray-200 rounded-lg text-center cursor-pointer">
    //                   <div className="w-12 h-12 bg-purple-500 rounded-lg mx-auto mb-2"></div>
    //                   <span className="text-sm font-medium">Purple</span>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         )}

    //         {/* Timer Settings */}
    //         {activeSection === 'timer' && (
    //           <div className="space-y-6">
    //             <h3 className="text-lg font-semibold text-gray-800">Timers</h3>
                
    //             <div className="space-y-4">
    //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    //                 <div className="space-y-2">
    //                   <label className="block text-sm font-medium text-gray-700">
    //                     Pomodoro (minutes)
    //                   </label>
    //                   <input
    //                     type="number"
    //                     min="1"
    //                     max="120"
    //                     value={pomodoroTime}
    //                     onChange={(e) => setPomodoroTime(Number(e.target.value))}
    //                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //                   />
    //                 </div>
                    
    //                 <div className="space-y-2">
    //                   <label className="block text-sm font-medium text-gray-700">
    //                     Short Break (minutes)
    //                   </label>
    //                   <input
    //                     type="number"
    //                     min="1"
    //                     max="30"
    //                     value={shortBreakTime}
    //                     onChange={(e) => setShortBreakTime(Number(e.target.value))}
    //                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //                   />
    //                 </div>
                    
    //                 <div className="space-y-2">
    //                   <label className="block text-sm font-medium text-gray-700">
    //                     Long Break (minutes)
    //                   </label>
    //                   <input
    //                     type="number"
    //                     min="1"
    //                     max="60"
    //                     value={longBreakTime}
    //                     onChange={(e) => setLongBreakTime(Number(e.target.value))}
    //                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //                   />
    //                 </div>
    //               </div>

    //               <div className="p-4 bg-blue-50 rounded-lg">
    //                 <h4 className="font-medium text-blue-800 mb-2 text-sm">Auto-start Settings</h4>
    //                 <div className="space-y-2">
    //                   <label className="flex items-center">
    //                     <input type="checkbox" className="mr-2" />
    //                     <span className="text-sm">Auto-start breaks</span>
    //                   </label>
    //                   <label className="flex items-center">
    //                     <input type="checkbox" className="mr-2" />
    //                     <span className="text-sm">Auto-start pomodoros</span>
    //                   </label>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         )}

    //         {/* Sound/Alert Settings */}
    //         {activeSection === 'sound' && (
    //           <div className="space-y-6">
    //             <h3 className="text-lg font-semibold text-gray-800">Sounds</h3>
                
    //             <div className="space-y-4">
    //               <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
    //                 <div>
    //                   <h4 className="font-medium">Sound Notifications</h4>
    //                   <p className="text-sm text-gray-600">Play sounds when timer completes</p>
    //                 </div>
    //                 <label className="relative inline-flex items-center cursor-pointer">
    //                   <input
    //                     type="checkbox"
    //                     checked={soundEnabled}
    //                     onChange={(e) => setSoundEnabled(e.target.checked)}
    //                     className="sr-only peer"
    //                   />
    //                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    //                 </label>
    //               </div>

    //               <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
    //                 <div>
    //                   <h4 className="font-medium">Desktop Notifications</h4>
    //                   <p className="text-sm text-gray-600">Show notifications when timer completes</p>
    //                 </div>
    //                 <label className="relative inline-flex items-center cursor-pointer">
    //                   <input
    //                     type="checkbox"
    //                     checked={notificationsEnabled}
    //                     onChange={(e) => setNotificationsEnabled(e.target.checked)}
    //                     className="sr-only peer"
    //                   />
    //                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    //                 </label>
    //               </div>

    //               <div className="space-y-2">
    //                 <label className="block text-sm font-medium text-gray-700">
    //                   Sound Volume
    //                 </label>
    //                 <input
    //                   type="range"
    //                   min="0"
    //                   max="100"
    //                   defaultValue="50"
    //                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
    //                 />
    //                 <div className="flex justify-between text-xs text-gray-500">
    //                   <span>0%</span>
    //                   <span>50%</span>
    //                   <span>100%</span>
    //                 </div>
    //               </div>

    //               <div className="grid grid-cols-2 gap-4">
    //                 <button className="p-3 border border-gray-300 rounded-lg">
    //                   🔔 Bell
    //                 </button>
    //                 <button className="p-3 border border-gray-300 rounded-lg">
    //                   🎵 Chime
    //                 </button>
    //                 <button className="p-3 border border-gray-300 rounded-lg">
    //                   🌊 Ocean
    //                 </button>
    //                 <button className="p-3 border border-gray-300 rounded-lg">
    //                   🎶 Melody
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //         )}

    //         {/* Sign Up/Sign In */}
    //         {activeSection === 'auth' && (
    //           <div className="space-y-6">
    //             <h3 className="text-lg font-semibold text-gray-800">Account</h3>
                
    //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //               {/* Sign In */}
    //               <div className="p-6 border border-gray-200 rounded-lg">
    //                 <h4 className="text-base font-medium text-gray-800 mb-4">Sign In</h4>
    //                 <form className="space-y-4">
    //                   <div>
    //                     <label className="block text-sm font-medium text-gray-700 mb-1">
    //                       Email
    //                     </label>
    //                     <input
    //                       type="email"
    //                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //                       placeholder="Enter your email"
    //                     />
    //                   </div>
    //                   <div>
    //                     <label className="block text-sm font-medium text-gray-700 mb-1">
    //                       Password
    //                     </label>
    //                     <input
    //                       type="password"
    //                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //                       placeholder="Enter your password"
    //                     />
    //                   </div>
    //                   <button
    //                     type="submit"
    //                     className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
    //                   >
    //                     Sign In
    //                   </button>
    //                 </form>
    //               </div>

    //               {/* Sign Up */}
    //               <div className="p-6 border border-gray-200 rounded-lg">
    //                 <h4 className="text-base font-medium text-gray-800 mb-4">Create Account</h4>
    //                 <form className="space-y-4">
    //                   <div>
    //                     <label className="block text-sm font-medium text-gray-700 mb-1">
    //                       Full Name
    //                     </label>
    //                     <input
    //                       type="text"
    //                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //                       placeholder="Enter your full name"
    //                     />
    //                   </div>
    //                   <div>
    //                     <label className="block text-sm font-medium text-gray-700 mb-1">
    //                       Email
    //                     </label>
    //                     <input
    //                       type="email"
    //                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //                       placeholder="Enter your email"
    //                     />
    //                   </div>
    //                   <div>
    //                     <label className="block text-sm font-medium text-gray-700 mb-1">
    //                       Password
    //                     </label>
    //                     <input
    //                       type="password"
    //                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //                       placeholder="Create a password"
    //                     />
    //                   </div>
    //                   <button
    //                     type="submit"
    //                     className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
    //                   >
    //                     Create Account
    //                   </button>
    //                 </form>
    //               </div>
    //             </div>

    //             <div className="p-4 bg-gray-50 rounded-lg">
    //               <h4 className="font-medium text-gray-800 mb-2 text-sm">Benefits of signing up:</h4>
    //               <ul className="text-sm text-gray-600 space-y-1">
    //                 <li>• Sync settings across devices</li>
    //                 <li>• Track your productivity stats</li>
    //                 <li>• Save custom timer presets</li>
    //                 <li>• Access to premium features</li>
    //               </ul>
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     </div>

    //     {/* Footer */}
    //     <div className="bg-gray-50 px-6 py-4 border-t flex justify-between items-center">
    //       <button className="text-red-600 text-sm">
    //         Reset all
    //       </button>
    //       <div className="space-x-3">
    //         <button 
    //           onClick={onClose}
    //           className="px-3 py-1.5 text-gray-600 text-sm"
    //         >
    //           Cancel
    //         </button>
    //         <button className=" text-black rounded text-sm">
    //           Save Changes
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}