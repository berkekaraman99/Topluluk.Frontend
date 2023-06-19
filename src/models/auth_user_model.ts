export interface IAuthUser {
  bannerImage: string | null;
  bio: string | null;
  birthdayDate: string | null;
  email: string;
  firstName: string;
  followersCount: number;
  followingsCount: number;
  gender: number;
  id: string;
  isPrivate: boolean;
  lastName: string;
  profileImage: string | null;
  userName: string;
}
