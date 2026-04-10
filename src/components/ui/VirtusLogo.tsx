export function VirtusLogo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="VirtusReport logo"
      role="img"
    >
      {/* Rounded square border */}
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="6"
        stroke="#C8102E"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Outline V */}
      <path
        d="M16 7L7 25H11.5L16 14L20.5 25H25L16 7Z"
        stroke="#C8102E"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
