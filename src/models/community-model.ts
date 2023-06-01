interface ICommunity {
  adminGender: Number;
  adminId: String;
  adminImage: String;
  adminLastName: String;
  adminName: String;
  bannerImage: String | null;
  coverImage: String | null;
  description: String;
  id: String;
  isOwner: Boolean;
  isParticipiant: Boolean;
  isPublic: Boolean;
  isRestricted: Boolean;
  isVisible: Boolean;
  location: String;
  participiantCount: Number;
  title: String;
}

export default ICommunity;
