export default function DangerButton({ className = '', children, ...props }) {
    return (
        <button
            type="button"
            className={`inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-25 ${className}`.trim()}
            {...props}
        >
            {children}
        </button>
    );
}
