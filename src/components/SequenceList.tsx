import React from 'react';
import { Play, Trash2 } from 'lucide-react';
import { AutomationSequence } from '../types/automation';

interface SequenceListProps {
  sequences: AutomationSequence[];
  onPlay: (sequence: AutomationSequence) => void;
  onDelete: (id: string) => void;
}

export function SequenceList({ sequences, onPlay, onDelete }: SequenceListProps) {
  return (
    <div className="fixed right-4 top-4 w-72 bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Saved Sequences</h2>
      {sequences.length === 0 ? (
        <p className="text-gray-500 text-sm">No saved sequences yet</p>
      ) : (
        <ul className="space-y-2">
          {sequences.map((sequence) => (
            <li
              key={sequence.id}
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
            >
              <span className="text-sm font-medium">{sequence.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => onPlay(sequence)}
                  className="p-1 rounded-full hover:bg-green-100 text-green-600"
                >
                  <Play className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(sequence.id)}
                  className="p-1 rounded-full hover:bg-red-100 text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}