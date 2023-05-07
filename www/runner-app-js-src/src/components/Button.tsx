import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  visible: boolean;
}

const Button = ({ children, visible, ...props }: Props) => {
  if (!visible) return <div className="w-full h-[50px]" />;

  return (
    <button
      type="button"
      {...props}
      className="cursor-pointer w-full px-4 py-4 text-lg leading-none text-white bg-blue-button rounded-3xl disabled:bg-gray disabled:text-text-disabled"
    >
      <i className="far fa-check-circle mr-5" />
      {children}
    </button>
  );
};

export default Button;
