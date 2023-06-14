import type { IFileModel } from "./file_model";
import type { IInteractionPreview } from "./interaction_preview_model";
import type { IIsInteracted } from "./is_interacted_model";

export interface IPostModel {
  commentCount: number;
  comments: Array<any>;
  communityTitle: String | null;
  createdAt: String;
  description: String;
  files: Array<IFileModel>;
  firstName: String;
  gender: number;
  id: String;
  interactionCount: number;
  interactionPreviews: Array<IInteractionPreview>;
  isInteracted: IIsInteracted | null;
  isSaved: Boolean;
  isUserFollowing: Boolean;
  lastName: String;
  profileImage: String | null;
  userId: String;
  userName: String;
}
