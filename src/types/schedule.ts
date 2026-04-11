export interface ScheduleItem {
  id: number;
  product_name: string | null;
  image_url: string;
  video_url?: string;
  media_type?: string; // 'foto' | 'video'
  scheduled_time: string; // ISO format
  user_id: number;
  platform: string | string[];
  title: string;
  category: string;
  caption: string;
  status: string;
}

export type GetSchedulesResponse = ScheduleItem[];

export interface UpdateSchedulePayload {
  title: string;
  caption: string;
  scheduled_time: string;
}
