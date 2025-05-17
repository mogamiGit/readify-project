import React from 'react';
import { formatTextToPlaceholder } from '../../utils/stringUtils';

interface Props {
      title: string;
      authors: string[];
      urlImage?: string;
      altImage?: string;
}

const Book: React.FC<Props> = ({ title, authors, urlImage, altImage = `Cover de ${title}` }) => {
      const placeholder = `https://placehold.co/350x525/f4f4f4/gray?text=${formatTextToPlaceholder(title)}?font=roboto`

      return (
            <div className='flex flex-col gap-5 justify-center items-center'>
                  <img
                        src={urlImage || placeholder}
                        alt={altImage}
                        className='w-auto h-[300px]'
                  />
                  <div className='flex flex-col gap-1 justify-center'>
                        <p className='font-bold text-xl'>{title}</p>
                        <div className='flex gap-2 justify-center flex-wrap'>
                              {authors.map((author, index) => (
                                    <div key={index} className='bg-gray-100 border border-gray-300 rounded-full px-2 py-1'>
                                          <p className='text-xs text-gray-700'>{author}</p>
                                    </div>
                              ))}
                        </div>
                  </div>
            </div>
      );
}

export default Book;