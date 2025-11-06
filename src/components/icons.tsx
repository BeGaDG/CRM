import type { SVGProps } from "react";

export function SolYCieloLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...props}
    >
      <rect width="100" height="100" rx="20" fill="hsl(var(--primary))" />
      <text
        x="50"
        y="50"
        fontFamily="Arial, sans-serif"
        fontSize="40"
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        S&C
      </text>
    </svg>
  );
}
