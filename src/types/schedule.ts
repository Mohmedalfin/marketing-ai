export interface ScheduleItem {
  id: number;
  product_name: string | null;
  image_url: string;
  scheduled_time: string; // ISO format
  user_id: number;
  platform: string;
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
