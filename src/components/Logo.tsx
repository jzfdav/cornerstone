interface LogoProps {
    size?: number
    className?: string
}

export function Logo({ size = 64, className = '' }: LogoProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Cornerstone logo"
        >
            {/* Foundation base */}
            <path
                d="M8 48L32 56L56 48V52L32 60L8 52V48Z"
                fill="var(--md-sys-color-primary)"
                opacity="0.5"
            />

            {/* Main cornerstone block */}
            <path
                d="M16 32L32 24L48 32V48L32 56L16 48V32Z"
                fill="var(--md-sys-color-primary)"
            />

            {/* Top highlight */}
            <path
                d="M32 24L48 32L32 40L16 32L32 24Z"
                fill="var(--md-ref-palette-primary60)"
            />

            {/* Left shadow */}
            <path
                d="M16 32V48L32 56V40L16 32Z"
                fill="var(--md-sys-color-primary)"
                opacity="0.7"
            />

            {/* Keystone accent */}
            <path
                d="M28 12L32 8L36 12L32 20L28 12Z"
                fill="var(--md-ref-palette-primary60)"
            />
        </svg>
    )
}
