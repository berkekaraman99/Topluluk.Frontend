export interface IMessage {
  _id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: Date;
  updatedAt: Date | null;
  isUpdated: boolean;
  isDeleted: boolean;
  __v: number;
}
