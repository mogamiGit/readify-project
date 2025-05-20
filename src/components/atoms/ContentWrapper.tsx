import React from 'react';

interface Props {
      children: React.ReactNode;
      className?: string;
}

const ContentWrapper: React.FC<Props> = ({ children, className }) => {
      return (
            <div className={`w-full mx-auto max-w-screen-xl px-6 ${className}`}>
                  {children}
            </div>
      );
}

export default ContentWrapper;