const Button = ({ children, type = 'button', onClick, fullWidth = false, variant = 'primary', disabled = false }) => {
  const baseStyles = "px-6 py-2 rounded font-medium text-sm transition-colors duration-200 disabled:opacity-50";
  
  const variants = {
    primary: "bg-teal-600 text-white hover:bg-teal-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "border-2 border-teal-600 text-teal-600 hover:bg-teal-50"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''}`}
    >
      {children}
    </button>
  );
};

export default Button;