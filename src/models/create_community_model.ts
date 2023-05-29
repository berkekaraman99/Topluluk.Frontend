interface ICreateCommunityModel {
  Location: string;
  IsVisible: string;
  IsPublic: string;
  CoverImage: File;
  ParticipiantLimit: string;
  Description: string;
  Title: string;
  CreatedById: string;
  BannerImage: File;
}

export default ICreateCommunityModel;
