import { Badge } from "./badge";

interface MarketDemandBadgeProps {
  demand: string;
  className?: string;
}

const MarketDemandBadge: React.FC<MarketDemandBadgeProps> = ({ demand, className = "" }) => {
  const getBadgeColor = () => {
    switch (demand.toLowerCase()) {
      case 'high':
        return 'bg-[#B33030] hover:bg-[#B33030]/80';
      case 'medium':
        return 'bg-[#F0A500] hover:bg-[#F0A500]/80';
      case 'low':
        return 'bg-[#7D8F69] hover:bg-[#7D8F69]/80';
      default:
        return 'bg-gray-500 hover:bg-gray-500/80';
    }
  };

  const getLabel = () => {
    return `${demand.charAt(0).toUpperCase() + demand.slice(1)} Demand`;
  };

  return (
    <Badge className={`${getBadgeColor()} text-white font-medium ${className}`}>
      {getLabel()}
    </Badge>
  );
};

export default MarketDemandBadge;
