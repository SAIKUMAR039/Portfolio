import { Button } from "@/components/ui/button";
import { SOCIALS } from "@/lib/constants";

export function SocialLinks() {
  return (
    <div className="flex gap-4 justify-center">
      {SOCIALS.map(({ id, Icon, uri, color }) => (
        <Button
          key={id}
          variant="outline"
          size="icon"
          className="hover:scale-110 transition-transform"
          asChild
        >
          <a
            href={uri}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={id}
            style={{ 
              "--hover-color": color 
            } as React.CSSProperties}
            className="hover:text-[var(--hover-color)] transition-colors"
          >
            <Icon size={24} />
          </a>
        </Button>
      ))}
    </div>
  );
}