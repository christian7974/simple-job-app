interface TextInputProps {
    id: string;
    name: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
}

export default function CredentialTextInput({id, name, required, value, onChange, type}: TextInputProps) {
    return (
        <input 
            className="p-1 border border-[#D3D3D3] rounded-md w-[35%] max-[950px]:w-[90%] text-black"
            id={id}
            name={name}
            required={required}
            value={value}
            onChange={onChange}
            type={type}
        />
    )
}