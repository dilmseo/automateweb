import React from 'react';
import { MousePointer, Keyboard, Timer } from 'lucide-react';
import { AutomationStep } from '../types/automation';
import { STEP_TYPES, SELECTOR_EXAMPLES } from '../constants/automation';
import { isValidSelector } from '../utils/validation';

interface ActionRecorderProps {
  onAddStep: (step: Omit<AutomationStep, 'timestamp'>) => void;
  disabled?: boolean;
}

export function ActionRecorder({ onAddStep, disabled }: ActionRecorderProps) {
  const handleAddClick = () => {
    const selector = prompt(`Enter element selector (e.g., ${SELECTOR_EXAMPLES.CLICK}):`);
    if (selector && isValidSelector(selector)) {
      onAddStep({
        type: STEP_TYPES.CLICK,
        selector
      });
    } else if (selector) {
      alert('Invalid selector. Please check the syntax and try again.');
    }
  };

  const handleAddInput = () => {
    const selector = prompt(`Enter input selector (e.g., ${SELECTOR_EXAMPLES.INPUT}):`);
    if (!selector) return;
    
    if (!isValidSelector(selector)) {
      alert('Invalid selector. Please check the syntax and try again.');
      return;
    }

    const value = prompt('Enter value to type:');
    if (value) {
      onAddStep({
        type: STEP_TYPES.INPUT,
        selector,
        value
      });
    }
  };

  const handleAddWait = () => {
    onAddStep({
      type: STEP_TYPES.WAIT
    });
  };

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-2 flex flex-col gap-2">
      <button
        onClick={handleAddClick}
        disabled={disabled}
        className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 disabled:opacity-50"
        title="Add Click Action"
      >
        <MousePointer className="w-6 h-6" />
      </button>
      <button
        onClick={handleAddInput}
        disabled={disabled}
        className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 disabled:opacity-50"
        title="Add Input Action"
      >
        <Keyboard className="w-6 h-6" />
      </button>
      <button
        onClick={handleAddWait}
        disabled={disabled}
        className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 disabled:opacity-50"
        title="Add Wait Action"
      >
        <Timer className="w-6 h-6" />
      </button>
    </div>
  );
}