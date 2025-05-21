import { COVER_IMAGE_URL, IMAGE_EXTENSION, IMAGE_SIZE } from "../api/endpoints";
import { formatTextToPlaceholder } from "./stringUtils";

export const getCoverUrl = (coverId?: number): string =>
      coverId ? `${COVER_IMAGE_URL}${coverId}${IMAGE_SIZE}${IMAGE_EXTENSION}` : '';

export const getPlaceholderUrl = (title: string): string =>
      `https://placehold.co/350x525/E1D1DE/gray?text=${formatTextToPlaceholder(title)}`;