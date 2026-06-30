import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SocialLinkProps {
  icon: LucideIcon;
  href: string;
  label: string;
}

export const SocialLink: React.FC<SocialLinkProps> = ({ icon: Icon, href, label }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-muted-foreground hover:text-primary transition-colors">
      <Icon className="h-6 w-6" />
    </a>
  );
};