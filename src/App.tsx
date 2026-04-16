import { useState, useMemo, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Info, 
  BookOpen, 
  Trophy, 
  LayoutDashboard, 
  Zap, 
  ShieldCheck, 
  Search,
  Check,
  X,
  RefreshCcw,
  ArrowRight
} from 'lucide-react';
import { AgentType, Feature, FEATURES, SCENARIOS } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'explore' | 'quiz' | 'cheat'>('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<AgentType | 'All'>('All');

  const filteredFeatures = useMemo(() => {
    return FEATURES.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           f.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-brand-border px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="text-primary">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <h1 className="font-bold text-xl tracking-tight text-primary">Agent Architect Studio</h1>
        </div>
        
        <nav className="flex items-center gap-2">
          <NavButton 
            active={activeTab === 'explore'} 
            onClick={() => setActiveTab('explore')}
            icon={<LayoutDashboard size={16} />}
            label="Compare"
          />
          <NavButton 
            active={activeTab === 'quiz'} 
            onClick={() => setActiveTab('quiz')}
            icon={<Trophy size={16} />}
            label="Scenarios"
          />
          <NavButton 
            active={activeTab === 'cheat'} 
            onClick={() => setActiveTab('cheat')}
            icon={<BookOpen size={16} />}
            label="Guidelines"
          />
        </nav>
      </header>

      <main className="max-w-7xl mx-auto p-5">
        <AnimatePresence mode="wait">
          {activeTab === 'explore' && (
            <motion.div
              key="explore"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 py-2">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Agent Navigator</h2>
                  <p className="text-[#605E5C] text-sm font-medium">Core feature comparison & capability mapping</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                      type="text" 
                      placeholder="Filter features..."
                      className="pl-9 pr-4 py-2 bg-white border border-brand-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary h-9 w-48"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex bg-[#EDEBE9] p-0.5 rounded">
                    {(['All', 'Custom', 'Declarative', 'Embedded'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedAgent(type)}
                        className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition-all h-8 ${
                          selectedAgent === type 
                            ? 'bg-card text-primary shadow-sm' 
                            : 'text-[#605E5C] hover:text-brand-text'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Agent Grid Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <AgentSummaryCard type="Custom" color="custom" description="B2C & B2E focus with full orchestrator control." />
                <AgentSummaryCard type="Declarative" color="declarative" description="Internal B2E helper using Sydney logic." />
                <AgentSummaryCard type="Embedded" color="embedded" description="Environment agnostic Copilot extension." />
              </div>

              {/* Comparison Table */}
              <div className="bg-card rounded-lg shadow-sm border border-brand-border overflow-hidden">
                <div className="bg-[#FAF9F8] border-b border-brand-border px-6 py-2">
                  <span className="text-[10px] font-black text-[#605E5C] uppercase tracking-wider">Detailed Feature Matrix</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#FAF9F8] border-b border-brand-border">
                        <th className="px-6 py-3 text-[11px] font-bold text-[#605E5C] uppercase tracking-wider w-1/4">Core Capability</th>
                        <th className={`px-6 py-3 text-[11px] font-bold uppercase tracking-wider transition-opacity ${selectedAgent !== 'All' && selectedAgent !== 'Custom' ? 'opacity-20' : 'opacity-100'}`}>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-custom rounded-sm"></span>
                            Custom
                          </div>
                        </th>
                        <th className={`px-6 py-3 text-[11px] font-bold uppercase tracking-wider transition-opacity ${selectedAgent !== 'All' && selectedAgent !== 'Declarative' ? 'opacity-20' : 'opacity-100'}`}>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-declarative rounded-sm"></span>
                            Declarative
                          </div>
                        </th>
                        <th className={`px-6 py-3 text-[11px] font-bold uppercase tracking-wider transition-opacity ${selectedAgent !== 'All' && selectedAgent !== 'Embedded' ? 'opacity-20' : 'opacity-100'}`}>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-embedded rounded-sm"></span>
                            Embedded
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border">
                      {filteredFeatures.map((feature) => (
                        <tr key={feature.name} className="hover:bg-[#FAF9F8] transition-colors group">
                          <td className="px-6 py-3">
                            <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-[#605E5C] mb-0.5">{feature.category}</span>
                              <div className="flex items-center gap-2 text-xs font-semibold group-hover:text-primary transition-colors">
                                {feature.name}
                                <FeatureTooltip description={feature.description} />
                              </div>
                            </div>
                          </td>
                          <FeatureCell value={feature.values.Custom} isActive={selectedAgent === 'All' || selectedAgent === 'Custom'} />
                          <FeatureCell value={feature.values.Declarative} isActive={selectedAgent === 'All' || selectedAgent === 'Declarative'} />
                          <FeatureCell value={feature.values.Embedded} isActive={selectedAgent === 'All' || selectedAgent === 'Embedded'} />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-3xl mx-auto"
            >
              <QuizSection />
            </motion.div>
          )}

          {activeTab === 'cheat' && (
            <motion.div
              key="cheat"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-4xl mx-auto"
            >
              <CheatSheetSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded transition-all text-[11px] font-bold uppercase tracking-wider ${
        active 
          ? 'bg-primary text-white shadow-md' 
          : 'text-[#605E5C] hover:bg-[#FAF9F8]'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function AgentSummaryCard({ type, color, description }: { type: string, color: string, description: string }) {
  return (
    <div className="bg-card border border-brand-border rounded-lg p-5 flex flex-col gap-3 shadow-sm">
      <div className={`text-xs font-bold uppercase tracking-widest pb-2 border-b-2`} style={{ borderColor: `var(--color-${color})`, color: `var(--color-${color})` }}>
        {type} Agents
      </div>
      <p className="text-[13px] text-brand-text leading-snug">
        {description}
      </p>
      <div className="flex items-center gap-2 mt-auto">
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `var(--color-${color})` }}></div>
        <span className="text-[10px] font-bold text-[#605E5C] uppercase tracking-tighter">Ready to Deploy</span>
      </div>
    </div>
  );
}

function FeatureCell({ value, isActive }: { value: string | boolean, isActive: boolean }) {
  const isBool = typeof value === 'boolean';
  
  return (
    <td className={`px-6 py-3 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-10 pointer-events-none'}`}>
      {isBool ? (
        <div className="flex items-center gap-2">
          {value ? (
            <span className="bg-[#DFF6DD] text-[#107C10] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter">
              YES
            </span>
          ) : (
            <span className="text-[#605E5C] text-[10px] font-bold uppercase tracking-tighter opacity-50">
              NO
            </span>
          )}
        </div>
      ) : (
        <span className="text-[12px] text-brand-text leading-snug font-medium">{value}</span>
      )}
    </td>
  );
}

function FeatureTooltip({ description }: { description: string }) {
  return (
    <div className="group relative">
      <Info size={14} className="text-gray-300 cursor-help" />
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-[10px] rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
        {description}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
}

function QuizSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<AgentType | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const scenario = SCENARIOS[currentIdx];

  const handleAnswer = (answer: AgentType) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === scenario.correctAgent) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < SCENARIOS.length - 1) {
      setCurrentIdx(c => c + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="bg-card rounded-lg p-12 text-center shadow-lg border border-brand-border">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FAF9F8] border border-brand-border rounded-full mb-6 text-primary">
          <Trophy className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold mb-2 tracking-tight">Quiz Results</h2>
        <p className="text-[#605E5C] text-sm mb-8 font-medium">Certification session complete.</p>
        
        <div className="grid grid-cols-2 gap-px bg-brand-border border border-brand-border max-w-sm mx-auto mb-10 overflow-hidden rounded-lg">
          <div className="bg-white p-6">
            <div className="text-[10px] font-black text-[#605E5C] uppercase tracking-widest mb-1">Score</div>
            <div className="text-3xl font-bold text-primary">{score}/{SCENARIOS.length}</div>
          </div>
          <div className="bg-white p-6">
            <div className="text-[10px] font-black text-[#605E5C] uppercase tracking-widest mb-1">Accuracy</div>
            <div className="text-3xl font-bold text-primary">{Math.round((score / SCENARIOS.length) * 100)}%</div>
          </div>
        </div>

        <button 
          onClick={handleReset}
          className="flex items-center justify-center gap-2 mx-auto px-8 py-3 bg-primary text-white rounded font-bold text-sm hover:opacity-90 transition-opacity"
        >
          <RefreshCcw size={16} /> Restart Evaluation
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
      <div className="space-y-6">
        <div className="p-2">
          <h2 className="text-2xl font-bold tracking-tight">Quick Knowledge Check</h2>
          <p className="text-[#605E5C] text-sm font-medium mt-1">Select the most appropriate agent type for the given business case.</p>
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-brand-border overflow-hidden">
          <div className="p-8 border-b border-brand-border bg-[#FAF9F8]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-primary text-[10px] font-black uppercase tracking-widest">Interactive Scenario</span>
              <span className="text-[#605E5C] text-[10px] font-bold">{currentIdx + 1} / {SCENARIOS.length}</span>
            </div>
            <p className="text-base font-semibold leading-relaxed text-[#323130] italic">
              "{scenario.text}"
            </p>
          </div>

          <div className="p-8 space-y-4">
            <div className="grid gap-3">
              {(['Custom', 'Declarative', 'Embedded'] as AgentType[]).map((type) => {
                const isSelected = selectedAnswer === type;
                const isCorrect = isAnswered && type === scenario.correctAgent;
                const isWrong = isAnswered && isSelected && type !== scenario.correctAgent;

                return (
                  <button
                    key={type}
                    disabled={isAnswered}
                    onClick={() => handleAnswer(type)}
                    className={`relative flex items-center justify-between p-4 rounded border transition-all text-left ${
                      isSelected && !isAnswered ? 'border-primary bg-[#F3F5F8]' : 
                      isCorrect ? 'border-success bg-[#DFF6DD]/30 text-success' :
                      isWrong ? 'border-rose-500 bg-rose-50 text-rose-700' :
                      'border-brand-border hover:bg-[#F8F9FA]'
                    }`}
                  >
                    <span className="text-sm font-bold uppercase tracking-tight">
                      {type} Agent
                    </span>
                    
                    {isCorrect && <Check size={18} />}
                    {isWrong && <X size={18} />}
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6 pt-6 border-t border-brand-border"
                >
                  <div className={`p-4 rounded border ${selectedAnswer === scenario.correctAgent ? 'bg-[#DFF6DD]/20 border-[#D6F0D3]' : 'bg-rose-50/50 border-rose-100'}`}>
                    <div className="flex items-center gap-2 mb-2">
                       {selectedAnswer === scenario.correctAgent ? <CheckCircle2 size={16} className="text-success" /> : <XCircle size={16} className="text-rose-600" />}
                       <h4 className={`font-bold text-xs uppercase tracking-wider ${selectedAnswer === scenario.correctAgent ? 'text-success' : 'text-rose-800'}`}>
                        {selectedAnswer === scenario.correctAgent ? 'Successful Mapping' : 'Incorrect Mapping'}
                      </h4>
                    </div>
                    <p className="text-[13px] text-[#605E5C] leading-snug font-medium">
                      {scenario.explanation}
                    </p>
                  </div>
                  
                  <button 
                    onClick={handleNext}
                    className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-white rounded font-bold text-sm hover:opacity-90 transition-opacity"
                  >
                    {currentIdx < SCENARIOS.length - 1 ? 'Next Scenario' : 'View Results'}
                    <ArrowRight size={16} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-col gap-6">
        <div className="bg-primary text-white rounded-lg p-6 shadow-md shadow-primary/20">
          <div className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">Architect Tip</div>
          <h3 className="text-lg font-bold mb-3 leading-tight">Deciding the right fit</h3>
          <p className="text-sm opacity-90 leading-snug">
            Always prioritize <strong>Custom Agents</strong> for omnichannel, high-control, and customer-facing (B2C) needs.
          </p>
        </div>
        
        <div className="bg-card border border-brand-border rounded-lg p-6 flex flex-col gap-4">
          <div className="text-[10px] font-black uppercase tracking-wider text-[#605E5C]">Learning Progress</div>
          <div className="flex flex-col gap-1.5">
             <div className="flex justify-between text-[11px] font-bold text-[#323130]">
               <span>Agent Comparison</span>
               <span>{Math.round(((currentIdx + (isAnswered ? 1 : 0)) / SCENARIOS.length) * 100)}%</span>
             </div>
             <div className="h-2 w-full bg-[#EDEBE9] rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${((currentIdx + (isAnswered ? 1 : 0)) / SCENARIOS.length) * 100}%` }}
                 className="h-full bg-success rounded-full"
               />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheatSheetSection() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Deployment Guidelines</h2>
        <p className="text-[#605E5C] mt-1 text-sm font-medium italic">High-level architectural constraints and best practices.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <CheatCard 
          title="Custom Agent" 
          color="custom" 
          description="Elite platform for complex customer-facing workflows requiring human handoff."
          points={[
            "Full B2C & B2E capability",
            "Omnichannel (Web, WhatsApp, Apple)",
            "Rich UI support via Adaptive Cards",
            "Direct code editor & Azure AI flow",
            "Unified analytics across channels"
          ]}
        />
        <CheatCard 
          title="Declarative Agent" 
          color="declarative" 
          description="Agile productivity layer to extend M365 Copilot for internal data."
          points={[
            "B2E internal workloads only",
            "Native M365 Copilot & Teams app",
            "Deep SharePoint/Graph integration",
            "Solution & Environment awareness",
            "No custom topic or cards support"
          ]}
        />
        <CheatCard 
          title="Embedded Agent" 
          color="embedded" 
          description="Contextual helper strictly within the M365 ecosystem."
          points={[
            "Strictly B2E internal scenarios",
            "Env agnostic architecture",
            "Graph search + Full Web lookup",
            "Managed admin connectivity",
            "No custom actions or automation"
          ]}
        />
      </div>

      <div className="bg-card border border-brand-border rounded-lg p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-primary/10 rounded text-primary">
               <ShieldCheck size={20} />
             </div>
             <h3 className="text-lg font-bold text-primary tracking-tight">Security & Governance Matrix</h3>
          </div>
          <p className="text-[#605E5C] text-[13px] leading-relaxed max-w-2xl font-medium">
            <strong>Custom Agents</strong> support end-to-end authentication for both the agent interface and underlying external actions. 
            <strong>Declarative Agents</strong> delegate interface auth but support action-level security. 
            <strong>Embedded Agents</strong> operate within the existing M365 security perimeter with minimal custom auth surfaces.
          </p>
        </div>
        <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-xl"></div>
      </div>
    </div>
  );
}

function CheatCard({ title, color, description, points }: { title: string, color: 'custom' | 'declarative' | 'embedded', description: string, points: string[] }) {
  const colorHex = {
    custom: 'var(--color-custom)',
    declarative: 'var(--color-declarative)',
    embedded: 'var(--color-embedded)'
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border border-brand-border flex flex-col h-full hover:shadow-md transition-shadow">
      <div className={`w-fit px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest mb-4`} style={{ backgroundColor: `${colorHex[color]}15`, color: colorHex[color] }}>
        {title}
      </div>
      <p className="text-[13px] text-brand-text font-bold mb-6 leading-snug">
        {description}
      </p>
      <ul className="space-y-3 mt-auto border-t border-brand-border pt-4">
        {points.map((p, i) => (
          <li key={i} className="flex items-start gap-2 text-[11px] text-[#605E5C] font-semibold">
            <div className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: colorHex[color] }} />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

