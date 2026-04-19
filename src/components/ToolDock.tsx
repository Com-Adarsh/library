import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Upload, X, Plus, Minus, Divide, Equal } from 'lucide-react';
import Link from 'next/link';

export default function ToolDock() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calculatorValue, setCalculatorValue] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);

  const handleNumberClick = (num: string) => {
    setCalculatorValue(calculatorValue === '0' ? num : calculatorValue + num);
  };

  const handleOperationClick = (op: string) => {
    if (previousValue === null) {
      setPreviousValue(parseFloat(calculatorValue));
      setCalculatorValue('0');
      setOperation(op);
    } else {
      calculate();
      setOperation(op);
    }
  };

  const calculate = () => {
    if (previousValue !== null && operation) {
      const current = parseFloat(calculatorValue);
      let result = 0;

      switch (operation) {
        case '+':
          result = previousValue + current;
          break;
        case '-':
          result = previousValue - current;
          break;
        case '*':
          result = previousValue * current;
          break;
        case '/':
          result = previousValue / current;
          break;
      }

      setCalculatorValue(result.toString());
      setPreviousValue(null);
      setOperation(null);
    }
  };

  const handleEquals = () => {
    calculate();
  };

  const handleClear = () => {
    setCalculatorValue('0');
    setPreviousValue(null);
    setOperation(null);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center gap-4 bg-white/95 backdrop-blur-lg rounded-full shadow-2xl border border-slate-gray/20 px-6 py-3">
        {/* Calculator Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
          className={`p-3 rounded-full transition-all ${
            isCalculatorOpen
              ? 'bg-emerald-500 text-white shadow-lg'
              : 'bg-slate-navy/10 text-slate-navy hover:bg-slate-navy/20'
          }`}
        >
          <Calculator size={20} />
        </motion.button>

        {/* Upload Button */}
        <Link href="/upload">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full bg-crimson text-white shadow-lg hover:shadow-xl transition-shadow"
          >
            <Upload size={20} />
          </motion.button>
        </Link>
      </div>

      {/* Calculator Modal */}
      <AnimatePresence>
        {isCalculatorOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-gray/20 p-6 w-80"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-navy font-inter">Scientific Calculator</h3>
              <button
                onClick={() => setIsCalculatorOpen(false)}
                className="p-2 hover:bg-slate-gray/10 rounded-full transition-colors"
              >
                <X size={20} className="text-slate-gray" />
              </button>
            </div>

            {/* Display */}
            <div className="bg-slate-navy text-white p-4 rounded-xl mb-4 text-right text-2xl font-mono">
              {calculatorValue}
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {/* Row 1 */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClear}
                className="col-span-2 bg-slate-gray text-white p-3 rounded-lg font-medium hover:bg-slate-gray/80 transition-colors"
              >
                Clear
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOperationClick('/')}
                className="bg-crimson text-white p-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                <Divide size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOperationClick('*')}
                className="bg-crimson text-white p-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                ×
              </motion.button>

              {/* Row 2 */}
              {[7, 8, 9].map((num) => (
                <motion.button
                  key={num}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNumberClick(num.toString())}
                  className="bg-slate-navy/10 text-slate-navy p-3 rounded-lg font-medium hover:bg-slate-navy/20 transition-colors"
                >
                  {num}
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOperationClick('-')}
                className="bg-crimson text-white p-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                <Minus size={16} />
              </motion.button>

              {/* Row 3 */}
              {[4, 5, 6].map((num) => (
                <motion.button
                  key={num}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNumberClick(num.toString())}
                  className="bg-slate-navy/10 text-slate-navy p-3 rounded-lg font-medium hover:bg-slate-navy/20 transition-colors"
                >
                  {num}
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOperationClick('+')}
                className="bg-crimson text-white p-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                <Plus size={16} />
              </motion.button>

              {/* Row 4 */}
              {[1, 2, 3].map((num) => (
                <motion.button
                  key={num}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNumberClick(num.toString())}
                  className="bg-slate-navy/10 text-slate-navy p-3 rounded-lg font-medium hover:bg-slate-navy/20 transition-colors"
                >
                  {num}
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEquals}
                className="bg-emerald-500 text-white p-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
              >
                <Equal size={16} />
              </motion.button>

              {/* Row 5 */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNumberClick('0')}
                className="col-span-2 bg-slate-navy/10 text-slate-navy p-3 rounded-lg font-medium hover:bg-slate-navy/20 transition-colors"
              >
                0
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNumberClick('.')}
                className="bg-slate-navy/10 text-slate-navy p-3 rounded-lg font-medium hover:bg-slate-navy/20 transition-colors"
              >
                .
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}