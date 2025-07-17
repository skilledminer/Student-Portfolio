interface PortfolioLogoProps {
  size?: number
  className?: string
}

export default function PortfolioLogo({ size = 32, className = "" }: PortfolioLogoProps) {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-3"
      >
        {/* Outer badge circle */}
        <circle cx="20" cy="20" r="18" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2" />

        {/* Inner circle */}
        <circle cx="20" cy="20" r="14" fill="white" />

        {/* Yellow star in center */}
        <path d="M20 12L22.5 17L28 17L23.5 21L25.5 26L20 23L14.5 26L16.5 21L12 17L17.5 17L20 12Z" fill="#EAB308" />

        {/* Badge ribbon at bottom */}
        <path d="M15 26L20 24L25 26V30L20 28L15 30V26Z" fill="#1E40AF" />
      </svg>
      <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Student Portfolio Builder
      </span>
    </div>
  )
}
