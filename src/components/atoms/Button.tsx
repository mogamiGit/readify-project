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
      const containerClass = `max-w-[200px] min-h-14 w-auto gap-3 font-medium text-base px-5 py-2 text-center inline-flex items-center justify-center rounded focus:outline-none text-white ${className}`

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
                  style={{ backgroundColor: disabled ? 'gray' : 'black', borderRadius: '40px' }}
            >
                  {icon && <span>{icon}</span>}
                  {text}
            </button>
      );
};

export default Button;