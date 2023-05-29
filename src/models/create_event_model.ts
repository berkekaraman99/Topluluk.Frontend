interface ICreateEventModel {
  title: string;
  description: string;
  isLimited: boolean;
  participiantLimit: string;
  files: FileList;
  isLocationOnline: boolean;
  location: string;
  startDate: Date;
  endDate: Date;
  isPaid: boolean;
  price: string;
  isVisible: boolean;
}

export default ICreateEventModel;
