/**
 * Represents the response from the upload endpoint.
 */
export interface UploadResponse {
  id: number; // Unique identifier for the uploaded file
  url: string; // URL of the uploaded file
  filename: string; // Original filename of the uploaded file
}

/**
 * Represents the payload for creating a Hero Image entry.
 */
export interface HeroImagePayload {
  name: string; // Name of the image
  image: string; // URL of the uploaded image
}

/**
 * Represents the response from the `/hero/image` API when retrieving all images.
 */
export interface HeroImageResponse {
  id: number; // Unique identifier for the hero image
  name: string; // Name of the image
  image: string; // URL of the hero image
  createdAt: string; // Timestamp when the image was created
  updatedAt: string; // Timestamp when the image was last updated
}

/**
 * Represents the response from the `/hero/image` API for all hero images.
 */
export type HeroImagesListResponse = HeroImageResponse[];
