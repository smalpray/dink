import { Link } from '@inertiajs/react';
import { createContext, useContext, useMemo } from 'react';

const DropdownContext = createContext(null);

export default function Dropdown({ children, ...props }) {
    const value = useMemo(() => ({ ...props }), [props]);

    return <DropdownContext.Provider value={value}>{children}</DropdownContext.Provider>;
}

Dropdown.Trigger = function Trigger({ children, className = '', ...props }) {
    const ctx = useContext(DropdownContext);
    return <div className={className} {...props}>{children}</div>;
};

Dropdown.Content = function Content({ children, className = '', ...props }) {
    return (
        <div className={`absolute right-0 z-50 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5 ${className}`.trim()} {...props}>
            {children}
        </div>
    );
};

Dropdown.Link = function LinkItem({ href, children, className = '', ...props }) {
    return (
        <Link href={href} className={`block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 ${className}`.trim()} {...props}>
            {children}
        </Link>
    );
};
