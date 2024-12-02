import React from 'react';
import { Play, Square, Circle, Save } from 'lucide-react';

interface ControlPanelProps {
  isRecording: boolean;
  isPlaying: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onSaveSequence: (name: string) => void;
  disabled?: boolean;
}

export function ControlPanel({
  isRecording,
  isPlaying,
  onStartRecording,
  onStopRecording,
  onSaveSequence,
  disabled
}: ControlPanelProps) {
  const handleSave = () => {
    const name = prompt('Enter a name for this sequence:');
    if (name) {
      onSaveSequence(name);
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg px-6 py-3 flex gap-4">
      {isRecording ? (
        <button
          onClick={onStopRecording}
          className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
          disabled={disabled}
        >
          <Square className="w-6 h-6" />
        </button>
      ) : (
        <button
          onClick={onStartRecording}
          className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
          disabled={disabled || isPlaying}
        >
          <Circle className="w-6 h-6" />
        </button>
      )}
      
      {isRecording && (
        <button
          onClick={handleSave}
          className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
        >
          <Save className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}