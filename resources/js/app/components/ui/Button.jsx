import React from "react";
import { Loader2 } from "lucide-react";

const variantStyles = {
    primary: {
        solid: "bg-blue-600 text-white hover:bg-blue-700",
        outlined: "border border-blue-600 text-blue-600 hover:bg-blue-50",
    },
    secondary: {
        solid: "bg-purple-600 text-white hover:bg-purple-700",
        outlined: "border border-purple-600 text-purple-800 hover:bg-purple-50",
    },
    danger: {
        solid: "bg-red-600 text-white hover:bg-red-700",
        outlined: "border border-red-600 text-red-600 hover:bg-red-50",
    },
    warning: {
        solid: "bg-yellow-500 text-white hover:bg-yellow-600",
        outlined: "border border-yellow-500 text-yellow-600 hover:bg-yellow-50",
    },
    success: {
        solid: "bg-green-600 text-white hover:bg-green-700",
        outlined: "border border-green-600 text-green-600 hover:bg-green-50",
    },
    outlined: {
        solid: "bg-gray-600 text-white hover:bg-gray-700",
        outlined: "border border-gray-600 text-gray-600 hover:bg-gray-50",
    },
    light: {
        solid: "bg-white text-black hover:bg-gray-100",
        outlined: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    },
    engagement: {
        solid: "bg-orange-500 text-white hover:bg-orange-600",
        outlined: "border border-orange-500 text-orange-500 hover:bg-orange-50",
    },
    dinkzone: {
        solid: "bg-[#d6f52f] text-[#0b2117] hover:bg-[#e1ff3d]",
        outlined: "border border-[#769817] text-[#527014] hover:bg-[#d6f52f]/10",
        outlinedDark: "border border-[#526f24] text-[#d6f52f] hover:bg-[#d6f52f]/10",
    },
};

const sizeStyles = {
    xs: "px-3 text-xs py-1",
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
};

const Button = React.forwardRef(function Button({
    children,
    variant = "primary",
    size = "md",
    disabled = false,
    onClick,
    type = "button",
    className = "",
    loading = false,
    outlined = false,
    darkMode = false,
    ...props
}, ref) {
    const baseStyle =
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f] disabled:cursor-not-allowed disabled:opacity-50";

    const styleType = outlined ? "outlined" : "solid";
    const finalClass = [
        baseStyle,
        variantStyles[variant]?.[
            variant === "dinkzone" && outlined && darkMode ? "outlinedDark" : styleType
        ],
        sizeStyles[size],
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            {...props}
            ref={ref}
            type={type}
            className={finalClass}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {loading ? (
                <>
                    <Loader2 className="animate-spin mr-1" />
                    {children ? "LOADING..." : "SUBMITTING..."}
                </>
            ) : (
                children
            )}
        </button>
    );
});

Button.displayName = "Button";

export default Button;
