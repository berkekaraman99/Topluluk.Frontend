export interface ICommunity {
  adminGender: number;
  adminId: string;
  adminImage: string;
  adminLastName: string;
  adminName: string;
  bannerImage: string | null;
  coverImage: string | null;
  description: string;
  id: string;
  isOwner: boolean;
  isParticipiant: boolean;
  isPublic: boolean;
  isRestricted: boolean;
  isVisible: boolean;
  location: string;
  participiantsCount: number;
  title: string;
}
