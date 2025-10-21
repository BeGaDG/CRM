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
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="hsl(var(--primary))" stroke="none" />
        <path d="M12 14c-3.87 0-7 3.13-7 7h14c0-3.87-3.13-7-7-7z" fill="hsl(var(--primary))" stroke="none" opacity="0.6"/>
    </svg>
  );
}