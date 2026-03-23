// Custom SVG icons for libraries not available in Simple Icons

export function MatplotlibIcon({ className, size = '1em', ...props }) {
  return (
    <svg
      viewBox="0 0 180 180"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      {...props}
    >
      <circle cx="90" cy="90" r="85" fill="none" stroke="currentColor" strokeWidth="8" />
      <circle cx="90" cy="90" r="60" fill="none" stroke="currentColor" strokeWidth="6" />
      <circle cx="90" cy="90" r="35" fill="none" stroke="currentColor" strokeWidth="5" />
      <circle cx="90" cy="90" r="10" fill="currentColor" />
      {/* Radial segments */}
      <line x1="90" y1="5" x2="90" y2="175" stroke="currentColor" strokeWidth="3" />
      <line x1="5" y1="90" x2="175" y2="90" stroke="currentColor" strokeWidth="3" />
      <line x1="28" y1="28" x2="152" y2="152" stroke="currentColor" strokeWidth="3" />
      <line x1="152" y1="28" x2="28" y2="152" stroke="currentColor" strokeWidth="3" />
    </svg>
  )
}

export function SeabornIcon({ className, size = '1em', ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      {...props}
    >
      {/* Stylized wave/distribution curve representing Seaborn's statistical plots */}
      <path
        d="M2 20 C2 20, 4 18, 6 14 C8 10, 9 4, 12 4 C15 4, 16 10, 18 14 C20 18, 22 20, 22 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M2 20 C2 20, 5 17, 8 12 C10 8, 11 6, 12 6 C13 6, 14 8, 16 12 C19 17, 22 20, 22 20"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="none"
      />
    </svg>
  )
}

export function NltkIcon({ className, size = '1em', ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      {...props}
    >
      {/* Book with text lines — represents NLP/text processing */}
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="9" y1="7" x2="16" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
