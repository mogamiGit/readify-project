import React from 'react';

interface Props {
      loading: boolean;
      message: string;
}

const Loading: React.FC<Props> = ({ loading, message }) => {
      return (
            <div className='absolute inset-0 w-screen h-screen bg-gradient-to-r from-peach to-blueLight p-4 flex items-center justify-center'>
                  <div className='rounded-full px-10 py-6 bg-white shadow-3xl'>
                        <p className={`text-lg ${loading ? 'animate-pulse' : ''} `}>{message}</p>
                  </div>
            </div>
      )
}

export default Loading;