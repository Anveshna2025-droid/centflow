import React, { useState } from 'react';
import Card from '../components/Card';
import { useTheme } from '../store/ThemeContext';
import { useAuth } from '../store/AuthContext';
import { useNotification } from '../store/NotificationContext';
import { Moon, Sun, Bell, Shield, User } from 'lucide-react';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, updateProfile, logout } = useAuth();
  const { addNotification } = useNotification();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.displayName || '');

  const handleSaveProfile = () => {
    if (editName.trim()) {
      updateProfile(editName);
      setIsEditing(false);
      addNotification('Profile updated successfully.', 'success');
    }
  };

  const handleSave = () => {
    addNotification('Settings saved successfully.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 fade-up pb-8">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-syne font-bold text-cf-text mb-2">Settings</h1>
          <p className="text-cf-muted">Manage your preferences and account details.</p>
        </div>
        <button onClick={logout} className="px-4 py-2 text-cf-red hover:bg-cf-red/10 rounded-lg font-bold transition-colors">
          Sign Out
        </button>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card>
          <div className="flex items-center justify-between mb-6 border-b border-cf-border pb-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-cf-accent" />
              <h2 className="text-xl font-bold text-cf-text">Account Profile</h2>
            </div>
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} className="text-sm font-bold text-cf-accent hover:underline">Edit</button>
            )}
          </div>
          
          <div className="flex items-center gap-6 mb-6">
            <img 
              src={user?.photoURL || 'https://ui-avatars.com/api/?name=Trader&background=random'} 
              alt="Profile" 
              className="w-20 h-20 rounded-full border-2 border-cf-border object-cover bg-cf-surface"
            />
            <div className="flex-1">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="bg-cf-bg border border-cf-accent rounded-lg px-3 py-1 text-cf-text focus:outline-none"
                  />
                  <button onClick={handleSaveProfile} className="bg-cf-accent text-white px-3 py-1 rounded-lg text-sm font-bold">Save</button>
                  <button onClick={() => setIsEditing(false)} className="text-cf-muted text-sm px-2">Cancel</button>
                </div>
              ) : (
                <>
                  <p className="text-lg font-bold text-cf-text">{user?.displayName || 'Trader'}</p>
                  <p className="text-cf-muted">{user?.email || 'user@example.com'}</p>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* Preferences */}
        <Card>
          <div className="flex items-center gap-3 mb-6 border-b border-cf-border pb-4">
            <Moon className="w-5 h-5 text-cf-accent" />
            <h2 className="text-xl font-bold text-cf-text">App Preferences</h2>
          </div>

          <div className="space-y-6">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-cf-text flex items-center gap-2">
                  {theme === 'dark' ? <Moon className="w-4 h-4 text-cf-muted" /> : <Sun className="w-4 h-4 text-cf-muted" />}
                  Dark Mode
                </p>
                <p className="text-sm text-cf-muted">Toggle the application theme.</p>
              </div>
              <button 
                onClick={toggleTheme}
                className={`w-14 h-7 rounded-full p-1 transition-colors ${theme === 'dark' ? 'bg-cf-accent' : 'bg-cf-border'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-7' : 'translate-x-0'}`}></div>
              </button>
            </div>

            {/* Notifications Toggle */}
            <div className="flex items-center justify-between pt-4 border-t border-cf-border">
              <div>
                <p className="font-bold text-cf-text flex items-center gap-2">
                  <Bell className="w-4 h-4 text-cf-muted" />
                  Push Notifications
                </p>
                <p className="text-sm text-cf-muted">Receive alerts for price movements.</p>
              </div>
              <button className="w-14 h-7 rounded-full p-1 transition-colors bg-cf-accent">
                <div className="w-5 h-5 rounded-full bg-white transition-transform translate-x-7"></div>
              </button>
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card>
          <div className="flex items-center gap-3 mb-6 border-b border-cf-border pb-4">
            <Shield className="w-5 h-5 text-cf-accent" />
            <h2 className="text-xl font-bold text-cf-text">Security</h2>
          </div>
          <div className="flex justify-between items-center">
             <div>
                <p className="font-bold text-cf-text">Two-Factor Authentication (2FA)</p>
                <p className="text-sm text-cf-muted">Add an extra layer of security to your account.</p>
             </div>
             <button className="px-4 py-2 bg-cf-surface border border-cf-border rounded-lg text-sm font-bold text-cf-text hover:border-cf-accent transition-all">
               Enable
             </button>
          </div>
        </Card>

        <div className="flex justify-end pt-4">
          <button 
            onClick={handleSave}
            className="px-6 py-3 bg-cf-accent text-white rounded-xl font-bold hover:shadow-glow transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
