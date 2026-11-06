export default function ApplicationLogo({ className = '', ...props }) {
    return (
        <svg viewBox="0 0 80 80" fill="none" className={className} {...props} aria-hidden="true">
            <circle cx="40" cy="40" r="28" fill="currentColor" opacity="0.12" />
            <path d="M40 18c12.15 0 22 9.85 22 22S52.15 62 40 62 18 52.15 18 40 27.85 18 40 18Zm-5 11h10v10H35v10H25V39h10V29Zm12 0h10v10H47v10H37V39h10V29Z" fill="currentColor" />
        </svg>
    );
}
