import { useState, useCallback } from 'react';
import { AutomationStep, AutomationSequence } from '../types/automation';
import { useSequenceStorage } from './useSequenceStorage';
import { wait } from '../utils/time';
import { WAIT_DURATION } from '../constants/automation';

export function useAutomation() {
  // Group all useState hooks together at the top
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSequence, setCurrentSequence] = useState<AutomationStep[]>([]);
  
  // Custom hooks after useState hooks
  const { sequences, addSequence, deleteSequence } = useSequenceStorage();

  // Group all useCallback hooks together
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

  const removeStep = useCallback((index: number) => {
    setCurrentSequence(prev => prev.filter((_, i) => i !== index));
  }, []);

  const saveSequence = useCallback((name: string) => {
    const sequence: AutomationSequence = {
      id: crypto.randomUUID(),
      name,
      steps: currentSequence,
      createdAt: Date.now()
    };
    addSequence(sequence);
    setCurrentSequence([]);
    setIsRecording(false);
  }, [currentSequence, addSequence]);

  const playSequence = useCallback(async (steps: AutomationStep[]) => {
    setIsPlaying(true);
    try {
      for (const step of steps) {
        switch (step.type) {
          case 'wait':
            await wait(WAIT_DURATION);
            break;
          case 'click':
          case 'input':
          case 'scroll':
            console.log('Executing step:', step);
            await wait(100);
            break;
        }
      }
    } finally {
      setIsPlaying(false);
    }
  }, []);

  return {
    isRecording,
    isPlaying,
    currentSequence,
    sequences,
    startRecording,
    stopRecording,
    addStep,
    removeStep,
    saveSequence,
    playSequence,
    deleteSequence
  };
}