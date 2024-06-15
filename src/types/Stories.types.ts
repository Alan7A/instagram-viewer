export interface GetStoriesResponse {
  result: Story[];
}

export interface Story {
  image_versions2: ImageVersions2;
  original_height: number;
  original_width: number;
  pk: string;
  taken_at: number;
  video_versions: VideoVersion[];
  has_audio: boolean;
}

export interface ImageVersions2 {
  candidates: VideoVersion[];
}

export interface VideoVersion {
  width: number;
  height: number;
  url: string;
  url_signature: URLSignature;
  type?: number;
}

export interface URLSignature {
  expires: number;
  signature: string;
}
