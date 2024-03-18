
interface InputProps {
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    css?: string;
}

const InputPerso: React.FC<InputProps> = ({ css, type, name, value, onChange, placeholder }) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${css} rounded-md border-2 w-9/10 border-gray-300 px-2 py-1 focus:outline-none focus:border-primary transition duration-500 ease-in-out hover:border-primary hover:shadow-lg hover:scale-105 transform hover:transition`}
        />
    );
};

export default InputPerso;
