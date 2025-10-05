const Input = ({ label, type = 'text', value, onChange, placeholder, name, required = false }) => {
  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block text-gray-700 text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-colors"
      />
    </div>
  );
};

export default Input;