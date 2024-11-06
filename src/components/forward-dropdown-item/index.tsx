'use client';

import { DropdownMenuItem } from '../ui/dropdown-menu';

interface ForwardDropdownProps {
  children: React.ReactNode;
  url: string;
}

export function ForwardDropdownItem({ children, url }: ForwardDropdownProps) {
  const handleOpenLink = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return <DropdownMenuItem onClick={handleOpenLink}>{children}</DropdownMenuItem>;
}
