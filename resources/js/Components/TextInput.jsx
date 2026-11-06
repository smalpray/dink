import { forwardRef } from 'react';

const TextInput = forwardRef(({ className = '', type = 'text', ...props }, ref) => {
    return (
        <input
            {...props}
            type={type}
            ref={ref}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${className}`.trim()}
        />
    );
});

TextInput.displayName = 'TextInput';

export default TextInput;
