import { Link } from '@inertiajs/react';

export default function NavLink({ href, active = false, children, className = '', ...props }) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${active ? 'border-indigo-400 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} ${className}`.trim()}
            {...props}
        >
            {children}
        </Link>
    );
}
