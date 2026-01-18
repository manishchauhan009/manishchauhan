const InputField = ({ name, label, value, onChange, error, type = "text" }) => {
    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-300 mb-2">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${error ? "border-red-500" : "border-gray-700"
                    } text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-all`}
            />
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default InputField;
