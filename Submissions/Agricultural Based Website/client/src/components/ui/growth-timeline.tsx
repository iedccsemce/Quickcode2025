import { useState, useEffect } from 'react';
import { GrowthStage } from '@shared/schema';

interface GrowthTimelineProps {
  stages: GrowthStage[];
  totalDays: number;
}

const GrowthTimeline: React.FC<GrowthTimelineProps> = ({ stages, totalDays }) => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [activeStageData, setActiveStageData] = useState<GrowthStage | null>(null);
  
  useEffect(() => {
    if (stages && stages.length > 0) {
      setActiveStageData(stages[activeStage]);
    }
  }, [activeStage, stages]);
  
  if (!stages || stages.length === 0) {
    return <div className="p-4 text-center">No growth stages available</div>;
  }
  
  return (
    <div className="mt-8 relative">
      <div className="h-1 bg-gray-200 relative mx-5">
        <div 
          className="h-full bg-[#4F772D] absolute top-0 left-0"
          style={{ width: `${(stages[activeStage].dayEnd / totalDays) * 100}%` }}
        ></div>
        
        {stages.map((stage, index) => {
          const positionPercent = (stage.dayStart / totalDays) * 100;
          return (
            <button
              key={stage.id}
              className={`w-4 h-4 rounded-full bg-[#FFFBE6] border-2 border-[#4F772D] absolute top-0 transform -translate-y-1/2 -translate-x-1/2 transition-transform hover:scale-125 ${
                activeStage === index ? 'bg-[#4F772D]' : ''
              }`}
              style={{ left: `${positionPercent}%` }}
              onClick={() => setActiveStage(index)}
              aria-label={`View ${stage.stageName} stage`}
            />
          );
        })}
      </div>
      
      <div className="mt-6 grid grid-cols-6 text-xs text-center text-gray-600">
        {stages.map((stage) => (
          <div key={stage.id}>{stage.stageName}</div>
        ))}
      </div>
      
      {activeStageData && (
        <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-semibold text-[#2C5F2D] font-heading">{activeStageData.stageName} Stage</h4>
            <span className="text-sm text-gray-500">
              Days {activeStageData.dayStart}-{activeStageData.dayEnd}
            </span>
          </div>
          
          <div className="mt-4 grid md:grid-cols-3 gap-6">
            <div>
              <h5 className="font-semibold text-[#4F772D]">Appearance</h5>
              <p className="mt-1 text-gray-600 text-sm">
                {activeStageData.appearance}
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold text-[#4F772D]">Care & Nutrition</h5>
              <div className="mt-1 text-gray-600 text-sm space-y-1">
                {activeStageData.careInstructions?.split(',').map((instruction, i) => (
                  <div key={i}>• {instruction.trim()}</div>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-[#4F772D]">Common Issues</h5>
              <div className="mt-1 text-gray-600 text-sm space-y-1">
                {activeStageData.commonIssues?.split(',').map((issue, i) => (
                  <div key={i}>• {issue.trim()}</div>
                ))}
              </div>
            </div>
          </div>
          
          {activeStageData.tips && (
            <div className="mt-6">
              <h5 className="font-semibold text-[#4F772D]">Tips for Success</h5>
              <p className="mt-1 text-gray-600 text-sm">
                {activeStageData.tips}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GrowthTimeline;
