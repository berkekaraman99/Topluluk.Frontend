export interface IComment {
  createdAt: String;
  firstName: String;
  gender: Number;
  id: String;
  interactionCount: Number;
  isLiked: Boolean;
  isEdited: Boolean;
  lastName: String;
  message: String;
  profileImage: String | null;
  userId: String;
}
