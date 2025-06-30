import React from 'react';
import { ProgressBar } from '../UI/ProgressBar';

interface ScoreChartProps {
  scores: {
    market: number;
    feasibility: number;
    competition: number;
    overall: number;
  };
}

export function ScoreChart({ scores }: ScoreChartProps) {
  const scoreItems = [
    { label: 'Market Potential', value: scores.market, color: 'blue' },
    { label: 'Feasibility', value: scores.feasibility, color: 'green' },
    { label: 'Competition', value: scores.competition, color: 'orange' },
    { label: 'Overall Score', value: scores.overall, color: 'purple' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-2xl font-bold mb-4">
          {scores.overall}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Overall Business Score</h3>
        <p className="text-sm text-gray-600">Based on comprehensive AI analysis</p>
      </div>
      
      <div className="space-y-4">
        {scoreItems.map((item) => (
          <div key={item.label}>
            <ProgressBar
              value={item.value}
              color={item.color}
              showLabel
              label={item.label}
              size="md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}