export interface IUser {
  bannerImage: String | null;
  bio: String | null;
  communities: Array<any>;
  communityCount: Number;
  email: String;
  firstName: String;
  followersCount: Number;
  followingCount: Number;
  gender: Number;
  id: String;
  isFollowRequestReceived: boolean;
  isFollowRequestSent: boolean;
  isFollowing: boolean;
  isPrivate: boolean;
  lastName: String;
  posts: Array<any>;
  profileImage: String | null;
  userName: String;
}
