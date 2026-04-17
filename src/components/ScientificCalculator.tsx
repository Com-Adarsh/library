import { useState, useEffect, useRef } from 'react';
import { Delete, RotateCcw } from 'lucide-react';

interface CalculatorState {
  display: string;
  history: string[];
  previousValue: number | null;
  operation: string | null;
  waitingForNewValue: boolean;
}

const CONSTANTS = {
  π: Math.PI,
  e: Math.E,
};

const OPERATIONS = {
  '+': (a: number, b: number) => a + b,
  '−': (a: number, b: number) => a - b,
  '×': (a: number, b: number) => a * b,
  '÷': (a: number, b: number) => a / b,
  '^': (a: number, b: number) => Math.pow(a, b),
};

const FUNCTIONS: { [key: string]: (x: number) => number } = {
  'sin': Math.sin,
  'cos': Math.cos,
  'tan': Math.tan,
  'asin': Math.asin,
  'acos': Math.acos,
  'atan': Math.atan,
  'ln': Math.log,
  'log': Math.log10,
  'log₂': Math.log2,
  '√': Math.sqrt,
  '∛': (x: number) => Math.cbrt(x),
  '!': (n: number) => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  },
};

export default function ScientificCalculator({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    history: [],
    previousValue: null,
    operation: null,
    waitingForNewValue: false,
  });

  const displayRef = useRef<HTMLDivElement>(null);

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (/\d/.test(e.key)) handleNumber(e.key);
      if (['+', '-', '*', '/', '^'].includes(e.key)) {
        const op = e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key === '-' ? '−' : e.key;
        handleOperation(op);
      }
      if (e.key === 'Enter') handleEquals();
      if (e.key === 'Backspace') handleDelete();
      if (e.key === '.') handleDecimal();
      if (e.key === 'Escape') handleClear();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [state]);

  const handleNumber = (num: string) => {
    setState(prev => ({
      ...prev,
      display:
        prev.waitingForNewValue || prev.display === '0'
          ? num
          : prev.display + num,
      waitingForNewValue: false,
    }));
  };

  const handleDecimal = () => {
    setState(prev => {
      if (prev.waitingForNewValue) return { ...prev, display: '0.', waitingForNewValue: false };
      if (prev.display.includes('.')) return prev;
      return { ...prev, display: prev.display + '.' };
    });
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(state.display);

    if (state.previousValue === null) {
      setState(prev => ({
        ...prev,
        previousValue: current,
        operation: op,
        waitingForNewValue: true,
      }));
    } else if (state.operation && !state.waitingForNewValue) {
      const result = performOperation(
        state.previousValue,
        current,
        state.operation
      );
      setState(prev => ({
        ...prev,
        display: formatDisplay(result),
        previousValue: result,
        operation: op,
        waitingForNewValue: true,
      }));
    }
  };

  const handleFunction = (func: string) => {
    const current = parseFloat(state.display);
    const result = FUNCTIONS[func](current);
    setState(prev => ({
      ...prev,
      display: formatDisplay(result),
      waitingForNewValue: true,
      history: [...prev.history, `${func}(${current}) = ${formatDisplay(result)}`],
    }));
  };

  const handleConstant = (constant: string) => {
    const value = CONSTANTS[constant as keyof typeof CONSTANTS];
    setState(prev => ({
      ...prev,
      display: formatDisplay(value),
      waitingForNewValue: true,
    }));
  };

  const handleEquals = () => {
    if (state.operation && state.previousValue !== null) {
      const current = parseFloat(state.display);
      const result = performOperation(state.previousValue, current, state.operation);
      setState(prev => ({
        ...prev,
        display: formatDisplay(result),
        previousValue: null,
        operation: null,
        waitingForNewValue: true,
        history: [...prev.history, `${prev.previousValue} ${prev.operation} ${current} = ${formatDisplay(result)}`],
      }));
    }
  };

  const handleDelete = () => {
    setState(prev => {
      const newDisplay = prev.display.slice(0, -1) || '0';
      return { ...prev, display: newDisplay };
    });
  };

  const handleClear = () => {
    setState({
      display: '0',
      history: [],
      previousValue: null,
      operation: null,
      waitingForNewValue: false,
    });
  };

  const performOperation = (a: number, b: number, op: string): number => {
    return (OPERATIONS[op as keyof typeof OPERATIONS]?.(a, b) ?? 0);
  };

  const formatDisplay = (num: number): string => {
    if (!isFinite(num)) return 'Error';
    if (Number.isInteger(num)) return num.toString();
    return parseFloat(num.toFixed(8)).toString();
  };

  if (compact) {
    return (
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-gradient-to-br from-slate-navy to-slate-800 rounded-lg p-4 shadow-2xl">
          {/* Display */}
          <div
            ref={displayRef}
            className="bg-black/30 text-right text-4xl font-mono text-crimson font-bold p-4 rounded mb-4 overflow-hidden"
          >
            {state.display}
          </div>

          {/* Basic Buttons */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            {['7', '8', '9'].map(n => (
              <button key={n} onClick={() => handleNumber(n)} className="btn-calc">
                {n}
              </button>
            ))}
            <button onClick={() => handleOperation('÷')} className="btn-calc bg-crimson/20 text-crimson font-bold">
              ÷
            </button>

            {['4', '5', '6'].map(n => (
              <button key={n} onClick={() => handleNumber(n)} className="btn-calc">
                {n}
              </button>
            ))}
            <button onClick={() => handleOperation('×')} className="btn-calc bg-crimson/20 text-crimson font-bold">
              ×
            </button>

            {['1', '2', '3'].map(n => (
              <button key={n} onClick={() => handleNumber(n)} className="btn-calc">
                {n}
              </button>
            ))}
            <button onClick={() => handleOperation('−')} className="btn-calc bg-crimson/20 text-crimson font-bold">
              −
            </button>

            <button onClick={() => handleNumber('0')} className="btn-calc col-span-2">
              0
            </button>
            <button onClick={handleDecimal} className="btn-calc">
              .
            </button>
            <button onClick={() => handleOperation('+')} className="btn-calc bg-crimson/20 text-crimson font-bold">
              +
            </button>
          </div>

          {/* Functions Row */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            <button onClick={() => handleFunction('√')} className="btn-calc-sm text-xs">
              √
            </button>
            <button onClick={() => handleFunction('sin')} className="btn-calc-sm text-xs">
              sin
            </button>
            <button onClick={() => handleFunction('cos')} className="btn-calc-sm text-xs">
              cos
            </button>
            <button onClick={() => handleFunction('ln')} className="btn-calc-sm text-xs">
              ln
            </button>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button onClick={handleDelete} className="btn-calc bg-amber-500/20 text-amber-600 flex items-center justify-center gap-1 text-sm">
              <Delete className="w-4 h-4" /> DEL
            </button>
            <button onClick={handleEquals} className="btn-calc bg-emerald/20 text-emerald font-bold col-span-1">
              =
            </button>
            <button onClick={handleClear} className="btn-calc bg-red-500/20 text-red-600 flex items-center justify-center gap-1 text-sm">
              <RotateCcw className="w-4 h-4" /> C
            </button>
          </div>

          <style jsx>{`
            .btn-calc {
              @apply bg-slate-700 text-ghost-white font-bold py-3 px-2 rounded hover:bg-slate-600 active:scale-95 transition-all duration-100 text-lg;
            }
            .btn-calc-sm {
              @apply bg-slate-700 text-ghost-white font-bold py-2 px-1 rounded hover:bg-slate-600 active:scale-95 transition-all duration-100;
            }
          `}</style>
        </div>
      </div>
    );
  }

  // Full page version
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-slate-navy to-slate-800 rounded-xl p-6 shadow-2xl">
        {/* Display */}
        <div
          ref={displayRef}
          className="bg-black/40 text-right text-5xl font-mono text-crimson font-bold p-6 rounded-lg mb-6 overflow-hidden border border-crimson/20"
        >
          {state.display}
        </div>

        {/* Number Pad & Operations */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          {/* First Row */}
          {['7', '8', '9', '÷', '√'].map((btn, i) => (
            <button
              key={i}
              onClick={() => {
                if (btn === '÷') handleOperation('÷');
                else if (btn === '√') handleFunction('√');
                else handleNumber(btn);
              }}
              className={`btn-full ${['÷', '√'].includes(btn) ? 'bg-crimson/20 text-crimson' : ''}`}
            >
              {btn}
            </button>
          ))}

          {/* Second Row */}
          {['4', '5', '6', '×', '^'].map((btn, i) => (
            <button
              key={i}
              onClick={() => {
                if (btn === '×') handleOperation('×');
                else if (btn === '^') handleOperation('^');
                else handleNumber(btn);
              }}
              className={`btn-full ${['×', '^'].includes(btn) ? 'bg-crimson/20 text-crimson' : ''}`}
            >
              {btn}
            </button>
          ))}

          {/* Third Row */}
          {['1', '2', '3', '−', '∛'].map((btn, i) => (
            <button
              key={i}
              onClick={() => {
                if (btn === '−') handleOperation('−');
                else if (btn === '∛') handleFunction('∛');
                else handleNumber(btn);
              }}
              className={`btn-full ${['−', '∛'].includes(btn) ? 'bg-crimson/20 text-crimson' : ''}`}
            >
              {btn}
            </button>
          ))}

          {/* Fourth Row */}
          <button onClick={() => handleNumber('0')} className="btn-full col-span-2">
            0
          </button>
          <button onClick={handleDecimal} className="btn-full">
            .
          </button>
          <button onClick={() => handleOperation('+')} className="btn-full bg-crimson/20 text-crimson col-span-2">
            +
          </button>
        </div>

        {/* Trigonometric & Logarithmic Functions */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          {['sin', 'cos', 'tan', 'log', 'ln'].map(func => (
            <button
              key={func}
              onClick={() => handleFunction(func)}
              className="btn-full bg-emerald/10 text-emerald hover:bg-emerald/20 text-sm font-semibold"
            >
              {func}
            </button>
          ))}
        </div>

        {/* Inverse & Constants */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          {['asin', 'acos', 'atan', '!', 'π'].map(btn => (
            <button
              key={btn}
              onClick={() => {
                if (['asin', 'acos', 'atan', '!'].includes(btn)) handleFunction(btn);
                else handleConstant(btn);
              }}
              className="btn-full bg-blue/10 text-blue hover:bg-blue/20 text-sm font-semibold"
            >
              {btn}
            </button>
          ))}
        </div>

        {/* Constants & Actions */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          {['e', 'log₂', '()', '+/−', '='].map(btn => (
            <button
              key={btn}
              onClick={() => {
                if (btn === 'e') handleConstant('e');
                else if (btn === 'log₂') handleFunction('log₂');
                else if (btn === '=') handleEquals();
                else if (btn === '+/−') {
                  const current = parseFloat(state.display);
                  setState(prev => ({
                    ...prev,
                    display: formatDisplay(-current),
                  }));
                }
              }}
              className={`btn-full text-sm font-semibold ${
                btn === '=' ? 'bg-emerald/20 text-emerald col-span-2 text-lg' : 'bg-blue/10 text-blue hover:bg-blue/20'
              }`}
            >
              {btn}
            </button>
          ))}
        </div>

        {/* Clear & Delete */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={handleDelete}
            className="btn-full bg-amber-500/20 text-amber-600 hover:bg-amber-500/30 font-bold flex items-center justify-center gap-2"
          >
            <Delete className="w-5 h-5" /> DEL
          </button>
          <button
            onClick={handleEquals}
            className="btn-full bg-emerald/20 text-emerald hover:bg-emerald/30 font-bold text-lg"
          >
            =
          </button>
          <button
            onClick={handleClear}
            className="btn-full bg-red-500/20 text-red-600 hover:bg-red-500/30 font-bold flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" /> CLR
          </button>
        </div>

        {/* History */}
        {state.history.length > 0 && (
          <div className="mt-6 bg-black/20 rounded-lg p-4 max-h-32 overflow-y-auto">
            <p className="text-xs text-ghost-white/60 font-bold mb-2">CALCULATION HISTORY</p>
            <div className="text-xs text-ghost-white/80 space-y-1 font-mono">
              {state.history.slice(-5).map((item, i) => (
                <div key={i} className="text-ghost-white/70">{item}</div>
              ))}
            </div>
          </div>
        )}

        {/* Keyboard Hint */}
        <p className="text-xs text-ghost-white/50 mt-4 text-center">
          💡 Keyboard shortcut: Enter = Calculate, Backspace = Delete, Esc = Clear
        </p>

        <style jsx>{`
          .btn-full {
            @apply bg-slate-700 text-ghost-white font-bold py-4 px-2 rounded-lg hover:bg-slate-600 active:scale-95 transition-all duration-100 text-lg font-mono;
          }
        `}</style>
      </div>
    </div>
  );
}
