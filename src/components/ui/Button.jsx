import { Link } from "react-router-dom";

const variants = {
  primary:
    "bg-sky-black text-white hover:bg-sky-dark active:bg-sky-gray",
  secondary:
    "bg-transparent text-sky-black border border-sky-black hover:bg-sky-black hover:text-white",
  ghost:
    "bg-transparent text-sky-black hover:bg-gray-100",
  white:
    "bg-white text-sky-black hover:bg-sky-offwhite",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
  full: "w-full px-6 py-3.5 text-sm",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  to,
  onClick,
  disabled = false,
  className = "",
  type = "button",
  ...props
}) => {
  const baseClasses = `inline-flex items-center justify-center gap-2 uppercase tracking-[0.12em] font-body font-medium rounded-xl transition-all duration-300 ${
    variants[variant]
  } ${sizes[size]} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  } ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
