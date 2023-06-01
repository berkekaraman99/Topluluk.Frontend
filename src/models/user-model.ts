interface IUser {
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
  isFollowRequestReceived: Boolean;
  isFollowRequestSent: Boolean;
  isFollowing: Boolean;
  isPrivate: Boolean;
  lastName: String;
  posts: Array<any>;
  profileImage: String | null;
  userName: String;
}

export default IUser;
