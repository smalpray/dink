export default function Modal({ show = false, onClose, children, className = '' }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center bg-black/40 px-4 py-8 text-center">
                <div className={`w-full max-w-lg overflow-hidden rounded-lg bg-white text-left shadow-xl ${className}`.trim()} role="dialog" aria-modal="true">
                    {children}
                </div>
            </div>
        </div>
    );
}
