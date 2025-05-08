'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { EmotionDisplay } from './EmotionDisplay';

export const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [emotion, setEmotion] = useState('normal');
  const [bgColor, setBgColor] = useState('bg-white');

  const updateBackgroundColor = useCallback((expr: string) => {
    if (expr.length > 15) {
      setBgColor('bg-red-50');
    } else if (expr.length > 10) {
      setBgColor('bg-yellow-50');
    } else if (expr.length > 5) {
      setBgColor('bg-blue-50');
    } else {
      setBgColor('bg-white');
    }
  }, []);

  const updateEmotion = useCallback((expr: string) => {
    if (expr.length > 15) {
      setEmotion('stressed');
    } else if (expr.includes('Error')) {
      setEmotion('confused');
    } else if (expr.length > 8) {
      setEmotion('thinking');
    } else {
      setEmotion('happy');
    }
    updateBackgroundColor(expr);
  }, [updateBackgroundColor]);

  const handleNumber = useCallback((num: string) => {
    if (display === '0') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
    setExpression(expression + num);
    updateEmotion(expression + num);
  }, [display, expression, updateEmotion]);

  const handleOperator = useCallback((op: string) => {
    setDisplay('0');
    setExpression(expression + ' ' + op + ' ');
    updateEmotion(expression + op);
  }, [expression, updateEmotion]);

  const calculate = useCallback(() => {
    try {
      const result = eval(expression);
      setDisplay(result.toString());
      setExpression(result.toString());
      
      if (result === 0) {
        setEmotion('neutral');
      } else if (result > 0) {
        setEmotion('happy');
      } else {
        setEmotion('sad');
      }
    } catch {
        setDisplay('Error');
        setExpression('Error');
        setEmotion('confused');
      }
  }, [expression]);

  const clear = useCallback(() => {
    setDisplay('0');
    setExpression('');
    setEmotion('normal');
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      
      if (/^[0-9.]$/.test(key)) {
        handleNumber(key);
      }
      else if (['+', '-', '*', '/'].includes(key)) {
        handleOperator(key);
      }
      else if (key === 'Enter') {
        calculate();
      }
      else if (key === 'Backspace') {
        if (display.length > 1) {
          const newDisplay = display.slice(0, -1);
          setDisplay(newDisplay);
          setExpression(newDisplay);
          updateEmotion(newDisplay);
        } else {
          setDisplay('0');
          setExpression('');
          setEmotion('normal');
        }
      }
      else if (key === 'Escape') {
        clear();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [display, expression, handleNumber, handleOperator, calculate, clear, updateEmotion]);

  return (
    <div className={`w-80 mx-auto mt-10 p-4 ${bgColor} rounded-xl shadow-2xl transition-colors duration-300`}>
      <EmotionDisplay emotion={emotion} />
      <div className="bg-gray-100 p-4 rounded-lg mb-4 text-right text-2xl overflow-hidden">
        <div className="overflow-x-auto whitespace-nowrap scrollbar-hide" style={{
          textOverflow: 'ellipsis',
          direction: 'rtl',
          paddingLeft: '8px',
          paddingRight: '8px'
        }}>
          {display}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button onClick={clear} className="col-span-2 bg-red-400 p-4 rounded-lg text-white hover:bg-red-500">
          AC
        </button>
        <button onClick={() => handleOperator('/')} className="bg-blue-400 p-4 rounded-lg text-white hover:bg-blue-500">
          ÷
        </button>
        <button onClick={() => handleOperator('*')} className="bg-blue-400 p-4 rounded-lg text-white hover:bg-blue-500">
          ×
        </button>
        {[7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumber(num.toString())}
            className="bg-gray-200 p-4 rounded-lg hover:bg-gray-300"
          >
            {num}
          </button>
        ))}
        <button onClick={() => handleOperator('-')} className="bg-blue-400 p-4 rounded-lg text-white hover:bg-blue-500">
          -
        </button>
        {[4, 5, 6].map((num) => (
          <button
            key={num}
            onClick={() => handleNumber(num.toString())}
            className="bg-gray-200 p-4 rounded-lg hover:bg-gray-300"
          >
            {num}
          </button>
        ))}
        <button onClick={() => handleOperator('+')} className="bg-blue-400 p-4 rounded-lg text-white hover:bg-blue-500">
          +
        </button>
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => handleNumber(num.toString())}
            className="bg-gray-200 p-4 rounded-lg hover:bg-gray-300"
          >
            {num}
          </button>
        ))}
        <button onClick={calculate} className="bg-green-400 p-4 rounded-lg text-white hover:bg-green-500">
          =
        </button>
        <button
          onClick={() => handleNumber('0')}
          className="col-span-2 bg-gray-200 p-4 rounded-lg hover:bg-gray-300"
        >
          0
        </button>
        <button onClick={() => handleNumber('.')} className="bg-gray-200 p-4 rounded-lg hover:bg-gray-300">
          .
        </button>
      </div>
    </div>
  );
}; 