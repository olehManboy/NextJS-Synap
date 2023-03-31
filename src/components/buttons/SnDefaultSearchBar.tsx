import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { FiSearch } from "react-icons/fi";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const Input: React.FC<InputProps> = ({ placeholder, onChange, ...props }) => {
  return (
    <div className="input-container">
      <input
        placeholder={placeholder ? placeholder : "Search here"}
        className="default-input"
        onChange={onChange}
        {...props}
      />
      <FiSearch className="icon-search" />
    </div>
  );
};

export default Input;
