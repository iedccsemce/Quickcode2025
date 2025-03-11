interface NutrientBarProps {
  label: string;
  value: number;
  max?: number;
}

const NutrientBar: React.FC<NutrientBarProps> = ({ label, value, max = 100 }) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-600">{label}</span>
        <div className="w-16 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-[#4F772D] rounded-full h-2" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default NutrientBar;
