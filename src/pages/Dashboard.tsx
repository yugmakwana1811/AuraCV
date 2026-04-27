import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, FileText, Briefcase, BrainCircuit, History, 
  Settings, Bell, CheckCircle2, TrendingUp, Sparkles, Share2, 
  BarChart3, User, Search
} from 'lucide-react';
import { motion } from 'motion/react';
import { Skeleton } from '../components/Skeleton';
import AnimatedSection from '../components/AnimatedSection';
import SmartSuggestions from '../components/SmartSuggestions';

import { useToast } from '../components/ToastProvider';

export default function Dashboard() {
  const [totalScans, setTotalScans] = useState(1284);
  const [activeMatches, setActiveMatches] = useState(42);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const { addToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setTotalScans(prev => prev + Math.floor(Math.random() * 3));
      }
      if (Math.random() > 0.8) {
        setActiveMatches(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      }
    }, 4000);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const handleAISearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate AI search processing delay
    setTimeout(() => {
      setIsSearching(false);
      addToast(`Analyzed query: "${searchQuery}". Found 3 relevant actions.`, 'success');
      setSearchQuery('');
    }, 1500);
  };

  return (
    <div className="flex w-full h-[calc(100vh-80px)] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 flex flex-col pt-8 pb-6 px-4 bg-white/30 border-r border-white/40 sticky top-20 overflow-y-auto hidden md:flex">
         <div className="flex items-center gap-3 px-4 mb-10">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border-2 border-white">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBu_KNLLG2gEi3I-O5NgOkPzzYSGLO65Fi01FwjSn6bMvt9Zv3IbI_Np2anfV8At0i5Rmn_ifV9CzT8vdJxxXoetASAB21dAmz_lhsf3VFHRwNch9r3sHZ588Piw5l3Ii9kMahih3OUyikLw6ZEVEhKJM9v9nDLLPijhNup3y7Q7hWCu7XqD85pVbKY_rt8RYCMuitzFjB9gFyEBJZdjWcxGP0NoKicQUjh7vM_C5YdfTtq5MLQpD8H8zrtN8u0gWrPPiauAiBMUqQ_" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-bold text-primary font-h3 tracking-tight">Aura Intelligence</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Solar v2.4</p>
            </div>
         </div>

         <nav className="flex flex-col gap-2 flex-grow">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/10 text-blue-700 border-r-4 border-blue-500 shadow-[0_0_15px_rgba(0,102,255,0.1)] rounded-xl font-medium transition-all">
                <LayoutDashboard size={20} />
                Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-blue-500 rounded-xl transition-all font-medium hover:translate-x-1">
                <FileText size={20} />
                Resume Scan
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-blue-500 rounded-xl transition-all font-medium hover:translate-x-1">
                <Briefcase size={20} />
                Job Match
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-blue-500 rounded-xl transition-all font-medium hover:translate-x-1">
                <BrainCircuit size={20} />
                AI Insights
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-blue-500 rounded-xl transition-all font-medium hover:translate-x-1">
                <History size={20} />
                History
            </a>
         </nav>

         <div className="p-4 mt-6 rounded-2xl bg-gradient-to-br from-blue-600/10 to-cyan-500/10 border border-white/50 space-y-2 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2 text-primary/20"><Sparkles size={32} /></div>
             <p className="text-xs font-bold text-blue-600 relative z-10">Upgrade to Pro</p>
             <p className="text-[10px] text-slate-500 relative z-10 leading-tight">Get unlimited scans and deep AI insights.</p>
             <button className="w-full py-2 mt-2 bg-white rounded-lg text-[10px] font-bold text-blue-600 shadow-sm hover:shadow-md transition-all relative z-10">Learn More</button>
         </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-10 pb-20">
        <header className="mb-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-h1 font-bold text-primary mb-2 tracking-tight">Welcome back, Alex.</h1>
            <p className="text-lg text-slate-500">Your professional aura is radiating. Let's optimize your career path today.</p>
          </AnimatedSection>

          {/* AI Search Bar */}
          <AnimatedSection delay={0.1}>
            <form onSubmit={handleAISearch} className="relative group w-full md:w-80">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-white/60 border border-white/60 rounded-2xl p-2 flex items-center shadow-sm backdrop-blur-md">
                <Search size={20} className="text-slate-400 ml-2 mr-2 shrink-0" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={isSearching}
                  placeholder="Ask AI: 'Find remote frontend roles...'" 
                  className="bg-transparent border-none outline-none w-full text-slate-700 placeholder-slate-400 text-sm font-medium disabled:opacity-50"
                />
                <button 
                  type="submit" 
                  disabled={isSearching || !searchQuery.trim()}
                  className="bg-primary/10 text-primary p-2 rounded-xl hover:bg-primary/20 transition-colors shrink-0 disabled:opacity-50"
                >
                  {isSearching ? <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" /> : <Sparkles size={16} />}
                </button>
              </div>
            </form>
          </AnimatedSection>
        </header>

        <SmartSuggestions />

        {/* Real-time stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <AnimatedSection delay={0.1}>
              <motion.div whileHover={{ y: -5 }} title="The total number of resumes analyzed across the entire Aura Intelligence network." className="glass-card h-full rounded-2xl p-6 border border-white/50 relative overflow-hidden bg-white/40 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-0 right-0 p-4 text-blue-500/10"><BarChart3 size={48} /></div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Total System Scans</p>
                  {isLoading ? <Skeleton className="w-24 h-10" /> : (
                    <div className="flex items-end gap-3">
                        <h3 className="text-4xl font-bold font-h2 text-blue-600">{totalScans.toLocaleString()}</h3>
                        <span className="text-xs font-bold text-green-500 mb-2 border border-green-200 bg-green-50 px-2 py-0.5 rounded animate-pulse">LIVE</span>
                    </div>
                  )}
              </motion.div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <motion.div whileHover={{ y: -5 }} title="Live job opportunities that perfectly match your currently active CV profile." className="glass-card h-full rounded-2xl p-6 border border-white/50 relative overflow-hidden bg-white/40 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-0 right-0 p-4 text-purple-500/10"><Briefcase size={48} /></div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Active Job Matches</p>
                  {isLoading ? <Skeleton className="w-24 h-10" /> : (
                  <div className="flex items-end gap-3">
                      <h3 className="text-4xl font-bold font-h2 text-purple-600">{activeMatches}</h3>
                       <span className="text-xs font-bold text-green-500 mb-2 border border-green-200 bg-green-50 px-2 py-0.5 rounded animate-pulse">LIVE</span>
                  </div>
                  )}
              </motion.div>
            </AnimatedSection>
             <AnimatedSection delay={0.3}>
              <motion.div whileHover={{ y: -5 }} title="The responsiveness and uptime of the Aura core intelligence API." className="glass-card h-full rounded-2xl p-6 border border-white/50 relative overflow-hidden bg-white/40 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-0 right-0 p-4 text-primary/10"><BrainCircuit size={48} /></div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Network Health</p>
                  {isLoading ? <Skeleton className="w-24 h-10" /> : (
                    <div className="flex items-end gap-3">
                        <h3 className="text-4xl font-bold font-h2 text-primary">Optimal</h3>
                        <span className="text-xs font-medium text-slate-500 mb-2">24ms ping</span>
                    </div>
                  )}
              </motion.div>
            </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* ATS Score Card */}
            <AnimatedSection className="md:col-span-12 xl:col-span-4" delay={0.2}>
              <motion.div whileHover={{ scale: 1.02 }} className="glass-card h-full rounded-[2rem] p-8 relative overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-500 border border-white/50 min-h-[300px]">
                {isLoading ? (
                  <div className="w-full h-full flex flex-col justify-between">
                    <Skeleton className="w-1/2 h-4" />
                    <Skeleton className="w-40 h-40 rounded-full self-center my-4" />
                    <div className="flex gap-4 w-full">
                      <Skeleton className="flex-1 h-12" />
                      <Skeleton className="flex-1 h-12" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="absolute top-4 right-4 text-primary/10 rotate-12"><BarChart3 size={64} /></div>
                    <h3 className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-6">Current ATS Strength</h3>
                    
                    <div className="flex flex-col items-center justify-center flex-grow">
                       <div className="relative w-40 h-40 flex items-center justify-center">
                          {/* SVG Gauge */}
                          <svg className="w-full h-full transform -rotate-90">
                             <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-blue-100" />
                             <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="12" strokeDasharray="440" strokeDashoffset="88" strokeLinecap="round" className="text-primary" />
                          </svg>
                          <div className="absolute flex flex-col items-center justify-center text-center">
                             <span className="text-5xl font-bold font-h2 text-primary leading-none">82</span>
                             <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-1">Optimal</span>
                          </div>
                       </div>
                       
                       <div className="flex gap-4 w-full mt-8">
                           <div className="flex-1 bg-white/40 rounded-2xl p-3 text-center border border-white/50">
                               <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">Impact</p>
                               <p className="text-blue-600 font-bold">High</p>
                           </div>
                           <div className="flex-1 bg-white/40 rounded-2xl p-3 text-center border border-white/50">
                               <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">Clarity</p>
                               <p className="text-pink-600 font-bold">94%</p>
                           </div>
                       </div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatedSection>

            {/* AI Insights Chart (Bar Chart) */}
            <AnimatedSection className="md:col-span-12 xl:col-span-8" delay={0.4}>
              <div className="glass-card w-full rounded-[2rem] p-8 border border-white/50 h-[400px] flex flex-col hover:shadow-xl transition-shadow">
                {isLoading ? (
                  <div className="w-full h-full flex flex-col justify-between pt-4">
                  <div className="flex justify-between w-full">
                     <div>
                       <Skeleton className="w-32 h-3 mb-2" />
                       <Skeleton className="w-48 h-8" />
                     </div>
                     <Skeleton className="w-24 h-6 rounded-full" />
                  </div>
                  <div className="flex gap-2 h-48 items-end mt-8">
                    {[...Array(7)].map((_, i) => (
                      <Skeleton key={i} className="flex-1 rounded-t-lg" style={{ height: `${Math.random() * 60 + 20}%` }} />
                    ))}
                  </div>
                </div>
              ) : (
                <>
                   <div className="flex justify-between items-end mb-8 shrink-0">
                      <div>
                          <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-1">Market Relevance History</p>
                          <h3 className="text-2xl font-bold font-h3 text-primary">Trend Analysis</h3>
                      </div>
                      <div className="flex gap-2">
                         <button className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-widest">Weekly</button>
                         <button className="px-3 py-1 rounded-full bg-white/40 text-slate-400 text-[10px] font-bold uppercase tracking-widest">Monthly</button>
                      </div>
                   </div>

                   <div className="flex-1 flex items-end justify-between gap-4 pt-4">
                      {/* Pseudo Chart Bars */}
                      {[
                          { label: 'MON', h: '40%', color: 'bg-primary/20' },
                          { label: 'TUE', h: '65%', color: 'bg-primary/30' },
                          { label: 'WED', h: '55%', color: 'bg-primary/40' },
                          { label: 'THU', h: '85%', color: 'bg-primary/60' },
                          { label: 'FRI', h: '75%', color: 'bg-primary/80' },
                          { label: 'SAT', h: '95%', color: 'bg-primary', isToday: true },
                          { label: 'SUN', h: '60%', color: 'bg-primary/40' },
                      ].map((bar, i) => (
                          <div key={i} className="flex-1 flex flex-col justify-end items-center h-full group cursor-pointer gap-2">
                               <div className={`w-full rounded-t-lg transition-all duration-300 group-hover:bg-primary/80 ${bar.color}`} style={{ height: bar.h }}></div>
                               <span className={`text-[10px] font-bold tracking-widest ${bar.isToday ? 'text-primary' : 'text-slate-400'}`}>{bar.label}</span>
                          </div>
                      ))}
                   </div>
                </>
              )}
              </div>
            </AnimatedSection>

            {/* Recent Scans */}
            <AnimatedSection className="md:col-span-12 xl:col-span-7" delay={0.2}>
              <div className="glass-card h-full rounded-[2rem] p-8 border border-white/50 min-h-[300px]">
                {isLoading ? (
                  <div className="w-full h-full flex flex-col gap-6">
                  <div className="flex justify-between items-center w-full">
                     <Skeleton className="w-32 h-6" />
                     <Skeleton className="w-16 h-4" />
                  </div>
                  {[...Array(2)].map((_, i) => (
                    <Skeleton key={i} className="w-full h-20 rounded-2xl" />
                  ))}
                </div>
              ) : (
                <>
                   <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold font-h3 text-primary">Recent Scans</h3>
                      <button className="text-blue-600 text-xs font-bold hover:underline tracking-widest uppercase">View All</button>
                   </div>
                   
                   <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-2xl bg-white/40 border border-white/60 hover:border-blue-300 transition-all cursor-pointer shadow-sm hover:shadow-md">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                               <FileText size={24} />
                            </div>
                            <div className="overflow-hidden">
                               <p className="font-bold text-slate-700 truncate">Senior_UIUX_Designer_v2.pdf</p>
                               <p className="text-xs text-slate-500 font-medium truncate">Scanned 2 hours ago • Google Match</p>
                            </div>
                         </div>
                         <span className="shrink-0 px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold tracking-widest uppercase border border-green-200 ml-4">92% Match</span>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-2xl bg-white/40 border border-white/60 hover:border-blue-300 transition-all cursor-pointer shadow-sm hover:shadow-md">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                               <FileText size={24} />
                            </div>
                            <div className="overflow-hidden">
                               <p className="font-bold text-slate-700 truncate">Product_Manager_Resume.docx</p>
                               <p className="text-xs text-slate-500 font-medium truncate">Scanned Yesterday • Meta Match</p>
                            </div>
                         </div>
                         <span className="shrink-0 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-[10px] font-bold tracking-widest uppercase border border-pink-200 ml-4">78% Match</span>
                      </div>
                   </div>
                </>
              )}
              </div>
            </AnimatedSection>

            {/* Quick Actions & Insight */}
            <AnimatedSection className="md:col-span-12 xl:col-span-5 grid grid-cols-2 gap-4" delay={0.3}>
               {/* Tiny Cards */}
               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="glass-card rounded-[2rem] p-6 flex flex-col justify-between border-t-2 border-t-cyan-400 hover:-translate-y-2 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg">
                  <Sparkles size={32} className="text-cyan-500 mb-4" />
                  <div>
                      <p className="font-bold text-slate-700 mb-1">AI Rewrite</p>
                      <p className="text-[10px] text-slate-500">Polished by GPT-4 Solar</p>
                  </div>
               </motion.div>
               
               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="glass-card rounded-[2rem] p-6 flex flex-col justify-between border-t-2 border-t-primary hover:-translate-y-2 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg">
                  <Share2 size={32} className="text-primary mb-4" />
                  <div>
                      <p className="font-bold text-slate-700 mb-1">Smart Share</p>
                      <p className="text-[10px] text-slate-500">One-click apply</p>
                  </div>
               </motion.div>

               {/* Insight Gradient Card */}
               <motion.div whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.98 }} className="col-span-2 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-[2rem] p-6 text-white flex items-center justify-between shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 cursor-pointer relative overflow-hidden group">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 blur-2xl rounded-full transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="relative z-10 w-3/4">
                     <p className="text-xs font-bold opacity-80 uppercase tracking-widest mb-2">Market Insight</p>
                     <p className="text-xl font-bold font-h3 leading-tight">Frontend roles up 12% this week</p>
                  </div>
                  <TrendingUp size={48} className="text-white opacity-40 shrink-0 relative z-10" />
               </motion.div>
            </AnimatedSection>
            
        </div>
      </main>

      {/* Floating Action Button (Mobile/Global) */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,102,255,0.4)] hover:scale-110 active:scale-95 transition-all z-50">
        <span className="text-3xl font-light">+</span>
      </button>

    </div>
  );
}
