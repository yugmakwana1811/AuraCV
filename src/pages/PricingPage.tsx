import { CheckCircle2, XCircle, Download, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import AnimatedSection from '../components/AnimatedSection';

export default function PricingPage() {
  return (
    <main className="px-6 md:px-12 py-16 max-w-7xl mx-auto min-h-[calc(100vh-80px)] overflow-y-auto">
      <AnimatedSection>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-h1 font-bold text-on-surface mb-6 tracking-tight">
            Pricing for the <span className="bg-gradient-to-r from-blue-600 to-fuchsia-500 bg-clip-text text-transparent">Solar Future</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto flex-1">
            Choose the perfect tier to illuminate your career path. AuraCV intelligence adapts to your specific professional needs.
          </p>
        </div>
      </AnimatedSection>

      {/* Subscription Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-5xl mx-auto">
        
        {/* Standard Tier */}
        <AnimatedSection delay={0.1}>
          <div className="glass-card h-full p-8 rounded-[2rem] flex flex-col transition-all duration-500 border border-white/50 hover:shadow-xl">
            <div className="mb-8">
            <span className="bg-slate-200/50 text-slate-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-slate-300/50">Standard</span>
            <h3 className="font-h3 text-3xl font-bold mt-6 mb-2 text-on-surface">Free</h3>
            <p className="text-slate-500 text-sm">Basic resume parsing for curious minds.</p>
          </div>
          <ul className="space-y-5 mb-8 flex-1">
            <li className="flex items-center gap-3 text-slate-700 font-medium">
              <CheckCircle2 className="text-primary" size={20} />
              5 Scans per month
            </li>
            <li className="flex items-center gap-3 text-slate-700 font-medium">
              <CheckCircle2 className="text-primary" size={20} />
              Basic ATS Check
            </li>
            <li className="flex items-center gap-3 text-slate-400 font-medium opacity-60">
              <XCircle size={20} />
              AI Cover Letters
            </li>
          </ul>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-4 mt-auto rounded-xl border-2 border-slate-300/50 font-bold hover:bg-white/70 transition-colors text-slate-700">
            Current Plan
          </motion.button>
        </div>
        </AnimatedSection>

        {/* Pro Elite Tier (Recommended) */}
        <AnimatedSection delay={0.2}>
        <div className="glass-card h-full p-8 rounded-[2rem] flex flex-col transition-all duration-500 border-2 border-primary relative shadow-[0_0_40px_rgba(0,102,255,0.15)] hover:shadow-[0_20px_50px_rgba(0,102,255,0.25)] bg-white/60">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
            Recommended
          </div>
          <div className="mb-8">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-primary/20">Pro Elite</span>
            <div className="flex items-baseline gap-1 mt-6 mb-2">
              <h3 className="font-h3 text-5xl font-bold text-on-surface">$19</h3>
              <span className="text-slate-500 font-medium">/month</span>
            </div>
            <p className="text-slate-600 text-sm font-medium">Advanced AI matching for serious growth.</p>
          </div>
          <ul className="space-y-5 mb-8 flex-1">
            <li className="flex items-center gap-3 text-slate-800 font-bold">
              <CheckCircle2 className="text-primary" size={20} fill="currentColor" stroke="white" />
              Unlimited Scans
            </li>
            <li className="flex items-center gap-3 text-slate-800 font-bold">
              <CheckCircle2 className="text-primary" size={20} fill="currentColor" stroke="white" />
              AI Tailored Cover Letters
            </li>
            <li className="flex items-center gap-3 text-slate-800 font-bold">
              <CheckCircle2 className="text-primary" size={20} fill="currentColor" stroke="white" />
              Real-time Job Matching
            </li>
            <li className="flex items-center gap-3 text-slate-800 font-bold">
              <CheckCircle2 className="text-primary" size={20} fill="currentColor" stroke="white" />
              Portfolio Builder
            </li>
          </ul>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-4 mt-auto rounded-xl bg-primary text-white font-bold shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:bg-blue-700 transition-all">
            Upgrade to Pro
          </motion.button>
        </div>
        </AnimatedSection>

        {/* Team Tier */}
        <AnimatedSection delay={0.3}>
        <div className="glass-card h-full p-8 rounded-[2rem] flex flex-col transition-all duration-500 border border-white/50 hover:shadow-xl">
          <div className="mb-8">
            <span className="bg-slate-200/50 text-slate-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-slate-300/50">Team</span>
            <div className="flex items-baseline gap-1 mt-6 mb-2">
              <h3 className="font-h3 text-5xl font-bold text-on-surface">$49</h3>
              <span className="text-slate-500 font-medium">/month</span>
            </div>
            <p className="text-slate-500 text-sm font-medium">Scalable solutions for agencies.</p>
          </div>
          <ul className="space-y-5 mb-8 flex-1">
            <li className="flex items-center gap-3 text-slate-700 font-medium">
              <CheckCircle2 className="text-primary" size={20} />
              Everything in Pro
            </li>
            <li className="flex items-center gap-3 text-slate-700 font-medium">
              <CheckCircle2 className="text-primary" size={20} />
              10 User Seats
            </li>
            <li className="flex items-center gap-3 text-slate-700 font-medium">
              <CheckCircle2 className="text-primary" size={20} />
              API Access
            </li>
          </ul>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-4 mt-auto rounded-xl border-2 border-slate-300/50 font-bold hover:bg-white/70 transition-colors text-slate-700">
            Contact Sales
          </motion.button>
        </div>
        </AnimatedSection>

      </div>

      {/* Transaction Table */}
      <AnimatedSection delay={0.4}>
        <div className="glass-card rounded-[2rem] overflow-hidden border border-white/40 mb-12 shadow-xl shadow-blue-500/5 max-w-5xl mx-auto">
          <div className="px-8 py-6 border-b border-white/30 flex justify-between items-center bg-white/20">
          <h2 className="font-h3 text-2xl font-bold">Billing History</h2>
          <button className="flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase hover:text-blue-700 transition-colors">
            <Download size={16} />
            Export All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/10 text-slate-500 text-xs font-bold uppercase tracking-widest border-b border-white/20">
                <th className="px-8 py-4">Invoice ID</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Amount</th>
                <th className="px-8 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20">
               {[
                 { id: 'INV-88291', date: 'Oct 12, 2024', status: 'Successful', amount: '$19.00' },
                 { id: 'INV-88274', date: 'Sep 12, 2024', status: 'Successful', amount: '$19.00' },
                 { id: 'INV-88250', date: 'Aug 12, 2024', status: 'Successful', amount: '$19.00' },
               ].map((invoice, i) => (
                 <tr key={i} className="hover:bg-white/30 transition-colors">
                   <td className="px-8 py-6 font-bold text-slate-800">{invoice.id}</td>
                   <td className="px-8 py-6 text-slate-600 font-medium">{invoice.date}</td>
                   <td className="px-8 py-6">
                     <span className="bg-green-100/50 border border-green-200 text-green-700 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                        {invoice.status}
                     </span>
                   </td>
                   <td className="px-8 py-6 font-bold text-slate-800">{invoice.amount}</td>
                   <td className="px-8 py-6 text-right">
                     <button className="text-slate-400 hover:text-primary transition-colors">
                        <FileText size={20} />
                     </button>
                   </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      </div>
      </AnimatedSection>
      
      {/* Footer */}
      <footer className="border-t border-white/20 pt-8 mt-16 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold tracking-widest uppercase text-slate-400">
        <div>
          <span className="text-blue-600 font-black text-lg mr-2 font-h3 normal-case tracking-normal">AuraCV</span> 
          © 2024 Built for the Solar Future.
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Support</a>
        </div>
      </footer>
    </main>
  );
}
