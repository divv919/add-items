interface ButtonProps {
  varient: "primary" | "secondary";
  loading?: boolean;
  text: string;
  onClick: () => void;
}
export const Button = ({
  text,
  varient,
  loading = false,

  onClick,
}: ButtonProps) => {
  return (
    <button
      className="bg-indigo-700 font-medium text-[16px] cursor-pointer hover:bg-indigo-800 text-indigo-50 rounded w-fit py-[6px] px-[8px]"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
