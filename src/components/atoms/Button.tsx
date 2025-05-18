import React from 'react';

interface Props {
      type?: "submit" | "reset" | "button";
      text: string;
      link?: string;
      icon?: React.ReactNode;
      disabled?: boolean;
      className?: string;
}

const Button: React.FC<Props> = ({ type = "button", text, link, icon, disabled = false, className }) => {
      const containerClass = `max-w-[200px] min-h-14 w-auto gap-3 font-medium text-base px-5 py-2 text-center inline-flex items-center justify-center rounded hover:outline-none text-white ${className} ${disabled
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-gray-600 text-white hover:bg-black/80"}`

      const handleClick = () => {
            if (disabled) return;
            if (link) window.location.href = link;
      };

      return (
            <button
                  type={type}
                  className={containerClass}
                  onClick={handleClick}
                  disabled={disabled}
                  aria-disabled={disabled}
            >
                  {icon && <span>{icon}</span>}
                  {text}
            </button>
      );
};

export default Button;