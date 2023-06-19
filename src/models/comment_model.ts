export interface IComment {
  createdAt: string;
  firstName: string;
  gender: number;
  id: string;
  interactionCount: number;
  isLiked: boolean;
  isEdited: boolean;
  lastName: string;
  message: string;
  profileImage: string | null;
  userId: string;
}
