export interface IFeedPost {
  commentCount: Number;
  community: Object | null;
  createdAt: String;
  description: String;
  event: Object | null;
  files: Array<File>;
  firstName: String;
  gender: Number;
  id: String;
  interactionCount: Number;
  interactionPreviews: Array<any>;
  isFollowing: Boolean;
  isInteracted: Object;
  isSaved: Boolean;
  lastName: String;
  profileImage: String | null;
  userId: String;
}
