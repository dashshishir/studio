const Logo = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
  >
    <rect width="100" height="100" rx="20" fill="hsl(var(--primary))" />
    <path
      d="M30 70V30L50 40V60L30 70Z"
      fill="hsl(var(--primary-foreground))"
      fillOpacity="0.8"
    />
    <path
      d="M70 70V30L50 40V60L70 70Z"
      fill="hsl(var(--primary-foreground))"
    />
  </svg>
);

export default Logo;
