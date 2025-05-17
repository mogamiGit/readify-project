export const formatTextToPlaceholder = (text: string): string => {
      return encodeURIComponent(text).replace(/%20/g, '+');
};