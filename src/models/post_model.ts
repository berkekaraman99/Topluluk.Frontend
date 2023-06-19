import type { IFileModel } from "./file_model";
import type { IInteractionPreview } from "./interaction_preview_model";
import type { IIsInteracted } from "./is_interacted_model";

export interface IPostModel {
  commentCount: number;
  comments: Array<any>;
  communityTitle: string | null;
  createdAt: string;
  description: string;
  files: Array<IFileModel>;
  firstName: string;
  gender: number;
  id: string;
  interactionCount: number;
  interactionPreviews: Array<IInteractionPreview>;
  isInteracted: IIsInteracted | null;
  isSaved: boolean;
  isUserFollowing: boolean;
  lastName: string;
  profileImage: string | null;
  userId: string;
  userName: string;
}
