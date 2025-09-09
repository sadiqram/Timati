'use client'

import { useState } from 'react';
import { useAuth } from '@/auth/AuthContext';
import { useSettings } from '@/contexts/SettingsContext';

interface SettingsProps {
  onClose: () => void;
}

export default function Settings({ onClose }: SettingsProps) {
  const { user, signOut, signInWithGoogle } = useAuth();
  const { settings, updateSettings, resetToDefaults } = useSettings();
  const [activeSection, setActiveSection] = useState('theme');
  
  // Auth form states
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  
  // Save functionality states
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const sections = [
    { id: 'theme', label: 'Themes'},
    { id: 'timer', label: 'Timers'},
    { id: 'sound', label: 'Sounds'},
    { id: 'auth', label: 'Account'}
  ];

  // Auth handlers

  const handleGoogleSignIn = async () => {
    setAuthLoading(true);
    setAuthError('');
    setAuthSuccess('');

    try {
      console.log('Attempting Google sign in');
      const { error } = await signInWithGoogle();
      
      if (error) {
        console.error('Google sign in error:', error);
        setAuthError(error.message);
      } else {
        console.log('Google sign in successful');
        setAuthSuccess('Successfully signed in with Google!');
      }
    } catch (err) {
      console.error('Unexpected error during Google sign in:', err);
      setAuthError('An unexpected error occurred. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };


  const handleSignOut = async () => {
    setAuthLoading(true);
    const { error } = await signOut();
    if (error) {
      setAuthError(error.message);
    } else {
      setAuthSuccess('Successfully signed out!');
    }
    setAuthLoading(false);
  };

  const handleSaveChanges = async () => {
    setSaveLoading(true);
    setSaveSuccess(false);
    
    try {
      // Since settings are already auto-saved to localStorage via context,
      // we just need to show success feedback and close the modal
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate save delay
      
      setSaveSuccess(true);
      
      // Auto-close modal after showing success message
      setTimeout(() => {
        onClose();
      }, 1500);
      
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaveLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 relative">
          <button
            onClick={onClose}
            disabled={saveLoading}
            className={`absolute top-4 right-4 transition-colors ${
              saveLoading 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-white hover:text-gray-200'
            }`}
            aria-label="Close settings"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-xl font-bold">Settings</h2>
          <p className="text-blue-100 text-sm">Customize your Timati experience</p>
          
          {/* Success Message */}
          {saveSuccess && (
            <div className="mt-4 p-3 bg-green-500/20 border border-green-400/30 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-100 text-sm font-medium">Settings saved successfully!</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-1 min-h-0 flex-col lg:flex-row">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-64 bg-gray-50 p-4 border-b lg:border-b-0 lg:border-r flex-shrink-0">
            <div className="flex lg:flex-col gap-2 lg:gap-0 overflow-x-auto lg:overflow-x-visible">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                className={`flex-shrink-0 lg:w-full text-left p-3 rounded-lg lg:mb-2 whitespace-nowrap ${
                  activeSection === section.id
                    ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600'
                    : 'text-gray-900 hover:text-gray-900'
                }`}
                >
                  {/* <span className="text-xl mr-3">{section.icon}</span> */}
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-y-auto min-h-0">
            {/* Theme Settings */}
            {activeSection === 'theme' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Themes</h3>
                <h4 className='text-gray-800'>Appearance</h4>

                <div className="space-y-6">
                  {/* Mode selection */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Theme Mode</h4>
                    <div className="flex gap-2">
                      {(['light','dark','system'] as const).map(mode => (
                        <button
                          key={mode}
                          onClick={() => updateSettings({ themeMode: mode })}
                          className={`px-3 py-2 rounded border text-sm ${
                            settings.themeMode === mode ? 'border-blue-500 bg-blue-50 text-gray-800' : 'border-gray-300 hover:border-gray-400 text-gray-800'
                          }`}
                        >
                          {mode[0].toUpperCase() + mode.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Accent selection */}
                  <div>
                    <h4 className='text-gray-800 mb-2'>Accent color</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {([
                        { id: 'blue', class: 'bg-blue-500' },
                        { id: 'green', class: 'bg-green-500' },
                        { id: 'purple', class: 'bg-purple-500' },
                      ] as const).map(accent => (
                        <button
                          key={accent.id}
                          onClick={() => updateSettings({ accent: accent.id })}
                          className={`p-4 border-2 rounded-lg text-center cursor-pointer ${
                            settings.accent === accent.id ? 'border-blue-500' : 'border-gray-200'
                          }`}
                          aria-label={`Select ${accent.id} accent`}
                        >
                          <div className={`w-12 h-12 ${accent.class} rounded-lg mx-auto mb-2`}></div>
                          <span className="text-sm font-medium text-gray-800 capitalize">{accent.id}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Timer Settings */}
            {activeSection === 'timer' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Timers</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-900">
                        Pomodoro (minutes)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="120"
                        value={settings.pomodoro}
                        onChange={(e) => updateSettings({ pomodoro: Number(e.target.value) })}
                        className="w-full p-3 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-900">
                        Short Break (minutes)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={settings.shortBreak}
                        onChange={(e) => updateSettings({ shortBreak: Number(e.target.value) })}
                        className="w-full p-3 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-900">
                        Long Break (minutes)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="60"
                        value={settings.longBreak}
                        onChange={(e) => updateSettings({ longBreak: Number(e.target.value) })}
                        className="w-full p-3 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2 text-sm">Auto-start Settings</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">Auto-start breaks</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">Auto-start pomodoros</span>
                      </label>
                    </div>
                  </div> */}
                </div>
              </div>
            )}

            {/* Sound/Alert Settings */}
            {activeSection === 'sound' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Sounds</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-mediu text-gray-800">Sound Notifications</h4>
                      <p className="text-sm text-gray-800">Play sounds when timer completes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.soundEnabled}
                        onChange={(e) => updateSettings({ soundEnabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">Desktop Notifications</h4>
                      <p className="text-sm text-gray-800">Show notifications when timer completes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notificationsEnabled}
                        onChange={(e) => updateSettings({ notificationsEnabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-900">
                      Sound Volume
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={settings.volume}
                      onChange={(e) => updateSettings({ volume: Number(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-900">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => updateSettings({ soundType: 'bell' })}
                      className={`p-3 border rounded-lg text-gray-800 ${
                        settings.soundType === 'bell' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      Bell
                    </button>
                    <button 
                      onClick={() => updateSettings({ soundType: 'chime' })}
                      className={`p-3 border rounded-lg text-gray-800 ${
                        settings.soundType === 'chime' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      Chime
                    </button>
                    <button 
                      onClick={() => updateSettings({ soundType: 'ocean' })}
                      className={`p-3 border rounded-lg text-gray-800 ${
                        settings.soundType === 'ocean' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      Ocean
                    </button>
                    <button 
                      onClick={() => updateSettings({ soundType: 'melody' })}
                      className={`p-3 border rounded-lg text-gray-800 ${
                        settings.soundType === 'melody' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      Melody
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Account/Authentication */}
            {activeSection === 'auth' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  {user ? 'Account' : 'Sign In'}
                </h3>
                
                {user ? (
                  /* User is signed in - show account info and settings */
                  <div className="space-y-6">
                    {/* User Profile */}
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                          {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800">
                            {user.user_metadata?.full_name || 'User'}
                          </h4>
                          <p className="text-gray-800">{user.email}</p>
                          <p className="text-sm text-gray-900">
                            Member since {new Date(user.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Account Actions */}
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-3">Account Settings</h4>
                        <div className="space-y-3">
                          <button className="w-full text-left p-3 bg-white rounded-lg border hover:bg-gray-50 transition-colors">
                            <div className="font-medium">Profile Settings</div>
                            <div className="text-sm text-gray-800">Update your name and profile information</div>
                          </button>
                          <button className="w-full text-left p-3 bg-white rounded-lg border hover:bg-gray-50 transition-colors">
                            <div className="font-medium">Change Password</div>
                            <div className="text-sm text-gray-800">Update your account password</div>
                          </button>
                          <button className="w-full text-left p-3 bg-white rounded-lg border hover:bg-gray-50 transition-colors">
                            <div className="font-medium">Privacy Settings</div>
                            <div className="text-sm text-gray-800">Manage your privacy preferences</div>
                          </button>
                        </div>
                      </div>

                      {/* Sign Out */}
                      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                        <h4 className="font-medium text-red-800 mb-2">Danger Zone</h4>
                        <button
                          onClick={handleSignOut}
                          disabled={authLoading}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                        >
                          {authLoading ? 'Signing out...' : 'Sign Out'}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* User is not signed in - show Google sign in */
                  <div className="space-y-6">

                    {/* Error/Success Messages */}
                    {authError && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-800 text-sm">{authError}</p>
                      </div>
                    )}
                    {authSuccess && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-800 text-sm">{authSuccess}</p>
                      </div>
                    )}

                    {/* Google Sign In */}
                    <div className="p-6 border border-gray-200 rounded-lg text-center">
                      <h4 className="text-lg font-medium text-gray-800 mb-4">Sign in with Google</h4>
                      <p className="text-gray-600 mb-6">Use your Google account to sign in and sync your settings across devices.</p>
                      
                      <button
                        onClick={handleGoogleSignIn}
                        disabled={authLoading}
                        className="w-full flex justify-center items-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        {authLoading ? 'Signing in...' : 'Continue with Google'}
                      </button>
                    </div>

                    {/* Benefits */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2 text-sm">Benefits of having an account:</h4>
                      <ul className="text-sm text-gray-800 space-y-1">
                        <li>• Sync settings across devices</li>
                        <li>• Track your productivity stats</li>
                        <li>• Save custom timer presets</li>
                        <li>• Access to premium features</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t flex flex-col sm:flex-row justify-between items-center gap-3 flex-shrink-0">
          <button 
            onClick={resetToDefaults}
            className=" cursor-pointer border px-4 py-2 rounded bg-red-600 text-white text-sm hover:bg-red-700 transition-colors"
          >
            Reset to Defaults
          </button>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button 
              onClick={onClose}
              disabled={saveLoading}
              className={`px-4 py-2 text-sm transition-colors ${
                saveLoading 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-red-800 cursor-pointer hover:text-red-900'
              }`}
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveChanges}
              disabled={saveLoading || saveSuccess}
              className={`px-4 py-2 rounded text-sm transition-colors order-1 sm:order-2 ${
                saveLoading || saveSuccess
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
              }`}
            >
              {saveLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </div>
              ) : saveSuccess ? (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Saved!
                </div>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}