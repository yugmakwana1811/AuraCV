import React, { useState } from 'react';
import { Sparkles, Mail, Lock, ArrowRight, Briefcase, AlertCircle } from 'lucide-react';

export default function AuthPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 8;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);
    if (isEmailValid && isPasswordValid) {
      onNavigate('dashboard');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 mesh-gradient">
      {/* Auth Container */}
      <div className="relative w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 glass-card rounded-[2rem] overflow-hidden shadow-2xl min-h-[600px]">
        
        {/* Left Side: Branding/Visual */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-white/20 relative overflow-hidden">
          <div className="z-10">
            <div className="flex items-center gap-2 mb-10 cursor-pointer" onClick={() => onNavigate('home')}>
              <Sparkles className="text-primary" size={32} />
              <span className="font-h3 text-3xl font-bold text-primary tracking-tighter">AuraCV</span>
            </div>
            <h1 className="font-h2 text-5xl font-bold text-on-surface mb-6 leading-tight">
              Solar-Powered Intelligence for your Career.
            </h1>
            <p className="text-lg text-on-surface-variant max-w-sm leading-relaxed">
              Experience the hyper-modern evolution of resume analysis with our refractive AI technology.
            </p>
          </div>
          <div className="relative z-10 space-y-6">
            <div className="flex gap-4 items-center bg-white/40 p-4 rounded-xl border border-white/50 backdrop-blur-md">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                ✓
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest text-primary uppercase">PRECISION ENGINE</p>
                <p className="text-sm font-medium text-on-surface-variant">99.4% Job Matching Accuracy</p>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400/20 blur-[100px] rounded-full"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-400/20 blur-[100px] rounded-full"></div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="p-8 md:p-16 flex flex-col justify-center bg-white/10 backdrop-blur-3xl">
          <div className="mb-10 text-center md:text-left">
            <h2 className="font-h3 text-4xl font-bold mb-2 text-on-surface">Welcome Back</h2>
            <p className="font-medium text-on-surface-variant">Sign in to your Solar v2.4 workspace</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-bold tracking-widest text-on-surface-variant uppercase ml-1">WORK EMAIL</label>
              <div className={`relative border rounded-xl overflow-hidden bg-white/30 transition-all ${emailTouched && !isEmailValid ? 'border-red-400 focus-within:ring-red-400/20' : 'border-white/50 focus-within:ring-primary/20 focus-within:border-primary'}`}>
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 ${emailTouched && !isEmailValid ? 'text-red-400' : 'text-slate-400'}`} size={20} />
                <input 
                  id="email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  placeholder="name@company.com" 
                  className="w-full pl-12 pr-4 py-4 bg-transparent outline-none font-medium text-on-surface placeholder:text-slate-400"
                  aria-invalid={emailTouched && !isEmailValid}
                  aria-describedby={emailTouched && !isEmailValid ? 'email-error' : undefined}
                />
              </div>
              {emailTouched && !isEmailValid && (
                <div id="email-error" className="flex items-center gap-1.5 text-red-500 mt-1 ml-1 text-xs font-medium">
                  <AlertCircle size={14} />
                  <span>Please enter a valid email address.</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label htmlFor="password" className="text-xs font-bold tracking-widest text-on-surface-variant uppercase">PASSWORD</label>
                <a href="#" className="text-[10px] font-bold tracking-widest text-primary hover:underline uppercase">FORGOT?</a>
              </div>
              <div className={`relative border rounded-xl overflow-hidden bg-white/30 transition-all ${passwordTouched && !isPasswordValid ? 'border-red-400 focus-within:ring-red-400/20' : 'border-white/50 focus-within:ring-primary/20 focus-within:border-primary'}`}>
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 ${passwordTouched && !isPasswordValid ? 'text-red-400' : 'text-slate-400'}`} size={20} />
                <input 
                  id="password"
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setPasswordTouched(true)}
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-4 py-4 bg-transparent outline-none font-medium text-on-surface placeholder:text-slate-400"
                  aria-invalid={passwordTouched && !isPasswordValid}
                  aria-describedby={passwordTouched && !isPasswordValid ? 'password-error' : undefined}
                />
              </div>
              {passwordTouched && !isPasswordValid && (
                <div id="password-error" className="flex items-center gap-1.5 text-red-500 mt-1 ml-1 text-xs font-medium">
                  <AlertCircle size={14} />
                  <span>Password must be at least 8 characters.</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 px-1">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-white/50 text-primary focus:ring-primary/20 bg-white/30" />
              <label htmlFor="remember" className="text-sm font-medium text-on-surface-variant">Keep me authenticated</label>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-primary to-blue-400 text-white font-bold text-lg rounded-xl glow-button flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
            >
              <span>Authenticate</span>
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-10">
            <div className="relative flex items-center mb-8">
              <div className="flex-grow border-t border-white/40"></div>
              <span className="px-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase">OR CONTINUE WITH</span>
              <div className="flex-grow border-t border-white/40"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white/20 rounded-xl hover:bg-white/40 transition-all border border-white/50 font-bold tracking-widest text-xs">
                {/* SVG for Google logo */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                GOOGLE
              </button>
              <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white/20 rounded-xl hover:bg-white/40 transition-all border border-white/50 font-bold tracking-widest text-xs">
                <Briefcase size={16} />
                SSO
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm font-medium text-on-surface-variant">
            New to the solar future? <a href="#" className="text-primary font-bold hover:underline">Create Account</a>
          </p>
        </div>
      </div>
      
      {/* Footer is only necessary on Auth page according to the image, and it's floating */}
      <div className="fixed bottom-8 w-full flex justify-center items-center pointer-events-none">
        <div className="glass-card px-6 py-3 rounded-full flex items-center gap-4 pointer-events-auto">
            <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">© 2024 AURACV AI</span>
            <div className="w-1 h-1 bg-primary/40 rounded-full"></div>
            <a href="#" className="text-[10px] font-bold text-primary hover:text-blue-700 transition-colors uppercase tracking-widest">Privacy</a>
            <div className="w-1 h-1 bg-primary/40 rounded-full"></div>
            <a href="#" className="text-[10px] font-bold text-primary hover:text-blue-700 transition-colors uppercase tracking-widest">Support</a>
        </div>
      </div>
    </div>
  );
}
