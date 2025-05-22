import React from 'react';

interface Props {
      type?: "submit" | "reset" | "button";
      text: string;
      link?: string;
      icon?: React.ReactNode;
      disabled?: boolean;
      style?: 'dark' | 'light';
      className?: string;
      onClick?: () => void;
}

const Button: React.FC<Props> = ({ type = "button", text, link, icon, disabled = false, style = 'dark', className, onClick }) => {
      const disabledClass = 'bg-gray-400 text-white cursor-not-allowed'
      const styleClass = `${style === 'dark' ? "bg-blueDark text-white hover:bg-black/80" : "bg-white/40 text-blueDark hover:bg-white border border-white"}`

      const containerClass = `max-w-[200px] min-h-14 w-auto gap-3 font-medium text-base px-5 py-2 text-center inline-flex items-center justify-center rounded hover:outline-none text-white rounded-full ${className} ${disabled ? disabledClass : styleClass}`

      const handleClick = () => {
            if (disabled) return;
            if (onClick) onClick();
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