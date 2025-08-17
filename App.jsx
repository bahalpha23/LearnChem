import React, { useState, useEffect } from 'react';
import {
  Calculator, Atom, Beaker, FlaskConical, TestTube, Zap, RotateCcw,
  Thermometer, Layers, CircleDot, Flame, Wind, Droplets, Sun, Gauge,
  BarChart, Target, TrendingUp, Hourglass, BatteryCharging, Radio,
  ShieldCheck, ChevronsUpDown, Weight, Pipette, Eye, Wrench, Recycle, Scale, BookOpen, X, Menu, SlidersHorizontal
} from 'lucide-react';

// Main App Component
const App = () => {
  // State for active calculator and mobile sidebar visibility
  const [activeCategory, setActiveCategory] = useState('basic');
  const [activeCalculator, setActiveCalculator] = useState('molarMass');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Data structure for all calculators, organized by category
  const calculatorCategories = {
    basic: {
      name: 'Basic Calculations',
      icon: Calculator,
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
      lightBg: 'bg-blue-50',
      borderColor: 'border-blue-200',
      calculators: {
        molarMass: { name: 'Molar Mass', icon: Atom },
        moles: { name: 'Moles & Mass', icon: Weight },
        molarity: { name: 'Molarity', icon: TestTube },
        molality: { name: 'Molality', icon: Droplets },
        massConcentration: { name: 'Mass Percent', icon: BarChart },
        normality: { name: 'Normality', icon: Scale },
        dilution: { name: 'Dilution', icon: FlaskConical },
        percent: { name: 'Percent Composition', icon: Target },
      }
    },
    gas: {
      name: 'Gas Laws',
      icon: Wind,
      color: 'text-emerald-600',
      bgColor: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      lightBg: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      calculators: {
        idealgas: { name: 'Ideal Gas Law', icon: Zap },
        boyle: { name: "Boyle's Law", icon: Gauge },
        charles: { name: "Charles' Law", icon: Thermometer },
        gayLussac: { name: "Gay-Lussac's Law", icon: Sun },
        avogadro: { name: "Avogadro's Law", icon: Beaker },
        combined: { name: 'Combined Gas Law', icon: TrendingUp },
        dalton: { name: "Dalton's Law", icon: Layers },
      }
    },
    equilibrium: {
      name: 'Equilibrium & Acids/Bases',
      icon: SlidersHorizontal,
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
      lightBg: 'bg-purple-50',
      borderColor: 'border-purple-200',
      calculators: {
        ph: { name: 'pH & pOH', icon: TestTube },
        titration: { name: 'Titration', icon: Pipette },
        keq: { name: 'Equilibrium Constant', icon: CircleDot },
        buffer: { name: 'Buffer Solutions', icon: Beaker },
        ksp: { name: 'Solubility Product', icon: Droplets }
      }
    },
    thermo: {
      name: 'Thermochemistry',
      icon: Flame,
      color: 'text-orange-600',
      bgColor: 'bg-gradient-to-br from-orange-500 to-orange-600',
      lightBg: 'bg-orange-50',
      borderColor: 'border-orange-200',
      calculators: {
        enthalpy: { name: 'Enthalpy Change', icon: Flame },
        calorimetry: { name: 'Calorimetry', icon: Thermometer },
        gibbs: { name: 'Gibbs Free Energy', icon: Sun },
        hess: { name: "Hess's Law", icon: Layers }
      }
    },
    kinetics: {
      name: 'Kinetics',
      icon: Hourglass,
      color: 'text-sky-600',
      bgColor: 'bg-gradient-to-br from-sky-500 to-sky-600',
      lightBg: 'bg-sky-50',
      borderColor: 'border-sky-200',
      calculators: {
        rate: { name: 'Rate Law', icon: TrendingUp },
        arrhenius: { name: 'Arrhenius Equation', icon: Thermometer },
      }
    },
    electro: {
      name: 'Electrochemistry',
      icon: BatteryCharging,
      color: 'text-yellow-600',
      bgColor: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
      lightBg: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      calculators: {
        nernst: { name: 'Nernst Equation', icon: Zap },
        cell: { name: 'Cell Potential', icon: BatteryCharging },
        faraday: { name: "Faraday's Laws", icon: Scale }
      }
    },
    analytical: {
      name: 'Analytical Chemistry',
      icon: FlaskConical,
      color: 'text-slate-600',
      bgColor: 'bg-gradient-to-br from-slate-500 to-slate-600',
      lightBg: 'bg-slate-50',
      borderColor: 'border-slate-200',
      calculators: {
        beer: { name: "Beer-Lambert Law", icon: Eye },
        lle: { name: "Liquid-Liquid Extraction", icon: Layers },
      }
    },
    nuclear: {
      name: 'Nuclear Chemistry',
      icon: Radio,
      color: 'text-lime-600',
      bgColor: 'bg-gradient-to-br from-lime-500 to-lime-600',
      lightBg: 'bg-lime-50',
      borderColor: 'border-lime-200',
      calculators: {
        halflife: { name: 'Half-Life & Decay', icon: Hourglass },
        binding: { name: 'Binding Energy', icon: ShieldCheck },
      }
    },
    organic: {
      name: 'Organic Chemistry',
      icon: Atom,
      color: 'text-rose-600',
      bgColor: 'bg-gradient-to-br from-rose-500 to-rose-600',
      lightBg: 'bg-rose-50',
      borderColor: 'border-rose-200',
      calculators: {
        hdi: { name: 'Hydrogen Deficiency Index', icon: Calculator },
        molecular: { name: 'Molecular Formula', icon: Atom },
        empirical: { name: 'Empirical Formula', icon: Target }
      }
    },
    reference: {
      name: 'Reference',
      icon: BookOpen,
      color: 'text-red-600',
      bgColor: 'bg-gradient-to-br from-red-500 to-red-600',
      lightBg: 'bg-red-50',
      borderColor: 'border-red-200',
      calculators: {
        periodicTable: { name: 'Periodic Table', icon: Layers },
      }
    },
    utilities: {
      name: 'Utilities',
      icon: Wrench,
      color: 'text-indigo-600',
      bgColor: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      lightBg: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      calculators: {
        converter: { name: 'Unit Converter', icon: Recycle },
      }
    }
  };

  // --- Reusable UI Components ---

  const FlexibleInput = ({ label, value, onChange, unit, placeholder, isResult, type = "number", disabled = false }) => (
    <div className="group">
      <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 placeholder-gray-400 ${disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed border-gray-200' :
            isResult
              ? 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-300 text-emerald-800 font-semibold shadow-inner'
              : 'bg-white border-gray-300 hover:border-gray-400 hover:shadow-md focus:shadow-lg'
            }`}
        />
        {unit && (
          <span className="absolute inset-y-0 right-4 flex items-center text-sm font-medium text-gray-500 pointer-events-none">
            {unit}
          </span>
        )}
      </div>
    </div>
  );

  const SolutionDisplay = ({ solution }) => {
    const [show, setShow] = useState(false);
    if (!solution || solution.length === 0) return null;
    return (
      <div className="mt-8">
        <div className="text-center">
          <button
            onClick={() => setShow(!show)}
            className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all duration-300 text-sm flex items-center justify-center gap-2 mx-auto border-2 border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg"
          >
            {show ? 'Hide' : 'Show'} Solution
            <ChevronsUpDown className={`w-4 h-4 transition-transform duration-300 ${show ? 'rotate-180' : ''}`} />
          </button>
        </div>
        {show && (
          <div className="mt-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl text-left border-2 border-gray-200 animate-fade-in shadow-inner">
            <div className="space-y-3 text-sm prose prose-sm max-w-none">
              {solution}
            </div>
          </div>
        )}
      </div>
    );
  };

  const CalculatorWrapper = ({ children, onReset }) => (
    <div className="space-y-8">
      {children}
      {onReset && (
        <div className="flex justify-end mt-8 pt-6 border-t-2 border-gray-100">
          <button
            onClick={onReset}
            className="flex items-center gap-2 text-sm bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-semibold py-3 px-5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Fields
          </button>
        </div>
      )}
    </div>
  );

  const atomicMasses = { 'H': 1.008, 'He': 4.0026, 'Li': 6.94, 'Be': 9.0122, 'B': 10.81, 'C': 12.011, 'N': 14.007, 'O': 15.999, 'F': 18.998, 'Ne': 20.180, 'Na': 22.990, 'Mg': 24.305, 'Al': 26.982, 'Si': 28.085, 'P': 30.974, 'S': 32.06, 'Cl': 35.45, 'K': 39.098, 'Ar': 39.948, 'Ca': 40.078, 'Sc': 44.956, 'Ti': 47.867, 'V': 50.942, 'Cr': 51.996, 'Mn': 54.938, 'Fe': 55.845, 'Ni': 58.693, 'Co': 58.933, 'Cu': 63.546, 'Zn': 65.38, 'Ga': 69.723, 'Ge': 72.630, 'As': 74.922, 'Se': 78.971, 'Br': 79.904, 'Kr': 83.798, 'Rb': 85.468, 'Sr': 87.62, 'Y': 88.906, 'Zr': 91.224, 'Nb': 92.906, 'Mo': 95.96, 'Tc': 98, 'Ru': 101.07, 'Rh': 102.91, 'Pd': 106.42, 'Ag': 107.87, 'Cd': 112.41, 'In': 114.82, 'Sn': 118.71, 'Sb': 121.76, 'I': 126.90, 'Te': 127.60, 'Xe': 131.29, 'Cs': 132.91, 'Ba': 137.33, 'La': 138.91, 'Ce': 140.12, 'Pr': 140.91, 'Nd': 144.24, 'Pm': 145, 'Sm': 150.36, 'Eu': 151.96, 'Gd': 157.25, 'Tb': 158.93, 'Dy': 162.50, 'Ho': 164.93, 'Er': 167.26, 'Tm': 168.93, 'Yb': 173.05, 'Lu': 174.97, 'Hf': 178.49, 'Ta': 180.95, 'W': 183.84, 'Re': 186.21, 'Os': 190.23, 'Ir': 192.22, 'Pt': 195.08, 'Au': 196.97, 'Hg': 200.59, 'Tl': 204.38, 'Pb': 207.2, 'Bi': 208.98, 'Po': 209, 'At': 210, 'Rn': 222, 'Fr': 223, 'Ra': 226, 'Ac': 227, 'Th': 232.04, 'Pa': 231.04, 'U': 238.03, 'Np': 237, 'Pu': 244, 'Am': 243, 'Cm': 247, 'Bk': 247, 'Cf': 251, 'Es': 252, 'Fm': 257, 'Md': 258, 'No': 259, 'Lr': 262, 'Rf': 267, 'Db': 270, 'Sg': 271, 'Bh': 270, 'Hs': 277, 'Mt': 276, 'Ds': 281, 'Rg': 280, 'Cn': 285, 'Nh': 284, 'Fl': 289, 'Mc': 288, 'Lv': 293, 'Ts': 294, 'Og': 294 };

  // --- CALCULATOR IMPLEMENTATIONS ---

  const MolarMassCalculator = () => {
    const [formula, setFormula] = useState('H2SO4');
    const [result, setResult] = useState('');
    const [solution, setSolution] = useState(null);
    
    const calculateMolarMass = (currentFormula) => {
      if (!currentFormula) {
        setResult('');
        setSolution(null);
        return;
      }
      const regex = /([A-Z][a-z]?)(\d*)/g;
      let match;
      let totalMass = 0;
      let solutionSteps = [];
      solutionSteps.push(<p key="start"><strong>Calculating Molar Mass for {currentFormula}:</strong></p>);
      while ((match = regex.exec(currentFormula)) !== null) {
        const element = match[1];
        const count = match[2] ? parseInt(match[2], 10) : 1;
        if (atomicMasses[element]) {
          const mass = atomicMasses[element];
          totalMass += mass * count;
          solutionSteps.push(<p key={element}>- <strong>{element}</strong>: {count} × {mass.toFixed(3)} g/mol = {(mass * count).toFixed(3)} g/mol</p>);
        } else {
          setResult('Invalid element');
          setSolution([<p key="error">Error: Element "{element}" not found.</p>]);
          return;
        }
      }
      if (totalMass > 0) {
        setResult(totalMass.toFixed(3));
        solutionSteps.push(<hr key="hr" className="my-2" />);
        solutionSteps.push(<p key="total"><strong>Total Molar Mass = {totalMass.toFixed(3)} g/mol</strong></p>);
        setSolution(solutionSteps);
      } else {
        setResult('');
        setSolution(null);
      }
    };
    
    useEffect(() => {
      calculateMolarMass(formula);
    }, [formula]);
    
    const reset = () => {
      setFormula('');
      setResult('');
      setSolution(null);
    };
    
    return (
      <CalculatorWrapper onReset={reset}>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-100">
          <p className="text-sm text-gray-600 leading-relaxed">Enter a chemical formula to calculate its molar mass. The formula is case-sensitive (e.g., 'H2O', not 'h2o').</p>
        </div>
        <div className="space-y-6">
          <FlexibleInput label="Chemical Formula" value={formula} onChange={(e) => setFormula(e.target.value)} type="text" placeholder="e.g., C6H12O6" />
          <FlexibleInput label="Molar Mass" value={result} unit="g/mol" placeholder="Result" isResult={!!result} disabled />
        </div>
        <SolutionDisplay solution={solution} />
      </CalculatorWrapper>
    );
  };

  const MolarityCalculator = () => {
    const [state, setState] = useState({ moles: '', volume: '', molarity: '' });
    const [resultField, setResultField] = useState('');
    const [solution, setSolution] = useState(null);
    
    const reset = () => {
      setState({ moles: '', volume: '', molarity: '' });
      setResultField('');
      setSolution(null);
    };
    
    const handleChange = (field) => (e) => {
      const newState = { ...state, [field]: e.target.value };
      setState(newState);
      const moles = parseFloat(newState.moles);
      const volume = parseFloat(newState.volume);
      if (field !== 'molarity' && !isNaN(moles) && !isNaN(volume) && volume > 0) {
        const result = moles / volume;
        setState(s => ({ ...s, molarity: result.toPrecision(4) }));
        setResultField('molarity');
        setSolution(<> <p><strong>Formula:</strong> Molarity = Moles / Volume</p> <p><code>Molarity = {moles} mol / {volume} L = {result.toPrecision(4)} M</code></p> </>);
      } else {
        const molarity = parseFloat(newState.molarity);
        if (field !== 'moles' && !isNaN(molarity) && !isNaN(volume) && volume > 0) {
          const result = molarity * volume;
          setState(s => ({ ...s, moles: result.toPrecision(4) }));
          setResultField('moles');
          setSolution(<> <p><strong>Formula:</strong> Moles = Molarity × Volume</p> <p><code>Moles = {molarity} M × {volume} L = {result.toPrecision(4)} mol</code></p> </>);
        } else if (field !== 'volume' && !isNaN(molarity) && !isNaN(moles) && molarity > 0) {
          const result = moles / molarity;
          setState(s => ({ ...s, volume: result.toPrecision(4) }));
          setResultField('volume');
          setSolution(<> <p><strong>Formula:</strong> Volume = Moles / Molarity</p> <p><code>Volume = {moles} mol / {molarity} M = {result.toPrecision(4)} L</code></p> </>);
        } else {
          setResultField('');
          setSolution(null);
        }
      }
    };
    
    return (
      <CalculatorWrapper onReset={reset}>
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border-2 border-emerald-100">
          <p className="text-sm text-gray-600 leading-relaxed">Enter any two values to calculate the third using the molarity equation.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FlexibleInput label="Moles of Solute" value={state.moles} onChange={handleChange('moles')} unit="mol" placeholder="e.g., 0.5" isResult={resultField === 'moles'} />
          <FlexibleInput label="Volume of Solution" value={state.volume} onChange={handleChange('volume')} unit="L" placeholder="e.g., 1.0" isResult={resultField === 'volume'} />
          <div className="md:col-span-2">
            <FlexibleInput label="Molarity" value={state.molarity} onChange={handleChange('molarity')} unit="M (mol/L)" placeholder="e.g., 0.5" isResult={resultField === 'molarity'} />
          </div>
        </div>
        <SolutionDisplay solution={solution} />
      </CalculatorWrapper>
    );
  };

  const IdealGasCalculator = () => {
    const [state, setState] = useState({ pressure: '', volume: '', moles: '', temperature: '' });
    const [resultField, setResultField] = useState('');
    const [solution, setSolution] = useState(null);
    const R = 0.08206; // L·atm/(mol·K)
    
    const reset = () => {
      setState({ pressure: '', volume: '', moles: '', temperature: '' });
      setResultField('');
      setSolution(null);
    };
    
    const handleChange = (field) => (e) => {
      const newState = { ...state, [field]: e.target.value };
      setState(newState);
      const p = parseFloat(newState.pressure), v = parseFloat(newState.volume), n = parseFloat(newState.moles), t = parseFloat(newState.temperature);
      
      if (field !== 'pressure' && !isNaN(v) && !isNaN(n) && !isNaN(t) && v > 0 && t > 0) {
        const result = (n * R * t) / v;
        setState(s => ({ ...s, pressure: result.toPrecision(4) }));
        setResultField('pressure');
        setSolution(<> <p><strong>Formula:</strong> P = (nRT) / V</p> <p><code>P = ({n} mol × {R} L·atm/mol·K × {t} K) / {v} L = {result.toPrecision(4)} atm</code></p> </>);
      } else if (field !== 'volume' && !isNaN(p) && !isNaN(n) && !isNaN(t) && p > 0 && t > 0) {
        const result = (n * R * t) / p;
        setState(s => ({ ...s, volume: result.toPrecision(4) }));
        setResultField('volume');
        setSolution(<> <p><strong>Formula:</strong> V = (nRT) / P</p> <p><code>V = ({n} mol × {R} L·atm/mol·K × {t} K) / {p} atm = {result.toPrecision(4)} L</code></p> </>);
      } else if (field !== 'moles' && !isNaN(p) && !isNaN(v) && !isNaN(t) && t > 0) {
        const result = (p * v) / (R * t);
        setState(s => ({ ...s, moles: result.toPrecision(4) }));
        setResultField('moles');
        setSolution(<> <p><strong>Formula:</strong> n = (PV) / (RT)</p> <p><code>n = ({p} atm × {v} L) / ({R} L·atm/mol·K × {t} K) = {result.toPrecision(4)} mol</code></p> </>);
      } else if (field !== 'temperature' && !isNaN(p) && !isNaN(v) && !isNaN(n) && n > 0) {
        const result = (p * v) / (n * R);
        setState(s => ({ ...s, temperature: result.toPrecision(4) }));
        setResultField('temperature');
        setSolution(<> <p><strong>Formula:</strong> T = (PV) / (nR)</p> <p><code>T = ({p} atm × {v} L) / ({n} mol × {R} L·atm/mol·K) = {result.toPrecision(4)} K</code></p> </>);
      } else {
        setResultField('');
        setSolution(null);
      }
    };
    
    return (
      <CalculatorWrapper onReset={reset}>
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border-2 border-emerald-100">
          <p className="text-sm text-gray-600 leading-relaxed">Enter any three values to calculate the fourth. R = {R} L·atm/(mol·K).</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FlexibleInput label="Pressure (P)" value={state.pressure} onChange={handleChange('pressure')} unit="atm" placeholder="e.g., 1.0" isResult={resultField === 'pressure'} />
          <FlexibleInput label="Volume (V)" value={state.volume} onChange={handleChange('volume')} unit="L" placeholder="e.g., 22.4" isResult={resultField === 'volume'} />
          <FlexibleInput label="Moles (n)" value={state.moles} onChange={handleChange('moles')} unit="mol" placeholder="e.g., 1.0" isResult={resultField === 'moles'} />
          <FlexibleInput label="Temperature (T)" value={state.temperature} onChange={handleChange('temperature')} unit="K" placeholder="e.g., 273.15" isResult={resultField === 'temperature'} />
        </div>
        <SolutionDisplay solution={solution} />
      </CalculatorWrapper>
    );
  };

  const PHCalculator = () => {
    const [state, setState] = useState({ h: '', poh: '', ph: '' });
    const [solution, setSolution] = useState(null);
    
    const reset = () => {
      setState({ h: '', poh: '', ph: '' });
      setSolution(null);
    };
    
    const handleChange = (field) => (e) => {
      const newState = { h: '', poh: '', ph: '', [field]: e.target.value };
      setState(newState);
      const h_val = parseFloat(newState.h);
      const ph_val = parseFloat(newState.ph);
      const poh_val = parseFloat(newState.poh);
      
      if (field === 'h' && !isNaN(h_val) && h_val > 0) {
        const new_ph = -Math.log10(h_val);
        const new_poh = 14 - new_ph;
        setState({ h: newState.h, ph: new_ph.toPrecision(3), poh: new_poh.toPrecision(3) });
        setSolution(<> <p>pH = -log₁₀({h_val}) = {new_ph.toPrecision(3)}</p> <p>pOH = 14 - {new_ph.toPrecision(3)} = {new_poh.toPrecision(3)}</p> </>);
      } else if (field === 'ph' && !isNaN(ph_val)) {
        const new_h = Math.pow(10, -ph_val);
        const new_poh = 14 - ph_val;
        setState({ ph: newState.ph, h: new_h.toExponential(2), poh: new_poh.toPrecision(3) });
        setSolution(<> <p>[H⁺] = 10<sup>-{ph_val}</sup> = {new_h.toExponential(2)} M</p> <p>pOH = 14 - {ph_val} = {new_poh.toPrecision(3)}</p> </>);
      } else if (field === 'poh' && !isNaN(poh_val)) {
        const new_ph = 14 - poh_val;
        const new_h = Math.pow(10, -new_ph);
        setState({ poh: newState.poh, ph: new_ph.toPrecision(3), h: new_h.toExponential(2) });
        setSolution(<> <p>pH = 14 - {poh_val} = {new_ph.toPrecision(3)}</p> <p>[H⁺] = 10<sup>-{new_ph.toPrecision(3)}</sup> = {new_h.toExponential(2)} M</p> </>);
      } else {
        setSolution(null);
      }
    };
    
    return (
      <CalculatorWrapper onReset={reset}>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-100">
          <p className="text-sm text-gray-600 leading-relaxed">Enter any one value to calculate the others using pH/pOH relationships.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FlexibleInput label="[H⁺] Concentration" value={state.h} onChange={handleChange('h')} unit="M" placeholder="e.g., 1e-7" isResult={!!state.ph && !!state.poh} />
          <FlexibleInput label="pH" value={state.ph} onChange={handleChange('ph')} unit="" placeholder="e.g., 7.0" isResult={!!state.h && !!state.poh} />
          <div className="md:col-span-2">
            <FlexibleInput label="pOH" value={state.poh} onChange={handleChange('poh')} unit="" placeholder="e.g., 7.0" isResult={!!state.h && !!state.ph} />
          </div>
        </div>
        <SolutionDisplay solution={solution} />
      </CalculatorWrapper>
    );
  };

  const PeriodicTable = () => {
    // Enhanced periodic table with modern design
    const elements = [
      { "number": 1, "symbol": "H", "name": "Hydrogen", "mass": 1.008, "category": "diatomic nonmetal", "x": 1, "y": 1, "config": "1s¹", "en": 2.20 },
      { "number": 2, "symbol": "He", "name": "Helium", "mass": 4.0026, "category": "noble gas", "x": 18, "y": 1, "config": "1s²", "en": null },
      { "number": 3, "symbol": "Li", "name": "Lithium", "mass": 6.94, "category": "alkali metal", "x": 1, "y": 2, "config": "[He] 2s¹", "en": 0.98 },
      { "number": 4, "symbol": "Be", "name": "Beryllium", "mass": 9.0122, "category": "alkaline earth metal", "x": 2, "y": 2, "config": "[He] 2s²", "en": 1.57 },
      { "number": 5, "symbol": "B", "name": "Boron", "mass": 10.81, "category": "metalloid", "x": 13, "y": 2, "config": "[He] 2s² 2p¹", "en": 2.04 },
      { "number": 6, "symbol": "C", "name": "Carbon", "mass": 12.011, "category": "polyatomic nonmetal", "x": 14, "y": 2, "config": "[He] 2s² 2p²", "en": 2.55 },
      { "number": 7, "symbol": "N", "name": "Nitrogen", "mass": 14.007, "category": "diatomic nonmetal", "x": 15, "y": 2, "config": "[He] 2s² 2p³", "en": 3.04 },
      { "number": 8, "symbol": "O", "name": "Oxygen", "mass": 15.999, "category": "diatomic nonmetal", "x": 16, "y": 2, "config": "[He] 2s² 2p⁴", "en": 3.44 },
      { "number": 9, "symbol": "F", "name": "Fluorine", "mass": 18.998, "category": "diatomic nonmetal", "x": 17, "y": 2, "config": "[He] 2s² 2p⁵", "en": 3.98 },
      { "number": 10, "symbol": "Ne", "name": "Neon", "mass": 20.180, "category": "noble gas", "x": 18, "y": 2, "config": "[He] 2s² 2p⁶", "en": null },
      { "number": 11, "symbol": "Na", "name": "Sodium", "mass": 22.990, "category": "alkali metal", "x": 1, "y": 3, "config": "[Ne] 3s¹", "en": 0.93 },
      { "number": 12, "symbol": "Mg", "name": "Magnesium", "mass": 24.305, "category": "alkaline earth metal", "x": 2, "y": 3, "config": "[Ne] 3s²", "en": 1.31 },
      { "number": 13, "symbol": "Al", "name": "Aluminium", "mass": 26.982, "category": "post-transition metal", "x": 13, "y": 3, "config": "[Ne] 3s² 3p¹", "en": 1.61 },
      { "number": 14, "symbol": "Si", "name": "Silicon", "mass": 28.085, "category": "metalloid", "x": 14, "y": 3, "config": "[Ne] 3s² 3p²", "en": 1.90 },
      { "number": 15, "symbol": "P", "name": "Phosphorus", "mass": 30.974, "category": "polyatomic nonmetal", "x": 15, "y": 3, "config": "[Ne] 3s² 3p³", "en": 2.19 },
      { "number": 16, "symbol": "S", "name": "Sulfur", "mass": 32.06, "category": "polyatomic nonmetal", "x": 16, "y": 3, "config": "[Ne] 3s² 3p⁴", "en": 2.58 },
      { "number": 17, "symbol": "Cl", "name": "Chlorine", "mass": 35.45, "category": "diatomic nonmetal", "x": 17, "y": 3, "config": "[Ne] 3s² 3p⁵", "en": 3.16 },
      { "number": 18, "symbol": "Ar", "name": "Argon", "mass": 39.948, "category": "noble gas", "x": 18, "y": 3, "config": "[Ne] 3s² 3p⁶", "en": null },
      // Add more key elements for demonstration
      { "number": 19, "symbol": "K", "name": "Potassium", "mass": 39.098, "category": "alkali metal", "x": 1, "y": 4, "config": "[Ar] 4s¹", "en": 0.82 },
      { "number": 20, "symbol": "Ca", "name": "Calcium", "mass": 40.078, "category": "alkaline earth metal", "x": 2, "y": 4, "config": "[Ar] 4s²", "en": 1.00 },
    ];

    const [selectedElement, setSelectedElement] = useState(elements[0]);

    const categoryColors = {
      'diatomic nonmetal': 'bg-gradient-to-br from-green-400 to-green-500 hover:from-green-500 hover:to-green-600',
      'noble gas': 'bg-gradient-to-br from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600',
      'alkali metal': 'bg-gradient-to-br from-red-400 to-red-500 hover:from-red-500 hover:to-red-600',
      'alkaline earth metal': 'bg-gradient-to-br from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600',
      'metalloid': 'bg-gradient-to-br from-indigo-400 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600',
      'polyatomic nonmetal': 'bg-gradient-to-br from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600',
      'post-transition metal': 'bg-gradient-to-br from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600',
    };

    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border-2 border-red-100">
          <p className="text-sm text-gray-600 leading-relaxed">Click on any element to view detailed information about its properties.</p>
        </div>
        
        <div className="grid grid-cols-[repeat(18,minmax(0,1fr))] gap-2 text-xs md:text-sm">
          {elements.map(el => (
            <div
              key={el.number}
              onClick={() => setSelectedElement(el)}
              className={`p-3 text-center rounded-xl cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl text-white font-semibold ${categoryColors[el.category] || 'bg-gradient-to-br from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600'} ${selectedElement.number === el.number ? 'ring-4 ring-rose-400 scale-110 shadow-2xl' : 'shadow-lg'}`}
              style={{ gridColumn: el.x, gridRow: el.y }}
            >
              <div className="text-white/80 text-[0.7rem] sm:text-xs mb-1">{el.number}</div>
              <div className="font-bold text-sm sm:text-base">{el.symbol}</div>
              <div className="text-white/80 text-[0.6rem] sm:text-xs mt-1 truncate">{el.mass}</div>
            </div>
          ))}
        </div>
        
        {selectedElement && (
          <div className="p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-gray-200 animate-fade-in shadow-xl">
            <div className="flex items-center gap-6 mb-6">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl ${categoryColors[selectedElement.category]}`}>
                {selectedElement.symbol}
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">{selectedElement.name}</h3>
                <p className="text-lg text-gray-600">Atomic Number {selectedElement.number}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <p className="font-semibold text-blue-800 mb-1">Atomic Mass</p>
                <p className="text-xl font-bold text-blue-900">{selectedElement.mass} u</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                <p className="font-semibold text-purple-800 mb-1">Electron Config</p>
                <p className="text-lg font-mono text-purple-900">{selectedElement.config}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <p className="font-semibold text-green-800 mb-1">Electronegativity</p>
                <p className="text-xl font-bold text-green-900">{selectedElement.en || 'N/A'}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="font-semibold text-gray-700 mb-2">Category:</p>
              <span className={`inline-block px-4 py-2 rounded-full text-white font-semibold text-sm ${categoryColors[selectedElement.category]} shadow-lg`}>
                {selectedElement.category.replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Placeholder for additional calculators
  const PlaceholderCalculator = ({ name }) => (
    <div className="text-center py-16">
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg">
        <Calculator className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">{name}</h3>
      <p className="text-gray-500">This calculator is coming soon!</p>
    </div>
  );

  // Function to render the correct calculator based on state
  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'molarMass': return <MolarMassCalculator />;
      case 'molarity': return <MolarityCalculator />;
      case 'idealgas': return <IdealGasCalculator />;
      case 'ph': return <PHCalculator />;
      case 'periodicTable': return <PeriodicTable />;
      default: return <PlaceholderCalculator name={calculatorCategories[activeCategory]?.calculators[activeCalculator]?.name || 'Calculator'} />;
    }
  };

  const currentCategory = calculatorCategories[activeCategory] || calculatorCategories.basic;
  const currentCalculator = currentCategory.calculators[activeCalculator] || {};
  const CurrentIcon = currentCalculator.icon || Calculator;

  // Sidebar Component
  const Sidebar = ({ onSelectCalculator, onToggle }) => (
    <aside className={`fixed top-0 left-0 h-full z-30 bg-white/95 backdrop-blur-lg border-r border-gray-200/80 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-80 flex-shrink-0 flex flex-col shadow-xl md:shadow-none`}>
      <div className="p-6 flex items-center justify-between gap-3 border-b border-gray-200/80 flex-shrink-0 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <Beaker className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ChemCalc</h1>
            <p className="text-xs text-gray-500">Chemistry Calculator</p>
          </div>
        </div>
        <button onClick={onToggle} className="md:hidden p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>
      <nav className="flex-1 min-h-0 p-4 space-y-6 overflow-y-auto">
        {Object.entries(calculatorCategories).map(([key, category]) => {
          const CategoryIcon = category.icon;
          return (
            <div key={key} className="space-y-3">
              <h2 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 px-3 py-2 ${category.color} ${category.lightBg} rounded-lg border ${category.borderColor}`}>
                <CategoryIcon className="w-4 h-4" />
                {category.name}
              </h2>
              <ul className="space-y-1">
                {Object.entries(category.calculators).map(([calcKey, calc]) => {
                  const CalcIcon = calc.icon;
                  const isActive = activeCalculator === calcKey;
                  return (
                    <li key={calcKey}>
                      <button
                        onClick={() => onSelectCalculator(key, calcKey)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-300 ${isActive
                          ? `${category.bgColor} text-white shadow-lg transform scale-105`
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-md'
                          }`}
                      >
                        <CalcIcon className="w-5 h-5 flex-shrink-0" />
                        <span>{calc.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 font-sans flex text-gray-800">
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"></div>}

      <Sidebar
        onSelectCalculator={(catKey, calcKey) => {
          setActiveCategory(catKey);
          setActiveCalculator(calcKey);
          setSidebarOpen(false);
        }}
        onToggle={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen">
        <div className="flex-1 p-4 md:p-10 overflow-y-auto">
          {/* Mobile Header */}
          <header className="flex items-center gap-4 mb-8 md:hidden">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="p-3 text-gray-600 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Menu className="w-6 h-6" />
            </button>
          </header>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-lg p-8 sm:p-10 rounded-3xl shadow-2xl border border-gray-200/50">
              <div className="flex items-center gap-6 mb-8">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${currentCategory.bgColor} shadow-xl`}>
                  <CurrentIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                    {currentCalculator?.name || 'Calculator'}
                  </h2>
                  <p className={`font-semibold text-base sm:text-lg ${currentCategory.color}`}>{currentCategory.name}</p>
                </div>
              </div>
              {renderCalculator()}
            </div>

            <footer className="text-center mt-10 text-sm text-gray-400">
              <p className="flex items-center justify-center gap-2">
                Made with <Beaker className="w-4 h-4 text-blue-500" /> ChemCalculator &copy; 2025
              </p>
            </footer>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.4s ease-out forwards;
        }
        .prose code {
            font-size: 0.9em;
            padding: 0.2em 0.4em;
            margin: 0;
            border-radius: 6px;
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
            font-family: 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
            border: 1px solid rgba(59, 130, 246, 0.2);
        }
        .prose p {
            margin: 0.5em 0;
        }
        /* Custom scrollbar for webkit browsers */
        aside nav::-webkit-scrollbar {
          width: 6px;
        }
        aside nav::-webkit-scrollbar-track {
          background: rgba(241, 245, 249, 0.5);
        }
        aside nav::-webkit-scrollbar-thumb {
          background: rgba(203, 213, 225, 0.8);
          border-radius: 3px;
        }
        aside nav::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.9);
        }
        
        /* Glassmorphism effect */
        .glass {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
      `}</style>
    </div>
  );
};

export default App;