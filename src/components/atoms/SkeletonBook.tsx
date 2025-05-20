import React from 'react'

const SkeletonBook: React.FC = () => {
      return (
            <div className="flex flex-col gap-5 justify-center items-center">
                  <div className='w-[200px] h-[300px] bg-blueDark/30 animate-pulse' />
                  <div className='flex flex-col gap-2 items-center justify-center'>
                        <div className="h-4 bg-blueDark/50 rounded w-[200px]" />
                        <div className="h-2 bg-blueDark/20 rounded w-[150px]" />
                        <div className="h-2 bg-blueDark/20 rounded w-[100px]" />
                  </div>
            </div>
      );
}

export default SkeletonBook;