export interface ICommunity {
  adminGender: number;
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
  participiantsCount: number;
  title: String;
}
