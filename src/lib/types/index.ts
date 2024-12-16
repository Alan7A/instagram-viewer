export interface UserResponse {
  highlights: Highlight[];
  stories: Story[];
  user_info: UserInfo;
}

export interface Highlight {
  id: string;
  thumbnail: string;
  title: string;
}

export interface Story {
  id: string;
  media: string;
  mediaType: "photo" | "video";
  mentions: any[];
  taken_at_timestamp: number;
  thumbnail: string;
  thumbnail_from_ig_cdn: string;
}

export interface UserInfo {
  bio: Bio;
  follower_count: number;
  following_count: number;
  id: string;
  is_private: boolean;
  is_verified: boolean;
  media_count: number;
  profile_pic_url: string;
  username: string;
}

export interface Bio {
  entities: Entity[];
  raw_text: string;
}

export interface Entity {
  user: User;
}

export interface User {
  id: string;
  username: string;
}

export interface ResponseError {
  error: string;
}

export interface Username {
  username: string;
  timestamp: number;
}
