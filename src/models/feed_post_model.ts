import type { IFileModel } from "./file_model";
import type { IInteractionPreview } from "./interaction_preview_model";
import type { IIsInteracted } from "./is_interacted_model";

export interface IFeedPost {
  commentCount: number;
  community: Object | null;
  createdAt: string;
  description: string;
  event: Object | null;
  files: Array<IFileModel>;
  firstName: string;
  gender: number;
  id: string;
  interactionCount: number;
  interactionPreviews: Array<IInteractionPreview>;
  isFollowing: boolean;
  isInteracted: IIsInteracted | null;
  isSaved: boolean;
  lastName: string;
  profileImage: string | null;
  userId: string;
  username: string;
}
