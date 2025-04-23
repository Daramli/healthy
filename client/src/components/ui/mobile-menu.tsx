import { Link } from "wouter";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  items: { href: string; label: string }[];
}

export function MobileMenu({ isOpen, items }: MobileMenuProps) {
  return (
    <div 
      className={cn(
        "md:hidden mt-3 pb-3 space-y-2", 
        isOpen ? "block" : "hidden"
      )}
    >
      {items.map(item => (
        <Link 
          key={item.href}
          href={item.href}
          className="block py-2 font-medium text-primary hover:text-accent transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
