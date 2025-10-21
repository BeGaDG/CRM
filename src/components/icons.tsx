import type { SVGProps } from "react";

export function SolYCieloLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 18a6 6 0 0 0 6-6 6 6 0 0 0-6-6 6 6 0 0 0-6 6 6 6 0 0 0 6 6Z" fill="hsl(var(--accent))" stroke="none" />
      <path d="M12 2v2" stroke="hsl(var(--primary))" />
      <path d="M12 20v2" stroke="hsl(var(--primary))" />
      <path d="m4.93 4.93 1.41 1.41" stroke="hsl(var(--primary))" />
      <path d="m17.66 17.66 1.41 1.41" stroke="hsl(var(--primary))" />
      <path d="M2 12h2" stroke="hsl(var(--primary))" />
      <path d="M20 12h2" stroke="hsl(var(--primary))" />
      <path d="m6.34 17.66-1.41 1.41" stroke="hsl(var(--primary))" />
      <path d="m19.07 4.93-1.41 1.41" stroke="hsl(var(--primary))" />
    </svg>
  );
}
