export interface IEventModel {
  attendeesCount: Number;
  commentCount: Number;
  comments: Array<any>;
  description: String;
  endDate: String;
  firstName: String;
  gender: Number;
  id: String;
  images: Array<String>;
  isAttendeed: Boolean;
  isLimited: Boolean;
  isPaid: Boolean;
  lastName: String;
  location: String;
  participiantLimit: Number;
  price: Number;
  profileImage: String | null;
  startDate: String;
  title: String;
  userId: String;
}
