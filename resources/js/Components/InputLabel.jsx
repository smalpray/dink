export default function InputLabel({ htmlFor, value, className = '', children }) {
    return (
        <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`.trim()}>
            {value ?? children}
        </label>
    );
}
