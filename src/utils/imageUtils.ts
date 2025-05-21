import { COVER_IMAGE_URL, IMAGE_EXTENSION, IMAGE_SIZE } from "../api/endpoints";

export const getCoverUrl = (coverId?: number): string =>
      coverId ? `${COVER_IMAGE_URL}${coverId}${IMAGE_SIZE}${IMAGE_EXTENSION}` : '';