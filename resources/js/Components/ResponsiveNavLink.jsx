import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ href, active = false, children, className = '', ...props }) {
    return (
        <Link
            href={href}
            className={`flex w-full items-center border-l-4 px-4 py-2 text-base font-medium ${active ? 'border-indigo-400 bg-indigo-50 text-indigo-700' : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'} ${className}`.trim()}
            {...props}
        >
            {children}
        </Link>
    );
}
