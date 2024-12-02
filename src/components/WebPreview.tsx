import React from 'react';
import { Globe } from 'lucide-react';

interface WebPreviewProps {
  url: string;
}

export function WebPreview({ url }: WebPreviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 min-h-[400px] relative">
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
        <Globe className="w-16 h-16 text-gray-300 mb-4" />
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Preview Not Available</h3>
          <p className="text-gray-500 max-w-md">
            Due to security restrictions, we can't display the website directly. 
            Your automation sequence will be saved and can be exported for use with browser automation tools.
          </p>
          {url && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700">Target URL:</p>
              <p className="text-gray-600 break-all">{url}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}