import React from 'react';
import { IconType } from 'react-icons';

interface IconProps {
  icon: IconType;
  size?: number;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ icon: IconComponent, size = 24, className }) => {
  const IconElement = IconComponent as React.ComponentType<{ size?: number; className?: string }>;
  return <IconElement size={size} className={className} />;
};

export default Icon; 