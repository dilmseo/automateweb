import { useState, useCallback } from 'react';
import { AutomationSequence } from '../types/automation';

const STORAGE_KEY = 'saved_sequences';

export function useSequenceStorage() {
  const [sequences, setSequences] = useState<AutomationSequence[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const saveToStorage = useCallback((sequences: AutomationSequence[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sequences));
    setSequences(sequences);
  }, []);

  const addSequence = useCallback((sequence: AutomationSequence) => {
    const newSequences = [...sequences, sequence];
    saveToStorage(newSequences);
  }, [sequences, saveToStorage]);

  const deleteSequence = useCallback((id: string) => {
    const newSequences = sequences.filter(seq => seq.id !== id);
    saveToStorage(newSequences);
  }, [sequences, saveToStorage]);

  return {
    sequences,
    addSequence,
    deleteSequence
  };
}