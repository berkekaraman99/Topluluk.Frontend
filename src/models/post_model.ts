export interface IPostModel {
  commentCount: Number;
  comments: Array<any>;
  communityTitle: String | null;
  createdAt: String;
  description: String;
  files: Array<File>;
  firstName: String;
  gender: Number;
  id: String;
  interactionCount: Number;
  interactionPreviews: Array<any>;
  isInteracted: Object | null;
  isSaved: Boolean;
  isUserFollowing: Boolean;
  lastName: String;
  profileImage: String | null;
  userId: String;
  userName: String;
}
