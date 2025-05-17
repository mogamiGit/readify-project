import React from 'react';

interface Props {
      title: string;
      authors: string[];
      urlImage: string;
      altImage?: string;
}

const Book: React.FC<Props> = ({ title, authors, urlImage, altImage = `Cover de ${title}` }) => {

      return (
            <div className='flex flex-col gap-3 justify-center items-center'>
                  <img src={urlImage} alt={altImage} className='max-w-[200px] h-auto' />
                  <div className='flex flex-col gap-1 justify-center'>
                        <p className='font-bold text-xl'>{title}</p>
                        <div className='flex gap-2 justify-center flex-wrap'>
                              {authors.map((author, index) => (
                                    <div className='bg-gray-100 border border-gray-300 rounded-full px-2 py-1'>
                                          <p key={index} className='text-xs text-gray-700'>{author}</p>
                                    </div>
                              ))}
                        </div>
                  </div>
            </div>
      );
}

export default Book;