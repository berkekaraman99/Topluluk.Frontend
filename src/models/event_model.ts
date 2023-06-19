export interface IEventModel {
  attendeesCount: number;
  commentCount: number;
  comments: Array<any>;
  description: string;
  endDate: string;
  firstName: string;
  gender: number;
  id: string;
  images: Array<string>;
  isAttendeed: boolean;
  isLimited: boolean;
  isPaid: boolean;
  lastName: string;
  location: string;
  participiantLimit: number;
  price: number;
  profileImage: string | null;
  startDate: string;
  title: string;
  userId: string;
}
