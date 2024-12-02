import React, { useState } from 'react';
import { useAutomation } from './hooks/useAutomation';
import { ControlPanel } from './components/ControlPanel';
import { SequenceList } from './components/SequenceList';
import { AutomationSequence } from './types/automation';

function App() {
  const [url, setUrl] = useState('');
  const {
    isRecording,
    isPlaying,
    savedSequences,
    startRecording,
    stopRecording,
    saveSequence,
    playSequence
  } = useAutomation();

  const handleDeleteSequence = (id: string) => {
    // Implementation would go here
  };

  const handlePlaySequence = (sequence: AutomationSequence) => {
    playSequence(sequence.steps);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <h1 className="text-2xl font-bold mb-4">Web Automation Tool</h1>
          <div className="flex gap-2">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 min-h-[400px]">
          {url ? (
            <iframe
              src={url}
              className="w-full h-full border-0"
              title="Automation preview"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Enter a URL to begin
            </div>
          )}
        </div>
      </div>

      <ControlPanel
        isRecording={isRecording}
        isPlaying={isPlaying}
        onStartRecording={startRecording}
        onStopRecording={stopRecording}
        onSaveSequence={saveSequence}
        disabled={!url}
      />

      <SequenceList
        sequences={savedSequences}
        onPlay={handlePlaySequence}
        onDelete={handleDeleteSequence}
      />
    </div>
  );
}

export default App;