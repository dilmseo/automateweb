import React from 'react';
import { X } from 'lucide-react';
import { AutomationStep } from '../types/automation';

interface CurrentSequenceProps {
  steps: AutomationStep[];
  onRemoveStep: (index: number) => void;
  visible: boolean;
}

export function CurrentSequence({ steps, onRemoveStep, visible }: CurrentSequenceProps) {
  if (!visible || steps.length === 0) return null;

  return (
    <div className="fixed left-20 top-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-4 w-64">
      <h3 className="text-sm font-semibold mb-3">Current Sequence</h3>
      <ul className="space-y-2">
        {steps.map((step, index) => (
          <li key={index} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
            <span className="flex-1">
              {step.type === 'click' && `Click ${step.selector}`}
              {step.type === 'input' && `Type "${step.value}" in ${step.selector}`}
              {step.type === 'wait' && 'Wait 1s'}
            </span>
            <button
              onClick={() => onRemoveStep(index)}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}