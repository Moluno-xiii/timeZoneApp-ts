interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`mt-4 rounded-md bg-blue-400 px-10 py-2 font-semibold capitalize focus:ring-1 focus:ring-blue-400 focus:ring-offset-2 duration-300 transition-all ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
