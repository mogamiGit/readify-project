import React, { useState } from 'react';
import { formatTextToPlaceholder } from '../../utils/stringUtils';
import { Link } from 'react-router-dom';

interface Props {
      title: string;
      workId: string | undefined;
      authors: string[];
      urlImage?: string;
      altImage?: string;
}

const Book: React.FC<Props> = ({ title, workId, authors, urlImage, altImage = `Cover de ${title}` }) => {
      const [imageLoaded, setImageLoaded] = useState(false);
      const placeholder = `https://placehold.co/350x525/f4f4f4/gray?text=${formatTextToPlaceholder(title)}?font=roboto`

      return (
            <Link to={`/book/${workId}`} className="block">
                  <div className='flex flex-col gap-5 justify-center items-center'>
                        <div className={`flex justify-center rounded-lg overflow-hidden ${imageLoaded ? 'w-auto h-auto' : 'w-[200px] h-[300px] bg-blueDark/20'}`}>
                              {urlImage && (
                                    <img
                                          src={urlImage || placeholder}
                                          alt={altImage}
                                          onLoad={() => setImageLoaded(true)}
                                          className='w-auto h-[300px]'
                                    />
                              )}
                        </div>
                        <div className='flex flex-col gap-2 justify-center'>
                              <p className='font-bold text-xl'>{title}</p>
                              <div className='flex gap-2 justify-center flex-wrap'>
                                    {authors.map((author, index) => (
                                          <div key={index} className='bg-white/70 backdrop-blur-sm border border-white rounded-full px-2 py-1'>
                                                <p className='text-xs'>{author}</p>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </div>
            </Link>
      );
}

export default Book;