"use client";
import { memo } from 'react';
import { LucideIcon } from 'lucide-react';

interface ViewModeButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  isActive: boolean;
  title: string;
}

const ViewModeButton = memo(function ViewModeButton({ 
  icon: Icon, 
  onClick, 
  isActive, 
  title 
}: ViewModeButtonProps) {
  return (
    <button 
      onClick={onClick} 
      className={`p-2 rounded hover:bg-neutral-700 transition-colors ${
        isActive ? 'bg-neutral-700' : ''
      }`}
      title={title}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
})

export default ViewModeButton;