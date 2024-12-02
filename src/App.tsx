import React, { useState, useCallback } from 'react';
import { useAutomation } from './hooks/useAutomation';
import { ControlPanel } from './components/ControlPanel';
import { SequenceList } from './components/SequenceList';
import { WebPreview } from './components/WebPreview';
import { ActionRecorder } from './components/ActionRecorder';
import { CurrentSequence } from './components/CurrentSequence';
import { AutomationSequence } from './types/automation';
import { isValidUrl } from './utils/validation';

function App() {
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  
  const {
    isRecording,
    isPlaying,
    currentSequence,
    sequences,
    startRecording,
    stopRecording,
    saveSequence,
    playSequence,
    addStep,
    removeStep,
    deleteSequence
  } = useAutomation();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    setUrlError(newUrl && !isValidUrl(newUrl) ? 'Please enter a valid URL' : '');
  };

  const handlePlaySequence = useCallback((sequence: AutomationSequence) => {
    playSequence(sequence.steps);
  }, [playSequence]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <h1 className="text-2xl font-bold mb-4">Web Automation Tool</h1>
          <div className="flex flex-col gap-2">
            <input
              type="url"
              value={url}
              onChange={handleUrlChange}
              placeholder="Enter website URL"
              className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                urlError ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {urlError && (
              <p className="text-red-500 text-sm">{urlError}</p>
            )}
          </div>
        </div>

        <WebPreview url={url} />
      </div>

      <ActionRecorder 
        onAddStep={addStep}
        disabled={!isRecording || !url || !!urlError}
      />

      <CurrentSequence
        steps={currentSequence}
        onRemoveStep={removeStep}
        visible={isRecording}
      />

      <ControlPanel
        isRecording={isRecording}
        isPlaying={isPlaying}
        onStartRecording={startRecording}
        onStopRecording={stopRecording}
        onSaveSequence={saveSequence}
        disabled={!url || !!urlError}
      />

      <SequenceList
        sequences={sequences}
        onPlay={handlePlaySequence}
        onDelete={deleteSequence}
      />
    </div>
  );
}

export default App;