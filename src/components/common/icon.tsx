import { LucideProps, icons } from "lucide-react";

interface IconProps extends LucideProps {
  name: keyof typeof icons;
}

const Icon = ({ name, color, size, className }: IconProps) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} className={className} />;
};

export default Icon;
