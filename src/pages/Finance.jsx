import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FINANCE_PARTNERS } from '../data/financePartners';
import { 
  Calculator, ShieldCheck, CheckCircle2, DollarSign, Award, ArrowRight, Lock, Building2 
} from 'lucide-react';

export const Finance = () => {
  const { showToast } = useApp();

  // Full Calculator State (in INR Lakhs & Raw Amount)
  const [carPriceInr, setCarPriceInr] = useState(6000000); // ₹60.00 Lakh
  const [downPaymentInr, setDownPaymentInr] = useState(1200000); // ₹12.00 Lakh
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureMonths, setTenureMonths] = useState(60);

  // Eligibility Form State
  const [creditScore, setCreditScore] = useState('CIBIL 750+ (Excellent)');
  const [annualIncome, setAnnualIncome] = useState('₹25 Lakh - ₹50 Lakh');
  const [employmentType, setEmploymentType] = useState('Business Owner / Founder');
  const [eligibilityResult, setEligibilityResult] = useState(null);

  // Math Calculations
  const loanAmount = Math.max(0, carPriceInr - downPaymentInr);
  const monthlyRate = interestRate / 12 / 100;
  const monthlyPayment = Math.round(
    loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths) / (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  ) || 0;

  const totalPayable = Math.round(monthlyPayment * tenureMonths + downPaymentInr);
  const totalInterest = Math.round(monthlyPayment * tenureMonths - loanAmount);
  const principalPercentage = Math.round((loanAmount / totalPayable) * 100) || 0;
  const interestPercentage = 100 - principalPercentage;

  const handleCheckEligibility = (e) => {
    e.preventDefault();
    setEligibilityResult({
      approved: true,
      maxLoan: Math.round(carPriceInr * 1.1),
      estimatedRate: interestRate,
      tier: 'Prime Preferred Borrower'
    });
    showToast('Bank Eligibility Pre-Approval Granted!');
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-16 font-sans">
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-xs font-semibold uppercase tracking-widest">
          <Calculator className="w-4 h-4 text-yellow-400" /> Auto Finance Advisory (Delhi NCR)
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-white">Bespoke Luxury Car Financing & EMI Calculator</h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Access competitive interest rates from 8.5% p.a. through HDFC Bank, ICICI Bank, Axis Bank, and SBI Auto Loans. Instant pre-qualification with zero impact to your CIBIL score.
        </p>
      </div>

      {/* 1. Full Interactive EMI Calculator Widget */}
      <div className="glass-panel rounded-3xl p-6 md:p-10 border border-yellow-500/30 shadow-2xl space-y-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
              <Calculator className="w-6 h-6 text-yellow-400" /> Interactive Monthly EMI Calculator (INR)
            </h2>
            <p className="text-xs text-slate-400">Adjust parameters below to compute your custom payment schedule.</p>
          </div>
          <span className="badge-gold font-mono">Rate Benchmark: 8.5% p.a.</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sliders Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Slider 1: Vehicle Price */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>Vehicle Showroom Price</span>
                <span className="text-yellow-400 font-mono text-base">₹{(carPriceInr / 100000).toFixed(2)} Lakh</span>
              </div>
              <input
                type="range"
                min="2500000"
                max="20000000"
                step="500000"
                value={carPriceInr}
                onChange={(e) => setCarPriceInr(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>₹25 Lakh</span>
                <span>₹2.0 Crore+</span>
              </div>
            </div>

            {/* Slider 2: Down Payment */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>Down Payment (Deposit)</span>
                <span className="text-yellow-400 font-mono text-base">₹{(downPaymentInr / 100000).toFixed(2)} Lakh ({Math.round((downPaymentInr / carPriceInr) * 100)}%)</span>
              </div>
              <input
                type="range"
                min="0"
                max={carPriceInr * 0.5}
                step="100000"
                value={downPaymentInr}
                onChange={(e) => setDownPaymentInr(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>₹0</span>
                <span>50% Max</span>
              </div>
            </div>

            {/* Slider 3: Interest Rate */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>Annual Interest Rate</span>
                <span className="text-yellow-400 font-mono text-base">{interestRate}% p.a.</span>
              </div>
              <input
                type="range"
                min="8.0"
                max="14.0"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
            </div>

            {/* Slider 4: Loan Tenure */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>Loan Term (Tenure)</span>
                <span className="text-yellow-400 font-mono text-base">{tenureMonths} Months ({tenureMonths / 12} Years)</span>
              </div>
              <input
                type="range"
                min="12"
                max="84"
                step="12"
                value={tenureMonths}
                onChange={(e) => setTenureMonths(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
              <div className="grid grid-cols-6 gap-1 pt-1">
                {[12, 24, 36, 48, 60, 84].map(t => (
                  <button
                    key={t}
                    onClick={() => setTenureMonths(t)}
                    className={`py-1 text-[10px] font-mono rounded-lg border transition-all ${
                      tenureMonths === t ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300 font-bold' : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                  >
                    {t}m
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Card (5 Cols) */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-6 border border-yellow-500/40 bg-gradient-to-b from-yellow-500/10 via-[#121622] to-[#0A0C12] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="text-xs text-slate-400 font-mono uppercase text-center">ESTIMATED MONTHLY INSTALLMENT</div>
              <div className="text-center">
                <div className="font-mono text-4xl sm:text-5xl font-extrabold gold-text">₹{monthlyPayment.toLocaleString('en-IN')}</div>
                <div className="text-xs text-slate-400 font-mono mt-1">Per Month for {tenureMonths} Months</div>
              </div>

              {/* Amortization Breakdown Visual Bar */}
              <div className="space-y-1.5 pt-4 border-t border-white/10">
                <div className="flex justify-between text-xs text-slate-300 font-mono">
                  <span>Principal: ₹{loanAmount.toLocaleString('en-IN')}</span>
                  <span>Interest: ₹{totalInterest.toLocaleString('en-IN')}</span>
                </div>
                <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden flex">
                  <div className="bg-yellow-400 h-full" style={{ width: `${principalPercentage}%` }} />
                  <div className="bg-amber-700 h-full" style={{ width: `${interestPercentage}%` }} />
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300 border-t border-white/10 pt-3 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Net Loan Amount:</span>
                  <span className="font-semibold text-white">₹{loanAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Interest Payable:</span>
                  <span className="font-semibold text-yellow-400">₹{totalInterest.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Overall Outlay:</span>
                  <span className="font-semibold text-white">₹{totalPayable.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => showToast('Redirecting to HDFC / ICICI Bank Pre-Approval Application...')}
              className="w-full btn-gold text-xs py-3.5 font-bold uppercase tracking-wider shadow-xl"
            >
              Apply for Bank Pre-Approval
            </button>
          </div>
        </div>
      </div>

      {/* 2. Premier Financial Partners */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest font-semibold">Underwriting Institutions</span>
          <h2 className="font-serif text-3xl font-bold text-white">Institutional Financial Partners</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FINANCE_PARTNERS.map((partner, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 border border-white/10 space-y-4 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 flex items-center justify-center font-serif font-bold text-sm mb-3">
                  <Building2 className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-white mb-1">{partner.name}</h4>
                <div className="text-xs font-mono text-yellow-400 font-semibold mb-2">{partner.rate}</div>
                <p className="text-xs text-slate-400">{partner.perks}</p>
              </div>

              <div className="text-[11px] text-slate-500 border-t border-white/10 pt-2 flex justify-between font-mono">
                <span>Max: {partner.maxTenure}</span>
                <span>Credit: {partner.minCredit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Loan Pre-Eligibility Checker */}
      <div className="glass-panel rounded-3xl p-8 border border-white/10 max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h3 className="font-serif text-2xl font-bold text-white flex items-center justify-center gap-2">
            <ShieldCheck className="w-6 h-6 text-yellow-400" /> Instant Bank Pre-Eligibility Checker
          </h3>
          <p className="text-xs text-slate-400">Soft check with zero CIBIL score impact.</p>
        </div>

        {eligibilityResult ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h4 className="font-serif text-xl font-bold text-white">Pre-Approval Status: Tier-1 Qualified!</h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Based on your credit profile, you qualify for up to <strong className="text-yellow-400 font-mono">₹{(eligibilityResult.maxLoan / 100000).toFixed(2)} Lakh</strong> in luxury vehicle financing at rates starting at <strong className="text-white font-mono">{eligibilityResult.estimatedRate}% p.a.</strong>.
            </p>
            <button
              onClick={() => setEligibilityResult(null)}
              className="btn-secondary text-xs py-2 px-4"
            >
              Re-check Eligibility
            </button>
          </div>
        ) : (
          <form onSubmit={handleCheckEligibility} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Estimated CIBIL Score</label>
                <select
                  value={creditScore}
                  onChange={(e) => setCreditScore(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                >
                  <option value="CIBIL 750+ (Excellent)" className="bg-slate-900">750+ (Prime Superb)</option>
                  <option value="CIBIL 700-749" className="bg-slate-900">700-749 (Good)</option>
                  <option value="CIBIL 650-699" className="bg-slate-900">650-699 (Fair)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Annual Household Income</label>
                <select
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                >
                  <option value="₹25 Lakh - ₹50 Lakh" className="bg-slate-900">₹25L - ₹50L</option>
                  <option value="₹50 Lakh+" className="bg-slate-900">₹50L+</option>
                  <option value="₹15 Lakh - ₹25 Lakh" className="bg-slate-900">₹15L - ₹25L</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Employment Status</label>
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                >
                  <option value="Business Owner / Founder" className="bg-slate-900">Business Owner / Founder</option>
                  <option value="Corporate Executive" className="bg-slate-900">Corporate Executive</option>
                  <option value="Self-Employed Professional" className="bg-slate-900">Self-Employed / CA / Doctor</option>
                </select>
              </div>
            </div>

            <button type="submit" className="w-full btn-gold text-xs py-3 font-bold uppercase tracking-wider">
              Evaluate Instant Pre-Eligibility
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
