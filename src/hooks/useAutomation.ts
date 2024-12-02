import { useState, useCallback } from 'react';
import { AutomationStep, AutomationSequence } from '../types/automation';

export function useAutomation() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSequence, setCurrentSequence] = useState<AutomationStep[]>([]);
  const [savedSequences, setSavedSequences] = useState<AutomationSequence[]>([]);

  const startRecording = useCallback(() => {
    setIsRecording(true);
    setCurrentSequence([]);
  }, []);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
  }, []);

  const addStep = useCallback((step: Omit<AutomationStep, 'timestamp'>) => {
    if (!isRecording) return;
    
    setCurrentSequence(prev => [...prev, {
      ...step,
      timestamp: Date.now()
    }]);
  }, [isRecording]);

  const saveSequence = useCallback((name: string) => {
    setSavedSequences(prev => [...prev, {
      id: crypto.randomUUID(),
      name,
      steps: currentSequence,
      createdAt: Date.now()
    }]);
    setCurrentSequence([]);
  }, [currentSequence]);

  const playSequence = useCallback(async (sequence: AutomationStep[]) => {
    setIsPlaying(true);
    
    for (const step of sequence) {
      switch (step.type) {
        case 'click':
          if (step.selector) {
            const element = document.querySelector(step.selector);
            (element as HTMLElement)?.click();
          }
          break;
        case 'input':
          if (step.selector && step.value) {
            const element = document.querySelector(step.selector) as HTMLInputElement;
            if (element) {
              element.value = step.value;
              element.dispatchEvent(new Event('input'));
            }
          }
          break;
        case 'wait':
          await new Promise(resolve => setTimeout(resolve, 1000));
          break;
      }
    }
    
    setIsPlaying(false);
  }, []);

  return {
    isRecording,
    isPlaying,
    currentSequence,
    savedSequences,
    startRecording,
    stopRecording,
    addStep,
    saveSequence,
    playSequence
  };
}