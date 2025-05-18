import React from 'react'

const SkeletonBook: React.FC = () => {
      return (
            <div className="flex flex-col gap-5 justify-center items-center">
                  <div className='w-[200px] h-[300px] bg-gray-200 animate-pulse' />
                  <div className='flex flex-col gap-2 items-center justify-center'>
                        <div className="h-4 bg-gray-300 rounded w-[200px]" />
                        <div className="h-2 bg-gray-200 rounded w-[150px]" />
                        <div className="h-2 bg-gray-200 rounded w-[100px]" />
                  </div>
            </div>
      );
}

export default SkeletonBook;