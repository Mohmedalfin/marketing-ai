export interface AiGenerateRequest {
  image_base64: string;
  category: string;
  media_type: string;
  prompt_design: string;
}

export interface AiGenerateResponse {
  status: string;
  message?: string;
  data: {
    image_url: string;
    video_url: string;
    caption: string;
  };
}

export interface AiScheduleRequest {
  title: string;
  caption: string;
  image_url: string;
  video_url?: string;
  platform: string[];
  scheduled_time: string; // ISO String
}

export interface AiScheduleResponse {
  status: string;
  message: string;
}
