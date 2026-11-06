export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            type="checkbox"
            className={`h-4 w-4 rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 ${className}`.trim()}
            {...props}
        />
    );
}
