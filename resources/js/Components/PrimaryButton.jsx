export default function PrimaryButton({ className = '', children, ...props }) {
    return (
        <button
            type="button"
            className={`inline-flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-25 ${className}`.trim()}
            {...props}
        >
            {children}
        </button>
    );
}
