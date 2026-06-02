import React, { useState, useEffect } from 'react';

// --- INLINE SVG ICONS FOR OPTIMAL PERFORMANCE AND ZERO DEPENDENCY BUGS ---
const Icons = {
  BookOpen: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
  ),
  Atom: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
  ),
  Activity: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  ),
  ShieldAlert: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
  ),
  Cpu: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z" /></svg>
  ),
  Users: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
  ),
  Zap: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  ),
  Info: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
  Plus: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
  ),
  X: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
  ),
  Link: () => (
    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 002.502-2.502m0 0l.757-1.144" /></svg>
  )
};

// Initial Knowledge Base Articles (Representing historical / core content)
const INITIAL_ARTICLES = [
  {
    id: 1,
    title: "Self-Healing vs. Catastrophic Ceramic Short Circuit Mechanics",
    author: "Dr. Elena Rostova",
    affiliation: "ESA EEE Quality Lead",
    category: "Physics of Failure",
    content: "When heavy-ion strikes pierce Class 2 MLCC ceramic layers, high-density ionization tracks create short-lived conductive paths. Under low-impedance power buses, this triggers localized thermal runaway, fusing the nickel electrodes into a permanent short-circuit. In contrast, when an overvoltage or heavy ion punctures a metallized polymer dielectric (e.g. PET or PP), the localized discharge current density generates intense localized ohmic heating. This heat instantly vaporizes the thin vacuum-deposited aluminum metallization layer (typically 20-50 nm thickness) surrounding the dielectric damage channel. This process isolates the short-circuit site within microseconds, restoring insulation resistance with a trivial local capacitance drop (~10 pF). This graceful 'fail-open' characteristic is critical for catastrophic fault containment on spacecraft power rails.",
    upvotes: 24,
    status: "approved",
    timestamp: "2026-04-12",
    references: "ESA ESCC No. 3006; NASA EEE-INST-002 Guidelines"
  },
  {
    id: 2,
    title: "Thermal Vacuum De-gassing Outgassing Thresholds & Bake-out Dynamics",
    author: "Jean-Pierre Duval",
    affiliation: "CNES Materials Division",
    category: "Material Science",
    content: "The standard polymer film capacitor case consists of a polybutylene terephthalate (PBT) injection-molded box sealed with an anhydride-cured epoxy resin. Under deep thermal vacuum (< 10⁻⁶ Torr), volatile unreacted monomers, moisture, and low-molecular-weight dynamic plasticizers undergo outgassing. If these molecules deposit on cryogenic payload optical lenses or solar cell array covers, the UV radiation in space will photopolymerize them into opaque brown carbonaceous films, destroying operational payloads. Hence, materials must obey ASTM E595 standards limiting Total Mass Loss (TML) < 1.0% and Collected Volatile Condensable Material (CVCM) < 0.1%. Baking-out the naked capacitor core (prior to custom low-outgassing encapsulation in NASA-approved Arathane 5753) for 48 hours at 95°C under high vacuum safely drives off these volatiles before final assembly integration.",
    upvotes: 18,
    status: "approved",
    timestamp: "2026-05-19",
    references: "ASTM E595-15 Test Methodology; ECSS-Q-70-02A"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [theme, setTheme] = useState('dark');
  
  // Custom interactive calculator state variables
  const [iRms, setIRms] = useState(2.5); // RMS Current in Amps
  const [esr, setEsr] = useState(15); // ESR in milliohms
  const [isVacuum, setIsVacuum] = useState(true); // Toggle Vacuum vs Air
  
  // Custom radiation degradation simulator state
  const [tid, setTid] = useState(0); // Cumulative TID in kGy
  const [activeDielectric, setActiveDielectric] = useState('PET'); // PET vs PEN

  // Wiki Knowledge Base state variables
  const [articles, setArticles] = useState(INITIAL_ARTICLES);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newAffiliation, setNewAffiliation] = useState('');
  const [newCategory, setNewCategory] = useState('Material Science');
  const [newContent, setNewContent] = useState('');
  const [newRefs, setNewRefs] = useState('');
  
  // Pending reviews state (starts with one demo submission for interactive feel)
  const [pendingReviews, setPendingReviews] = useState([
    {
      id: 99,
      title: "Huntsman Arathane 5753 Potting Outgassing Verification Under ASTM E595",
      author: "Vikram Sarabhai",
      affiliation: "ISRO EEE QA Specialist",
      category: "Upscreening Playbook",
      content: "Empirical verification of Huntsman Arathane 5753-A/B (LV) polyurethane encapsulation shows excellent thermal shock resilience and outgassing characteristics. Samples cured at 25°C for 7 days followed by a post-cure bake of 2 hours at 80°C achieved a measured TML of 0.32% and CVCM of 0.02%, far below the NASA limits. Void-free casting under 0.5 Torr vacuum is mandatory to prevent coronal micro-discharges on high-voltage spacecraft systems.",
      timestamp: "2026-05-31",
      references: "ASTM E595 Database; ISRO-ISAC-ST-0157"
    }
  ]);

  const [toastMessage, setToastMessage] = useState('');

  // Auto-clear toast helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  // Thermal Calculator math
  // Theta-ja in Air: ~35 K/W. In Vacuum: ~135 K/W (No convection cooling, only conduction & thermal radiation)
  const thetaJa = isVacuum ? 135 : 35;
  const powerLoss = Math.pow(iRms, 2) * (esr / 1000); // P = I^2 * R
  const deltaTemp = powerLoss * thetaJa;
  const targetMaxTemp = 125;
  const isOverheating = (85 + deltaTemp) > targetMaxTemp;

  // Radiation Simulator math based on active material
  const getRadiationMetrics = (dose, type) => {
    if (type === 'PET') {
      // PET undergoes faster scission above 150kGy
      const vbdBaseline = 300; // V/um
      const dfBaseline = 0.0050; // tan delta
      const irBaseline = 2.5; // * 10^10 ohms
      
      let vbdFactor = 1;
      let dfFactor = 1;
      let irFactor = 1;

      if (dose > 0) {
        vbdFactor = Math.max(0.7, 1 - (dose / 5000));
        dfFactor = 1 + (dose / 1000) * 0.3;
        irFactor = Math.max(0.1, 1 - (dose / 2000) * 0.5);
      }

      return {
        vbd: (vbdBaseline * vbdFactor).toFixed(1),
        df: (dfBaseline * dfFactor).toFixed(4),
        ir: (irBaseline * irFactor).toFixed(2),
        scissionRatio: dose > 200 ? "85% Chain Scission / 15% Cross-Linking" : "55% Scission / 45% Cross-Linking",
        state: dose > 1000 ? "Severe Degradation - Avoid Deployment" : dose > 150 ? "Marginal Parametric Shifts" : "Optimal Structural State"
      };
    } else {
      // PEN (Polyethylene Naphthalate) is highly radiation resilient due to Naphthalene double-rings
      const vbdBaseline = 350;
      const dfBaseline = 0.0040;
      const irBaseline = 3.0;

      let vbdFactor = 1;
      let dfFactor = 1;
      let irFactor = 1;

      if (dose > 0) {
        vbdFactor = Math.max(0.85, 1 - (dose / 15000));
        dfFactor = 1 + (dose / 5000) * 0.15;
        irFactor = Math.max(0.5, 1 - (dose / 10000) * 0.3);
      }

      return {
        vbd: (vbdBaseline * vbdFactor).toFixed(1),
        df: (dfBaseline * dfFactor).toFixed(4),
        ir: (irBaseline * irFactor).toFixed(2),
        scissionRatio: dose > 1000 ? "40% Chain Scission / 60% Cross-Linking (Resilient)" : "20% Scission / 80% Cross-Linking",
        state: dose > 3000 ? "Moderate Shift - Robust Overall" : "Highly Stable Performance"
      };
    }
  };

  const radMetrics = getRadiationMetrics(tid, activeDielectric);

  // Wiki functions
  const handleAddContribution = (e) => {
    e.preventDefault();
    if (!newTitle || !newAuthor || !newContent) {
      showToast("Error: Title, Author, and Research Content are required fields.");
      return;
    }

    const submission = {
      id: Date.now(),
      title: newTitle,
      author: newAuthor,
      affiliation: newAffiliation || "Independent Researcher",
      category: newCategory,
      content: newContent,
      timestamp: new Date().toISOString().split('T')[0],
      references: newRefs || "Self-Empirical Study / Datasheet Verification"
    };

    setPendingReviews([...pendingReviews, submission]);
    showToast("Insight submitted to Peer-Review Queue successfully!");
    
    // Reset fields
    setNewTitle('');
    setNewAuthor('');
    setNewAffiliation('');
    setNewContent('');
    setNewRefs('');
  };

  const approveArticle = (id) => {
    const articleToPublish = pendingReviews.find(item => item.id === id);
    if (articleToPublish) {
      const published = {
        ...articleToPublish,
        upvotes: 1,
        status: "approved"
      };
      setArticles([published, ...articles]);
      setPendingReviews(pendingReviews.filter(item => item.id !== id));
      showToast(`Approved & published: "${published.title}"`);
    }
  };

  const rejectArticle = (id) => {
    setPendingReviews(pendingReviews.filter(item => item.id !== id));
    showToast("Contribution removed from the review queue.");
  };

  const handleUpvote = (id) => {
    setArticles(articles.map(art => art.id === id ? { ...art, upvotes: art.upvotes + 1 } : art));
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-200 font-sans`}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-indigo-600 text-white px-5 py-3 rounded-lg shadow-xl border border-indigo-400 flex items-center gap-3 animate-bounce">
          <Icons.Check />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Icons.Zap className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                Space Capacitors Knowledge Base
              </h1>
              <p className="text-xs text-slate-400">
                Hybrid Space-Qualification Aerospace Wiki & Materials Physics Lab
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
              title="Toggle Theme"
            >
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
            <span className="text-xs px-2 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full font-mono">
              EEE-QA-AEROSPACE
            </span>
          </div>
        </div>
      </header>

      {/* Hero Quick Overview Block */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-10 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <span className="bg-indigo-900/60 text-indigo-300 border border-indigo-700/50 text-xs uppercase px-2.5 py-1 rounded-md font-bold tracking-wider">
                Senior Engineering Briefing
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-100">
                Are Polymer Film Capacitors Viable for Spaceflight?
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Traditional ceramic MLCCs provide high volumetric density but risk permanent low-impedance short-circuits under heavy-ion hits or thermal stresses, causing critical bus-level failure. Metallized polymer film capacitors provide the perfect open-circuit self-healing safeguard. Explore the material physics, radiation thresholds, and TDK automotive upscreening steps to achieve full spaceflight compliance.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href="#matrix" onClick={() => setActiveTab('matrix')} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-xs font-bold text-white transition">
                  Explore Material Physics Matrix
                </a>
                <a href="#calculator" onClick={() => setActiveTab('calculators')} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-md text-xs font-bold text-slate-300 transition">
                  Launch Simulators & Calculators
                </a>
              </div>
            </div>
            
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-xl space-y-3">
              <h3 className="text-sm font-semibold tracking-wider text-indigo-400 uppercase">
                Core QA Specifications Built-In
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                  <span>NASA EEE-INST-002 Level 1 &amp; Level 2</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                  <span>ESA ECSS-Q-ST-60C (Class 1/2/3)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                  <span>ISRO ISRO-ISAC-ST-0157 Standards</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                  <span>ASTM E595 Outgassing Requirements</span>
                </li>
              </ul>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                <span>SYSTEM ENVIRONMENT: VACUUM</span>
                <span>STATUS: OPERATIONAL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container Layout */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 overflow-x-auto pb-px gap-2 mb-8">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-semibold whitespace-nowrap transition-all ${activeTab === 'overview' ? 'border-indigo-500 text-indigo-500 bg-slate-900/10' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <Icons.BookOpen />
            Overview & Standards
          </button>
          <button 
            onClick={() => setActiveTab('matrix')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-semibold whitespace-nowrap transition-all ${activeTab === 'matrix' ? 'border-indigo-500 text-indigo-500 bg-slate-900/10' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <Icons.Atom />
            Dielectrics & Material Matrix
          </button>
          <button 
            onClick={() => setActiveTab('calculators')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-semibold whitespace-nowrap transition-all ${activeTab === 'calculators' ? 'border-indigo-500 text-indigo-500 bg-slate-900/10' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <Icons.Activity />
            Interactive Physics Labs
          </button>
          <button 
            onClick={() => setActiveTab('playbook')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-semibold whitespace-nowrap transition-all ${activeTab === 'playbook' ? 'border-indigo-500 text-indigo-500 bg-slate-900/10' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <Icons.Cpu />
            COTS/TDK Upscreening Playbook
          </button>
          <button 
            onClick={() => setActiveTab('wiki')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-semibold whitespace-nowrap transition-all ${activeTab === 'wiki' ? 'border-indigo-500 text-indigo-500 bg-slate-900/10' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            <Icons.Users />
            Wiki & Collaborative Submissions
            {pendingReviews.length > 0 && (
              <span className="ml-1.5 px-2 py-0.5 text-xs font-bold rounded-full bg-amber-500 text-slate-950">
                {pendingReviews.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab Contents */}
        
        {/* Tab 1: Overview & Standards */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Standard Specifications Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-2 py-1 bg-red-950 text-red-400 border border-red-800 text-[10px] font-mono rounded">
                    USA STANDARD
                  </span>
                  <span className="text-xs text-slate-400 font-mono">NASA</span>
                </div>
                <h4 className="text-base font-bold text-slate-100 mb-2">NASA EEE-INST-002</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Governs electrical, electronic, and electromechanical part selection, upscreening, and rigorous component qualification levels.
                </p>
                <div className="bg-slate-950 p-3 rounded text-[10px] font-mono text-slate-400 space-y-1">
                  <div>• Level 1: Extreme reliability (5+ yr missions)</div>
                  <div>• Level 2: Baseline spaceflight (1-5 yr missions)</div>
                  <div>• Level 3: Short duration / CubeSats</div>
                </div>
              </div>

              <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-2 py-1 bg-blue-950 text-blue-400 border border-blue-800 text-[10px] font-mono rounded">
                    EUROPEAN STANDARD
                  </span>
                  <span className="text-xs text-slate-400 font-mono">ESA / ESCC</span>
                </div>
                <h4 className="text-base font-bold text-slate-100 mb-2">ESA ECSS-Q-ST-60C</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Establishes requirements for Class 1, Class 2, and Class 3 components, specifically targeting the European space subsystem architectures.
                </p>
                <div className="bg-slate-950 p-3 rounded text-[10px] font-mono text-slate-400 space-y-1">
                  <div>• Class 1: Zero tolerance for critical mission failures</div>
                  <div>• ESCC No. 3006: Self-healing metallized films</div>
                  <div>• Chart II, III, &amp; IV sequence criteria</div>
                </div>
              </div>

              <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-2 py-1 bg-amber-950 text-amber-400 border border-amber-800 text-[10px] font-mono rounded">
                    ISRO STANDARD
                  </span>
                  <span className="text-xs text-slate-400 font-mono">ISRO</span>
                </div>
                <h4 className="text-base font-bold text-slate-100 mb-2">ISRO-ISAC-ST-0157</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Indian Space Research Organisation's specification guidelines targeting robust, homogeneous component selection for national payloads.
                </p>
                <div className="bg-slate-950 p-3 rounded text-[10px] font-mono text-slate-400 space-y-1">
                  <div>• Level 'S' reliability threshold requirement</div>
                  <div>• PID alignment &amp; audit trails</div>
                  <div>• Single Lot Date Code (SLDC) certification</div>
                </div>
              </div>

            </div>

            {/* Outgassing Limits & The Physics Behind Them */}
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/20">
              <h3 className="text-lg font-bold text-slate-100 mb-3 flex items-center gap-2">
                <Icons.ShieldAlert className="text-indigo-400" />
                ASTM E595 / ECSS-Q-70-02 Vacuum Outgassing Limits
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                In a vacuum chamber under 10<sup>-6</sup> Torr at 125°C for 24 hours, non-metallic polymers undergo outgassing. The gaseous byproducts can condense directly onto cool spacecraft lenses, payloads, and thermal control skins, causing critical degradation.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block mb-1">LIMIT 1: Total Mass Loss (TML)</span>
                    <span className="text-2xl font-black text-amber-500 font-mono">&lt; 1.0%</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Ensures structural integrity is maintained; the polymer does not release critical structural constituents into the void.
                  </p>
                </div>
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block mb-1">LIMIT 2: Collected Volatile Condensable Material (CVCM)</span>
                    <span className="text-2xl font-black text-emerald-500 font-mono">&lt; 0.10%</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Guarantees volatile compounds do not deposit onto nearby optical structures or damage solar arrays.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Concept Block: Failure Modes Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <div className="bg-red-950/20 border border-red-900/30 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-900/50 p-2 rounded text-red-400">
                    <Icons.X className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-red-200">The Ceramic MLCC Risk: Short-Circuit Fusion</h4>
                </div>
                <p className="text-xs text-red-100/80 leading-relaxed mb-4">
                  Class 2 multi-layer ceramic capacitors rely on crystalline structures (BaTiO₃) that are vulnerable to heavy-ion and mechanical stress fracturing. If a crack or single-event effect occurs, a highly conductive micro-channel forms. Under high-current power buses, the circuit fuses into a permanent short-circuit, bringing down the entire bus.
                </p>
                <div className="bg-slate-950/80 p-3 rounded border border-red-900/20 text-xs font-mono text-red-300">
                  <span className="text-red-400 font-bold">CRITICAL FAILURE MODE:</span> Fused Short (Low Impedance Fault)
                </div>
              </div>

              <div className="bg-emerald-950/20 border border-emerald-900/30 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-emerald-900/50 p-2 rounded text-emerald-400">
                    <Icons.Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-200">The Polymer Film Solution: Self-Healing Open-Circuit</h4>
                </div>
                <p className="text-xs text-emerald-100/80 leading-relaxed mb-4">
                  When a localized discharge pierces a metallized polymer film, the localized arc generates immense thermal energy. This instantly vaporizes the nano-scale aluminum metallization surrounding the defect. The short-circuit is isolated inside microseconds, converting the failure mode into a safe open-circuit.
                </p>
                <div className="bg-slate-950/80 p-3 rounded border border-emerald-900/20 text-xs font-mono text-emerald-300">
                  <span className="text-emerald-400 font-bold">SAFE FAILURE MODE:</span> Open Circuit (Isolated Fault)
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Dielectrics & Material Matrix */}
        {activeTab === 'matrix' && (
          <div className="space-y-6 animate-fadeIn" id="matrix">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
              <div>
                <h3 className="text-lg font-bold text-slate-100">Dielectric Material Comparison Matrix</h3>
                <p className="text-xs text-slate-400">Comparative technical evaluation mapping fundamental material physics and parameters</p>
              </div>
              <span className="text-xs px-2.5 py-1 bg-slate-800 rounded-md text-slate-300 border border-slate-700">
                Data Range: 10 kHz to 10 GHz
              </span>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-900/30">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-slate-300 font-mono">
                    <th className="p-4 font-bold">Property / Dielectric</th>
                    <th className="p-4 text-indigo-400 font-bold">MKP / PP (Polypropylene)</th>
                    <th className="p-4 text-emerald-400 font-bold">MKT / PET (Polyester)</th>
                    <th className="p-4 text-amber-400 font-bold">PEN (Polyethylene Naphthalate)</th>
                    <th className="p-4 text-rose-400 font-bold">MLCC Class 1 (NP0)</th>
                    <th className="p-4 text-slate-400 font-bold">MLCC Class 2 (X7R)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  <tr>
                    <td className="p-4 font-bold font-mono text-slate-300">Dielectric Constant (ε_r)</td>
                    <td className="p-4">2.2 (Low dipole orientation)</td>
                    <td className="p-4">3.2 (Highly polar)</td>
                    <td className="p-4">3.0 (Rigid molecular structure)</td>
                    <td className="p-4">15 – 100 (Paraelectric)</td>
                    <td className="p-4">1,000 – 10,000 (Ferroelectric)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold font-mono text-slate-300">tan δ @ 10 kHz</td>
                    <td className="p-4 text-emerald-400 font-mono">0.0005</td>
                    <td className="p-4 text-amber-500 font-mono">0.0080</td>
                    <td className="p-4 text-amber-500 font-mono">0.0060</td>
                    <td className="p-4 text-emerald-400 font-mono">&lt; 0.0010</td>
                    <td className="p-4 text-red-400 font-mono font-bold">0.0250</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold font-mono text-slate-300">tan δ @ 100 kHz</td>
                    <td className="p-4 text-emerald-400 font-mono">0.0008</td>
                    <td className="p-4 text-amber-500 font-mono">0.0150</td>
                    <td className="p-4 text-amber-500 font-mono">0.0100</td>
                    <td className="p-4 text-emerald-400 font-mono">&lt; 0.0015</td>
                    <td className="p-4 text-red-400 font-mono font-bold">0.0350</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold font-mono text-slate-300">tan δ @ 1 MHz</td>
                    <td className="p-4 text-emerald-400 font-mono">0.0012</td>
                    <td className="p-4 text-red-400 font-mono font-bold">0.0350</td>
                    <td className="p-4 text-amber-500 font-mono">0.0220</td>
                    <td className="p-4 text-emerald-400 font-mono">&lt; 0.0020</td>
                    <td className="p-4 text-red-400 font-mono font-bold">0.0500</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold font-mono text-slate-300">tan δ @ 10 GHz</td>
                    <td className="p-4 text-amber-500 font-mono">&gt; 0.0500</td>
                    <td className="p-4 text-red-500 font-mono font-bold">&gt; 0.1500</td>
                    <td className="p-4 text-amber-500 font-mono">&gt; 0.1100</td>
                    <td className="p-4 text-emerald-400 font-mono">&lt; 0.0050</td>
                    <td className="p-4 text-red-500 font-mono font-bold">&gt; 0.1200</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold font-mono text-slate-300">Volumetric Efficiency</td>
                    <td className="p-4 text-red-400">Low (~0.5 µF/cm³)</td>
                    <td className="p-4 text-yellow-400">Medium (~1.5 µF/cm³)</td>
                    <td className="p-4 text-yellow-400">Medium-High (~2.0 µF/cm³)</td>
                    <td className="p-4 text-red-400">Very Low (~0.1 µF/cm³)</td>
                    <td className="p-4 text-emerald-400 font-bold">Extreme (~10.0 µF/cm³)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold font-mono text-slate-300">Max Temp (°C)</td>
                    <td className="p-4 text-red-400 font-bold">105°C (Derates to 125°C)</td>
                    <td className="p-4 text-emerald-400">125°C</td>
                    <td className="p-4 text-emerald-400 font-bold">125°C / 150°C (High T_g)</td>
                    <td className="p-4 text-emerald-400">125°C / 150°C</td>
                    <td className="p-4 text-emerald-400">125°C / 150°C</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold font-mono text-slate-300">Self-Healing Capability</td>
                    <td className="p-4 text-emerald-400 font-bold">Exceptional</td>
                    <td className="p-4 text-emerald-400">Good</td>
                    <td className="p-4 text-yellow-400">Moderate</td>
                    <td className="p-4 text-red-400">None</td>
                    <td className="p-4 text-red-400">None</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold font-mono text-slate-300">DC Bias Aging Effects</td>
                    <td className="p-4 text-emerald-400">Zero</td>
                    <td className="p-4 text-emerald-400">Zero</td>
                    <td className="p-4 text-emerald-400">Zero</td>
                    <td className="p-4 text-emerald-400">Zero</td>
                    <td className="p-4 text-red-500 font-bold">Severe (Up to 80% loss)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Physics Explainer Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="p-5 rounded-lg border border-slate-800 bg-slate-900/10 space-y-2">
                <h4 className="font-bold text-sm text-indigo-400">Polypropylene (MKP) Deep Dive</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  PP consists of non-polar molecular structures. Lacking highly polar functional groups on its aliphatic carbon chain, it exhibits extremely low dipole orientation losses. This results in an exceptionally low dissipation factor (tan δ ≈ 0.0005 at 10 kHz), which remains stable through several megahertz. However, its lower dielectric constant limits its maximum volumetric efficiency. PP's primary failure mode is thermal scission due to its relatively low melting point (≈ 165°C).
                </p>
              </div>

              <div className="p-5 rounded-lg border border-slate-800 bg-slate-900/10 space-y-2">
                <h4 className="font-bold text-sm text-emerald-400">Polyester (MKT) Deep Dive</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  PET is a highly polar polymer featuring ester linkages and an aromatic ring in its backbone. These polar ester groups increase the dielectric constant, allowing for higher volumetric efficiency than PP. However, under an alternating electric field, these groups attempt to align with the field. At frequencies exceeding 100 kHz, the dipole rotation lag increases, causing the dissipation factor (tan δ) to rise rapidly, contributing to internal self-heating.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Interactive Physics Labs */}
        {activeTab === 'calculators' && (
          <div className="space-y-10 animate-fadeIn" id="calculator">
            
            {/* Lab 1: Thermal Loss Calculator */}
            <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
              <div className="border-b border-slate-800 pb-4 mb-6">
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Icons.Zap className="text-amber-400" />
                  Thermal Equilibrium Calculator (Vacuum vs. Air)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Model localized thermal rise (ΔT) of film capacitors operating under high ripple currents without convective cooling.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Inputs */}
                <div className="space-y-6 bg-slate-950 p-5 rounded-lg border border-slate-800">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Simulation Inputs</h4>
                  
                  <div>
                    <div className="flex justify-between mb-1.5 text-xs text-slate-300">
                      <span>RMS Ripple Current (I_rms)</span>
                      <span className="font-mono text-indigo-400 font-bold">{iRms} A</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.1" 
                      max="10.0" 
                      step="0.1" 
                      value={iRms}
                      onChange={(e) => setIRms(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500 bg-slate-800"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5 text-xs text-slate-300">
                      <span>Equivalent Series Resistance (R_ESR)</span>
                      <span className="font-mono text-indigo-400 font-bold">{esr} mΩ</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      step="1" 
                      value={esr}
                      onChange={(e) => setEsr(parseInt(e.target.value))}
                      className="w-full accent-indigo-500 bg-slate-800"
                    />
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <label className="text-xs text-slate-400 block mb-2">Spacecraft Environment Toggle</label>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setIsVacuum(true)}
                        className={`flex-1 py-2 text-xs font-bold rounded transition ${isVacuum ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                      >
                        Ultra-High Vacuum
                      </button>
                      <button 
                        onClick={() => setIsVacuum(false)}
                        className={`flex-1 py-2 text-xs font-bold rounded transition ${!isVacuum ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                      >
                        1 Atm Air (Ground Test)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Outputs & Modeling visualization */}
                <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div className="bg-slate-950/60 p-5 rounded-lg border border-slate-800/80">
                      <span className="text-[10px] text-slate-400 font-mono block">Calculated Power Dissipation (P_loss)</span>
                      <span className="text-2xl font-black text-slate-200 font-mono">{powerLoss.toFixed(4)} W</span>
                      <div className="text-[10px] text-slate-500 mt-1 font-mono">P = I² * ESR</div>
                    </div>

                    <div className="bg-slate-950/60 p-5 rounded-lg border border-slate-800/80">
                      <span className="text-[10px] text-slate-400 font-mono block">Thermal Resistance (θ_ja)</span>
                      <span className="text-2xl font-black text-slate-200 font-mono">{thetaJa} K/W</span>
                      <span className="text-[10px] text-slate-400 block mt-1">
                        {isVacuum ? "❌ No Convection (Vacuum)" : "✅ Active Air Convection"}
                      </span>
                    </div>

                  </div>

                  {/* Temperature Rise Visualizer gauge */}
                  <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-300">Internal Core Temp (Assuming 85°C Amb.)</span>
                      <span className="text-sm font-bold font-mono text-amber-400">
                        {(85 + deltaTemp).toFixed(1)}°C
                      </span>
                    </div>
                    
                    {/* Temperature Range Bar */}
                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden relative mb-2">
                      <div 
                        className={`h-full transition-all duration-300 ${isOverheating ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} 
                        style={{ width: `${Math.min(100, ((85 + deltaTemp) / 150) * 100)}%` }}
                      />
                      <div className="absolute right-1/6 top-0 bottom-0 w-0.5 bg-red-600" title="Max Temp Limit" />
                    </div>

                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>0°C</span>
                      <span>85°C (Amb)</span>
                      <span className="text-red-400">125°C Limit</span>
                      <span>150°C Max</span>
                    </div>

                    {isOverheating ? (
                      <div className="mt-4 p-3 bg-red-950/40 border border-red-900/60 rounded text-red-400 text-xs flex gap-2 items-start">
                        <Icons.ShieldAlert className="shrink-0 mt-0.5" />
                        <div>
                          <strong className="block">THERMAL DEGRADATION DETECTED:</strong>
                          Vacuum conditions prevent convective thermal cooling. The capacitor will undergo rapid thermal scission. Decrease current or select a lower ESR component immediately.
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 p-3 bg-emerald-950/40 border border-emerald-900/60 rounded text-emerald-400 text-xs flex gap-2 items-start">
                        <Icons.Check className="shrink-0 mt-0.5" />
                        <div>
                          <strong>THERMAL EQUILIBRIUM SAFE:</strong> Core temperature is well below the 125°C material stability ceiling. Suitable for prolonged spaceflight deployment under this profile.
                        </div>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            </div>

            {/* Lab 2: Radiation Degradation Simulator */}
            <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
              <div className="border-b border-slate-800 pb-4 mb-6">
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Icons.Atom className="text-indigo-400" />
                  Ionizing Radiation (TID) Degradation Simulator
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Simulate Total Ionizing Dose (TID) degradation of film capacitors exposed to galactic cosmic rays (GCR) and solar particles.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Inputs panel */}
                <div className="space-y-6 bg-slate-950 p-5 rounded-lg border border-slate-800">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Simulator Inputs</h4>
                  
                  <div>
                    <label className="text-xs text-slate-300 block mb-2 font-medium">Select Dielectric Material</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => { setActiveDielectric('PET'); setTid(0); }}
                        className={`py-2 text-xs font-bold rounded transition ${activeDielectric === 'PET' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                      >
                        PET (Polyester)
                      </button>
                      <button 
                        onClick={() => { setActiveDielectric('PEN'); setTid(0); }}
                        className={`py-2 text-xs font-bold rounded transition ${activeDielectric === 'PEN' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                      >
                        PEN (Naphthalate)
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5 text-xs text-slate-300">
                      <span>Total Ionizing Dose (TID)</span>
                      <span className="font-mono text-indigo-400 font-bold">{tid} kGy</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max={activeDielectric === 'PET' ? "2000" : "15000"} 
                      step="50" 
                      value={tid}
                      onChange={(e) => setTid(parseInt(e.target.value))}
                      className="w-full accent-indigo-500 bg-slate-800"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>0 kGy (Control)</span>
                      <span>Max Mission Limit</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                    <span className="text-indigo-400 font-semibold block mb-1">Theoretical Context:</span>
                    Aromatic polymers contain benzene or naphthalene rings that absorb energy into delocalized pi-electron systems, preventing chemical scission. PEN is ~5x more radiation resilient than PET.
                  </div>
                </div>

                {/* Outputs Panel */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Parameter Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    
                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block mb-1">Breakdown Voltage (V_bd)</span>
                      <span className="text-xl font-bold font-mono text-slate-200">{radMetrics.vbd} V/μm</span>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 transition-all duration-300"
                          style={{ width: `${(parseFloat(radMetrics.vbd) / 350) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block mb-1">Dissipation Factor (tan δ)</span>
                      <span className="text-xl font-bold font-mono text-amber-500">{radMetrics.df}</span>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                        <div 
                          className="h-full bg-amber-500 transition-all duration-300"
                          style={{ width: `${Math.min(100, (parseFloat(radMetrics.df) / 0.02) * 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block mb-1">Insulation Resistance (R_ins)</span>
                      <span className="text-xl font-bold font-mono text-emerald-400">{radMetrics.ir} x10¹⁰ Ω</span>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 transition-all duration-300"
                          style={{ width: `${(parseFloat(radMetrics.ir) / 3.0) * 100}%` }}
                        />
                      </div>
                    </div>

                  </div>

                  {/* Chemical kinetics summary */}
                  <div className="p-5 bg-slate-950 rounded-lg border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Degradation Profile:</span>
                      <span className="font-mono text-indigo-400 font-bold uppercase">{radMetrics.state}</span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Chemical Bond Kinetics:</span>
                      <span className="font-mono text-slate-300">{radMetrics.scissionRatio}</span>
                    </div>

                    <div className="pt-3 border-t border-slate-800/60 text-xs text-slate-400 leading-relaxed">
                      {tid === 0 ? (
                        <span>✨ Material is in pristine ground-state control. No radiation traps or molecular scissions present.</span>
                      ) : activeDielectric === 'PET' && tid > 200 ? (
                        <span className="text-amber-400">⚠️ Under {tid} kGy of radiation, polyester ester bonds are splitting into carboxyl radicals, creating trap states inside the bandgap. This increases electrical leakage.</span>
                      ) : (
                        <span className="text-emerald-400">✔️ Polymer remains robust. The naphthalene aromatic structures actively dissipate energy through pi-orbital electron resonance, preventing significant molecular fragmentation.</span>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        )}

        {/* Tab 4: COTS/TDK Upscreening Playbook */}
        {activeTab === 'playbook' && (
          <div className="space-y-8 animate-fadeIn" id="playbook">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-slate-100">The "Minimal Modification" COTS/TDK Upscreening Playbook</h3>
              <p className="text-xs text-slate-400 mt-1">
                How spacecraft integrators upscreen AEC-Q200 automotive-grade film components (TDK EPCOS B32529 or B3271x series) for spaceflight.
              </p>
            </div>

            {/* Graphic Map */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              <div className="bg-slate-900/40 p-5 rounded-lg border border-slate-800 relative">
                <span className="absolute top-3 right-3 text-2xl font-black text-slate-800">01</span>
                <span className="text-[10px] text-indigo-400 font-mono block mb-1">DE-BOXING</span>
                <h4 className="font-bold text-sm text-slate-200 mb-2">Automated Extraction</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Carefully mill away the standard PBT commercial plastic box and outgassing epoxy surrounding the capacitor, exposing the raw wound film core.
                </p>
              </div>

              <div className="bg-slate-900/40 p-5 rounded-lg border border-slate-800 relative">
                <span className="absolute top-3 right-3 text-2xl font-black text-slate-800">02</span>
                <span className="text-[10px] text-indigo-400 font-mono block mb-1">THERMAL TREATMENT</span>
                <h4 className="font-bold text-sm text-slate-200 mb-2">Vacuum Bake-out</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Bake the naked cores at 85°C – 100°C under 10<sup>-6</sup> Torr for 48 hours to fully release unreacted monomers, plasticizers, and moisture.
                </p>
              </div>

              <div className="bg-slate-900/40 p-5 rounded-lg border border-slate-800 relative">
                <span className="absolute top-3 right-3 text-2xl font-black text-slate-800">03</span>
                <span className="text-[10px] text-indigo-400 font-mono block mb-1">ENCAPSULATION</span>
                <h4 className="font-bold text-sm text-slate-200 mb-2">NASA-Grade Potting</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Repot inside a non-magnetic metal container with low-outgassing polyurethane (Arathane 5753-A/B LV), achieving outgassing compliance.
                </p>
              </div>

              <div className="bg-slate-900/40 p-5 rounded-lg border border-slate-800 relative">
                <span className="absolute top-3 right-3 text-2xl font-black text-slate-800">04</span>
                <span className="text-[10px] text-indigo-400 font-mono block mb-1">WHISKER SAFEGUARD</span>
                <h4 className="font-bold text-sm text-slate-200 mb-2">Robotic Lead Tinning</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Replace pure matte tin finishes completely with eutectic Sn63/Pb37 leaded alloy using automated dip-soldering to eliminate tin-whisker risks.
                </p>
              </div>

            </div>

            {/* Technical Detail Table */}
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/20">
              <h3 className="text-base font-bold text-slate-200 mb-4 flex items-center gap-2">
                <Icons.ShieldAlert className="text-red-400" />
                Playbook Quality Hazards &amp; Risk Mitigation
              </h3>
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 font-mono text-slate-400">
                      <th className="pb-3 font-bold">Process Step</th>
                      <th className="pb-3 font-bold text-red-400">Key Failure Mode</th>
                      <th className="pb-3 font-bold">Critical Severity</th>
                      <th className="pb-3 font-bold">Actionable QA Engineering Mitigation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    <tr className="py-4">
                      <td className="py-3 font-mono text-slate-200">Decasing / Milling</td>
                      <td className="py-3 text-red-400">Internal core nicking &amp; delamination</td>
                      <td className="py-3 text-amber-500 font-bold">High</td>
                      <td className="py-3 text-slate-300">
                        Use automated precision mills with depth-stop sensors; perform 100% optical inspection and insulation resistance checks post-decasing.
                      </td>
                    </tr>
                    <tr className="py-4">
                      <td className="py-3 font-mono text-slate-200">Vacuum Bake-out</td>
                      <td className="py-3 text-red-400">Thermal shrinkage &amp; capacitance drift</td>
                      <td className="py-3 text-slate-400">Moderate</td>
                      <td className="py-3 text-slate-300">
                        Limit temperature to 85°C (Polypropylene) or 100°C (Polyester); monitor live mass loss using quartz crystal microbalances.
                      </td>
                    </tr>
                    <tr className="py-4">
                      <td className="py-3 font-mono text-slate-200">Arathane Potting</td>
                      <td className="py-3 text-red-400">Bubble/void entrapment &amp; corona discharge</td>
                      <td className="py-3 text-amber-500 font-bold">Critical</td>
                      <td className="py-3 text-slate-300">
                        Pot compound in active deep vacuum (&lt; 0.5 Torr); perform multi-stage degassing; verify void-free density using 3D X-ray microscopy.
                      </td>
                    </tr>
                    <tr className="py-4">
                      <td className="py-3 font-mono text-slate-200">Solder Lead Dipping</td>
                      <td className="py-3 text-red-400">Thermal shock &amp; schoopage cracking</td>
                      <td className="py-3 text-amber-500 font-bold">Critical</td>
                      <td className="py-3 text-slate-300">
                        Implement automated preheating (110°C); maintain solder pot strictly at 245°C - 260°C; limit dipping contact time to ≤ 3.0 seconds.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab 5: Wiki & Collaborative Submissions */}
        {activeTab === 'wiki' && (
          <div className="space-y-8 animate-fadeIn" id="wiki">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-100">Space Capacitors Engineering Wiki</h3>
                <p className="text-xs text-slate-400 mt-1">
                  A peer-reviewed repository of specialized spaceflight hardware insights. Read, submit, or approve ongoing research.
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 bg-indigo-950 text-indigo-400 border border-indigo-900 rounded font-mono">
                PEER-REVIEW STATUS: ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Published Research Section */}
              <div className="lg:col-span-2 space-y-6">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-2">
                  Published Peer-Reviewed Insights ({articles.length})
                </h4>

                {articles.map((art) => (
                  <div key={art.id} className="bg-slate-900/30 border border-slate-800 p-6 rounded-xl space-y-4 relative">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-indigo-950 text-indigo-400 border border-indigo-800/80 rounded uppercase">
                          {art.category}
                        </span>
                        <h5 className="text-base font-bold text-slate-100 mt-2">{art.title}</h5>
                        <p className="text-[11px] text-slate-400 mt-1">
                          By <strong className="text-slate-300">{art.author}</strong> — <span>{art.affiliation}</span>
                        </p>
                      </div>
                      <button 
                        onClick={() => handleUpvote(art.id)}
                        className="flex flex-col items-center gap-1 py-1.5 px-3 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded transition"
                      >
                        <span className="text-[10px] text-slate-400">UPVOTES</span>
                        <span className="font-mono text-sm font-black text-indigo-400">+{art.upvotes}</span>
                      </button>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed text-justify">
                      {art.content}
                    </p>

                    <div className="pt-3 border-t border-slate-800/60 flex flex-wrap gap-4 items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>Citations: <strong className="text-slate-400">{art.references}</strong></span>
                      <span>Verified: {art.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Form & Peer Review Queue */}
              <div className="space-y-6">
                
                {/* Submit New Insight Form */}
                <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl space-y-4">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Submit Research Insight</h4>
                  <form onSubmit={handleAddContribution} className="space-y-3">
                    
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase tracking-wide block mb-1">Article Title</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Heavy-Ion Scission limits of PEN"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-400 uppercase tracking-wide block mb-1">Author Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Dr. Rajesh Kumar"
                          value={newAuthor}
                          onChange={(e) => setNewAuthor(e.target.value)}
                          className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 uppercase tracking-wide block mb-1">Affiliation</label>
                        <input 
                          type="text" 
                          placeholder="e.g. ISRO QA Lab"
                          value={newAffiliation}
                          onChange={(e) => setNewAffiliation(e.target.value)}
                          className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-400 uppercase tracking-wide block mb-1">Category</label>
                        <select 
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-indigo-500"
                        >
                          <option value="Material Science">Material Science</option>
                          <option value="Physics of Failure">Physics of Failure</option>
                          <option value="Upscreening Playbook">Upscreening Playbook</option>
                          <option value="Radiation Effects">Radiation Effects</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 uppercase tracking-wide block mb-1">References/Citations</label>
                        <input 
                          type="text" 
                          placeholder="e.g. DOI: 10.1016/..."
                          value={newRefs}
                          onChange={(e) => setNewRefs(e.target.value)}
                          className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase tracking-wide block mb-1">Research Findings / Content</label>
                      <textarea 
                        rows="4"
                        required
                        placeholder="Detail the materials physics, validation results, or upscreening findings here..."
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-indigo-500 resize-none"
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-xs font-bold text-white transition flex items-center justify-center gap-1"
                    >
                      <Icons.Plus />
                      Submit to Peer-Review Queue
                    </button>
                  </form>
                </div>

                {/* Peer Review Queue panel */}
                <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl space-y-4">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Icons.ShieldAlert className="w-4 h-4 text-amber-400" />
                    Peer-Review Approvals Queue ({pendingReviews.length})
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Verify pending community papers. As an expert, review the submission details to ensure high scientific rigor before publishing.
                  </p>

                  {pendingReviews.length === 0 ? (
                    <div className="p-3 bg-slate-950 text-[10px] text-slate-500 text-center rounded border border-dashed border-slate-800">
                      No articles currently awaiting peer review.
                    </div>
                  ) : (
                    pendingReviews.map((review) => (
                      <div key={review.id} className="p-4 bg-slate-950 rounded border border-slate-800 space-y-3">
                        <div>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 bg-slate-800 rounded text-slate-300">
                            {review.category}
                          </span>
                          <h6 className="font-bold text-xs text-slate-200 mt-1">{review.title}</h6>
                          <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                            By {review.author} ({review.affiliation})
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          {review.content}
                        </p>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => approveArticle(review.id)}
                            className="flex-1 py-1 bg-emerald-600 hover:bg-emerald-700 text-slate-950 font-bold text-[10px] rounded transition flex items-center justify-center gap-0.5"
                          >
                            <Icons.Check className="w-3 h-3 text-slate-950" />
                            Approve
                          </button>
                          <button 
                            onClick={() => rejectArticle(review.id)}
                            className="flex-1 py-1 bg-red-950/40 hover:bg-red-900/50 text-red-400 font-medium text-[10px] rounded transition flex items-center justify-center gap-0.5"
                          >
                            <Icons.X className="w-3 h-3 text-red-400" />
                            Decline
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

              </div>
            </div>
          </div>
        )}

      </main>

      {/* Citations & Standards Network */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="border-b border-slate-900 pb-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-xs font-bold text-slate-300 block">Aerospace Reference Index</span>
              <p className="text-[10px] text-slate-500 mt-0.5">Valid citations for further academic research and project design sign-off.</p>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="hover:text-slate-200 transition">NASA Technical Standards</span>
              <span>•</span>
              <span className="hover:text-slate-200 transition">ESA Product Assurance</span>
              <span>•</span>
              <span className="hover:text-slate-200 transition">IEEE Trans. on Nuclear Science</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[11px] text-slate-500 leading-relaxed">
            <div className="space-y-2">
              <p>
                <Icons.Link /> [1] NASA EEE-INST-002: Instruction for EEE Parts Selection, Screening, Qualification, and Derating. Section: Capacitors.
              </p>
              <p>
                <Icons.Link /> [2] ESA ECSS-Q-ST-60C: Space Product Assurance - Electrical, electronic and electromechanical (EEE) components.
              </p>
              <p>
                <Icons.Link /> [3] ASTM E595-15: Standard Test Method for Total Mass Loss and Collected Volatile Condensable Materials.
              </p>
            </div>
            <div className="space-y-2">
              <p>
                <Icons.Link /> [4] Haruvy, Y. "Radiation durability and functional reliability of polymeric materials in space systems", IEEE Trans. on Nuclear Science.
              </p>
              <p>
                <Icons.Link /> [5] TDK EPCOS Metallized Film Capacitor Applications &amp; Selection Guidelines (B32529/B3271x Product Specifications).
              </p>
              <p>
                <Icons.Link /> [6] ESA ESCC Generic Specification No. 3006: Capacitors, Fixed, Metallised Plastic Dielectric, Hermetically Sealed or Unsealed.
              </p>
            </div>
          </div>

          <div className="text-center pt-6 border-t border-slate-900 text-[10px] text-slate-600 font-mono">
            © 2026 Space Capacitors Knowledge Base — Aerospace Component Engineering Hub. Fully self-contained.
          </div>
        </div>
      </footer>

    </div>
  );
}
