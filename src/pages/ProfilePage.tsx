import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Bell, History, Settings as SettingsIcon, LogOut, AlertCircle, Camera, Lock } from 'lucide-react';
import { useToast } from '../components/ToastProvider';
import { Skeleton } from '../components/Skeleton';
import { useSettings } from '../contexts/SettingsContext';
import ProfileImageModal from '../components/ProfileImageModal';
import { Tooltip } from '../components/Tooltip';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('details');
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();
  const { settings, updateSettings } = useSettings();

  const [firstName, setFirstName] = useState('Alex');
  const [lastName, setLastName] = useState('Rivera');
  const [title, setTitle] = useState('Senior UI/UX Designer');
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const [titleTouched, setTitleTouched] = useState(false);

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuBu_KNLLG2gEi3I-O5NgOkPzzYSGLO65Fi01FwjSn6bMvt9Zv3IbI_Np2anfV8At0i5Rmn_ifV9CzT8vdJxxXoetASAB21dAmz_lhsf3VFHRwNch9r3sHZ588Piw5l3Ii9kMahih3OUyikLw6ZEVEhKJM9v9nDLLPijhNup3y7Q7hWCu7XqD85pVbKY_rt8RYCMuitzFjB9gFyEBJZdjWcxGP0NoKicQUjh7vM_C5YdfTtq5MLQpD8H8zrtN8u0gWrPPiauAiBMUqQ_');

  // Security tab states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const isValidFirstName = firstName.trim().length > 0;
  const isValidLastName = lastName.trim().length > 0;
  const isValidTitle = title.trim().length > 0;

  const handleSave = () => {
    setFirstNameTouched(true);
    setLastNameTouched(true);
    setTitleTouched(true);
    if (isValidFirstName && isValidLastName && isValidTitle) {
      addToast('Profile settings saved successfully', 'success');
    } else {
      addToast('Please fix the errors before saving', 'error');
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      addToast('Please fill all password fields', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      addToast('New password and confirm password must match', 'error');
      return;
    }
    addToast('Password updated successfully', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const toggle2FA = () => {
    addToast('Two-factor authentication setup link sent to email', 'info');
  };

  return (
    <div className="flex w-full min-h-[calc(100vh-80px)]">
      {/* Sidebar spacer for larger screens to match dashboard layout */}
      <div className="hidden md:block w-64 flex-shrink-0"></div>

      <main className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-10 pb-20 max-w-6xl mx-auto -ml-0 md:-ml-64">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-h1 font-bold text-on-surface mb-2 tracking-tight">User Profile</h1>
          <p className="text-lg text-slate-500">Manage your account details and preferences.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Sidebar */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="glass-card p-8 rounded-[2rem] text-center border border-white/50 relative overflow-hidden bg-white/40">
               <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-400/30 to-purple-400/30"></div>
               <div className="relative z-10 flex flex-col items-center pt-8">
                 <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl mb-4 bg-white group cursor-pointer" onClick={() => setIsImageModalOpen(true)}>
                    <img src={profileImage} alt="Profile Picture" className="w-full h-full object-cover group-hover:opacity-75 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity">
                      <Camera className="text-white drop-shadow-md" size={32} />
                    </div>
                 </div>
                 <h2 className="text-2xl font-bold font-h3 text-slate-800">{firstName} {lastName}</h2>
                 <p className="text-sm text-slate-500 font-medium mb-4">Pro Elite Member</p>
                 <span className="px-3 py-1 bg-primary/10 text-primary uppercase tracking-widest text-[10px] font-bold rounded-full border border-primary/20">
                    Aura Level 4
                 </span>
               </div>
            </div>

            <div className="glass-card p-4 rounded-[2rem] border border-white/50 flex flex-col gap-1 bg-white/40">
               <button 
                 onClick={() => setActiveTab('details')}
                 className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === 'details' ? 'bg-white shadow-sm text-primary font-bold' : 'text-slate-600 hover:bg-white/50'}`}
               >
                 <User size={18} /> Account Details
               </button>
               <button 
                 onClick={() => setActiveTab('security')}
                 className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === 'security' ? 'bg-white shadow-sm text-primary font-bold' : 'text-slate-600 hover:bg-white/50'}`}
               >
                 <Lock size={18} /> Security
               </button>
               <button 
                 onClick={() => setActiveTab('activity')}
                 className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === 'activity' ? 'bg-white shadow-sm text-primary font-bold' : 'text-slate-600 hover:bg-white/50'}`}
               >
                 <History size={18} /> Past Activity
               </button>
               <button 
                 onClick={() => setActiveTab('settings')}
                 className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === 'settings' ? 'bg-white shadow-sm text-primary font-bold' : 'text-slate-600 hover:bg-white/50'}`}
               >
                 <SettingsIcon size={18} /> User Settings
               </button>
               <div className="w-full border-t border-white/40 my-2"></div>
               <button onClick={() => addToast('Successfully signed out.', 'info')} className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm text-red-500 hover:bg-red-50">
                 <LogOut size={18} /> Sign Out
               </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="w-full lg:w-2/3">
             <div className="glass-card p-8 md:p-10 rounded-[2rem] border border-white/50 min-h-[500px] bg-white/40">
                {activeTab === 'details' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-xl font-bold font-h3 mb-6 border-b border-white/40 pb-4">Account Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                         <label htmlFor="firstName" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase ml-1">First Name</label>
                         {isLoading ? <Skeleton className="h-12 w-full rounded-xl" /> : (
                           <>
                             <input 
                               id="firstName"
                               type="text" 
                               value={firstName} 
                               onChange={(e) => setFirstName(e.target.value)}
                               onBlur={() => setFirstNameTouched(true)}
                               className={`w-full bg-white/60 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium text-slate-800 transition-shadow shadow-sm ${firstNameTouched && !isValidFirstName ? 'border-red-400' : 'border-white/50'}`} 
                               aria-invalid={firstNameTouched && !isValidFirstName}
                               aria-describedby={firstNameTouched && !isValidFirstName ? 'firstName-error' : undefined}
                             />
                             {firstNameTouched && !isValidFirstName && (
                                <div id="firstName-error" className="flex items-center gap-1.5 text-red-500 mt-1 ml-1 text-xs font-medium">
                                  <AlertCircle size={14} />
                                  <span>First name is required.</span>
                                </div>
                             )}
                           </>
                         )}
                       </div>
                       <div className="space-y-2">
                         <label htmlFor="lastName" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase ml-1">Last Name</label>
                         {isLoading ? <Skeleton className="h-12 w-full rounded-xl" /> : (
                           <>
                             <input 
                               id="lastName"
                               type="text" 
                               value={lastName}
                               onChange={(e) => setLastName(e.target.value)}
                               onBlur={() => setLastNameTouched(true)}
                               className={`w-full bg-white/60 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium text-slate-800 transition-shadow shadow-sm ${lastNameTouched && !isValidLastName ? 'border-red-400' : 'border-white/50'}`} 
                               aria-invalid={lastNameTouched && !isValidLastName}
                               aria-describedby={lastNameTouched && !isValidLastName ? 'lastName-error' : undefined}
                             />
                             {lastNameTouched && !isValidLastName && (
                                <div id="lastName-error" className="flex items-center gap-1.5 text-red-500 mt-1 ml-1 text-xs font-medium">
                                  <AlertCircle size={14} />
                                  <span>Last name is required.</span>
                                </div>
                             )}
                           </>
                         )}
                       </div>
                       <div className="space-y-2 md:col-span-2">
                         <label htmlFor="emailAddress" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase ml-1">Email Address</label>
                         {isLoading ? <Skeleton className="h-12 w-full rounded-xl" /> : (
                           <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                              <input id="emailAddress" type="email" value="alex.rivera@example.com" disabled aria-disabled="true" className="w-full bg-white/30 text-slate-500 border border-white/50 rounded-xl pl-12 pr-4 py-3 font-medium cursor-not-allowed" />
                           </div>
                         )}
                       </div>
                       <div className="space-y-2 md:col-span-2">
                         <label htmlFor="profTitle" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase ml-1">Professional Title</label>
                         {isLoading ? <Skeleton className="h-12 w-full rounded-xl" /> : (
                           <>
                             <input 
                               id="profTitle"
                               type="text" 
                               value={title} 
                               onChange={(e) => setTitle(e.target.value)}
                               onBlur={() => setTitleTouched(true)}
                               className={`w-full bg-white/60 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium text-slate-800 transition-shadow shadow-sm ${titleTouched && !isValidTitle ? 'border-red-400' : 'border-white/50'}`}
                               aria-invalid={titleTouched && !isValidTitle}
                               aria-describedby={titleTouched && !isValidTitle ? 'title-error' : undefined}
                             />
                             {titleTouched && !isValidTitle && (
                                <div id="title-error" className="flex items-center gap-1.5 text-red-500 mt-1 ml-1 text-xs font-medium">
                                  <AlertCircle size={14} />
                                  <span>Professional title is required.</span>
                                </div>
                             )}
                           </>
                         )}
                       </div>
                    </div>
                    <div className="pt-6">
                      <Tooltip content="Save your updated account details to your profile">
                        <button onClick={handleSave} className="bg-primary text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:scale-95 transition-all w-full md:w-auto glow-button">
                          Save Changes
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                )}

                {activeTab === 'activity' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-xl font-bold font-h3 mb-6 border-b border-white/40 pb-4">Recent Activity</h3>
                    <div className="relative border-l-2 border-white/60 ml-4 space-y-8 mt-4">
                       {[
                         { title: 'Resume Analyzed: Senior_Designer_v3.pdf', time: '2 hours ago', icon: <FileText size={14} className="text-blue-600" /> },
                         { title: 'Applied to "Product Designer" at Meta', time: 'Yesterday', icon: <Briefcase size={14} className="text-purple-600" /> },
                         { title: 'AI Profile Updated via Dashboard', time: 'Oct 24, 2024', icon: <User size={14} className="text-green-600" /> },
                         { title: 'Subscription Upgraded to Pro Elite', time: 'Oct 12, 2024', icon: <Shield size={14} className="text-yellow-600" /> },
                       ].map((item, i) => (
                         <div key={i} className="pl-6 relative">
                            <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                               {item.icon}
                            </div>
                            <p className="font-bold text-slate-800 text-sm">{item.title}</p>
                            <p className="text-xs text-slate-500 mt-1 font-medium">{item.time}</p>
                         </div>
                       ))}
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-xl font-bold font-h3 mb-6 border-b border-white/40 pb-4">Account Security</h3>
                    
                    <div className="space-y-4">
                      <h4 className="flex items-center gap-2 font-bold text-slate-700 text-sm uppercase tracking-widest"><Lock size={16} /> Password</h4>
                      <form onSubmit={handlePasswordChange} className="bg-white/50 p-6 rounded-2xl border border-white/50 shadow-sm space-y-4">
                         <div className="space-y-1">
                           <label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase ml-1" htmlFor="currentPassword">Current Password</label>
                           <input id="currentPassword" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required className="w-full bg-white/60 border border-white/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium shadow-sm transition-shadow" />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase ml-1" htmlFor="newPassword">New Password</label>
                              <input id="newPassword" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="w-full bg-white/60 border border-white/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium shadow-sm transition-shadow" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase ml-1" htmlFor="confirmPassword">Confirm Password</label>
                              <input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full bg-white/60 border border-white/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium shadow-sm transition-shadow" />
                            </div>
                         </div>
                         <div className="pt-2">
                           <button type="submit" className="bg-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">Update Password</button>
                         </div>
                      </form>
                    </div>

                    <div className="space-y-4">
                      <h4 className="flex items-center gap-2 font-bold text-slate-700 text-sm uppercase tracking-widest"><Shield size={16} /> Two-Factor Authentication (2FA)</h4>
                      <div className="bg-white/50 p-6 rounded-2xl border border-white/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
                         <div>
                            <p className="font-bold text-slate-800 text-sm mb-1">Protect your account with 2FA</p>
                            <p className="text-xs text-slate-500 max-w-sm">Add an extra layer of security to your account. We'll send a code to your registered device when you sign in.</p>
                         </div>
                         <button onClick={toggle2FA} className="whitespace-nowrap px-6 py-3 border-2 border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors text-sm">
                            Enable 2FA
                         </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="flex items-center gap-2 font-bold text-slate-700 text-sm uppercase tracking-widest"><History size={16} /> Recent Logins</h4>
                      <div className="bg-white/50 rounded-2xl border border-white/50 overflow-hidden shadow-sm">
                         <div className="divide-y divide-white/40">
                             {[
                               { location: 'San Francisco, CA', device: 'MacBook Pro - Safari', time: 'Active now', status: 'Current session' },
                               { location: 'San Francisco, CA', device: 'iPhone 13 - Chrome', time: 'Yesterday at 4:32 PM', status: 'Success' },
                               { location: 'Unknown Location', device: 'Windows 10 - Edge', time: 'Oct 20, 2024 at 10:15 AM', status: 'Failed attempt', isError: true },
                             ].map((login, idx) => (
                               <div key={idx} className="p-4 flex items-center justify-between text-sm hover:bg-white/20 transition-colors">
                                  <div>
                                     <p className="font-bold text-slate-800">{login.device}</p>
                                     <p className="text-xs text-slate-500 mt-0.5">{login.location} • {login.time}</p>
                                  </div>
                                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${login.isError ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
                                     {login.status}
                                  </div>
                               </div>
                             ))}
                         </div>
                      </div>
                    </div>

                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-xl font-bold font-h3 mb-6 border-b border-white/40 pb-4">User Settings</h3>
                    
                    <div className="space-y-4">
                      <h4 className="flex items-center gap-2 font-bold text-slate-700 text-sm uppercase tracking-widest"><Bell size={16} /> Notifications</h4>
                      <div className="bg-white/50 p-6 rounded-2xl border border-white/50 space-y-6 shadow-sm">
                        
                        <Tooltip content="Enable or disable email notifications for job matches">
                          <div className="flex items-center justify-between group w-full">
                            <div>
                              <label htmlFor="emailAlerts" className="font-bold text-slate-800 text-sm group-hover:text-primary transition-colors cursor-pointer">Email Alerts</label>
                              <p className="text-xs text-slate-500 mt-0.5">Receive job match alerts via email.</p>
                            </div>
                            <div className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                id="emailAlerts" 
                                className="sr-only peer" 
                                checked={settings.emailAlerts}
                                onChange={(e) => updateSettings({ emailAlerts: e.target.checked })} 
                              />
                              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </div>
                          </div>
                        </Tooltip>
                        
                        <div className="w-full border-t border-white/40"></div>
                        
                        <Tooltip content="Enable or disable the weekly summary of your profile performance">
                          <div className="flex items-center justify-between group w-full">
                            <div>
                              <label htmlFor="weeklyDigest" className="font-bold text-slate-800 text-sm group-hover:text-primary transition-colors cursor-pointer">Weekly Digest</label>
                              <p className="text-xs text-slate-500 mt-0.5">A summary of your profile performance.</p>
                            </div>
                            <div className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                id="weeklyDigest" 
                                className="sr-only peer" 
                                checked={settings.weeklyDigest}
                                onChange={(e) => updateSettings({ weeklyDigest: e.target.checked })}
                              />
                              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </div>
                          </div>
                        </Tooltip>

                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="flex items-center gap-2 font-bold text-slate-700 text-sm uppercase tracking-widest"><Shield size={16} /> Privacy</h4>
                      <div className="bg-white/50 p-6 rounded-2xl border border-white/50 shadow-sm">
                        <Tooltip content="Toggle visibility of your Aura profile to recruiters across the platform">
                          <div className="flex items-center justify-between group w-full">
                            <div>
                              <label htmlFor="publicProfile" className="font-bold text-slate-800 text-sm group-hover:text-primary transition-colors cursor-pointer">Public Profile</label>
                              <p className="text-xs text-slate-500 mt-0.5">Allow recruiters to discover your Aura profile.</p>
                            </div>
                            <div className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                id="publicProfile" 
                                className="sr-only peer" 
                                checked={settings.publicProfile}
                                onChange={(e) => updateSettings({ publicProfile: e.target.checked })} 
                              />
                              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </div>
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                )}
             </div>
          </div>
        </div>
      </main>

      {/* Profile Image Cropper Modal */}
      <ProfileImageModal 
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onImageUpdate={(url) => {
          setProfileImage(url);
          setIsImageModalOpen(false);
        }}
      />
    </div>
  );
}

// Minimal icons used only in ProfilePage to avoid prop drilling if possible
function FileText({ className, size }: { className?: string, size?: number }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
}
function Briefcase({ className, size }: { className?: string, size?: number }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
}
