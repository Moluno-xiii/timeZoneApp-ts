interface ButtonProps {
  children: React.ReactNode;
  className : string
}

const Button: React.FC<ButtonProps> = ({ children, className="" }) => {
  return (
    <button className={`mt-4 rounded-md bg-blue-400 px-10 py-2 font-semibold capitalize ${className}`}>
      {children}
    </button>
  );
};

export default Button;
