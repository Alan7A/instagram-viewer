export interface GetHighlightsResponse {
  result: Result[];
}

export interface Result {
  id: string;
  title: string;
  cover_media: CoverMedia;
}

export interface CoverMedia {
  cropped_image_version: CroppedImageVersion;
}

export interface CroppedImageVersion {
  url: string;
  url_signature: URLSignature;
}

export interface URLSignature {
  expires: number;
  signature: string;
}
