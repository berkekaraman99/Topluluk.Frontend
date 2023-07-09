<template>
  <div class="col-12 col-lg-8 offset-lg-2 my-4 px-2">
    <div class="card shadow-sm">
      <div
        class="position-absolute top-50 start-50 translate-middle z-3 w-100 h-100"
        v-if="deleteProcess"
      >
        <div
          class="d-flex align-items-center justify-content-center flex-column h-100 rounded-2"
          style="background-color: rgba(0, 0, 0, 0.6)"
        >
          <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <h4 class="mt-3 text-white">Deleting...</h4>
        </div>
      </div>
      <div class="card-header py-3">
        <div class="d-flex justify-content-between">
          <div class="d-flex align-items-center">
            <img
              v-if="post.profileImage != null"
              class="post-profile-image"
              :src="post.profileImage"
            />
            <img
              src="@/assets/images/profile-man.png"
              alt="profile-man"
              class="post-profile-image"
              v-else-if="post.gender == 2"
            />
            <img
              src="@/assets/images/profile-woman.png"
              alt="profile-woman"
              class="post-profile-image"
              v-else-if="post.gender == 1"
            />
            <img
              src="@/assets/images/user.png"
              alt="profile"
              class="post-profile-image"
              v-else
            />
            <div class="mx-3">
              <RouterLink
                :to="{ name: 'userprofile', params: { id: post.userId } }"
                class="text-decoration-none tw-text-blue-800"
              >
                <div class="fw-bold">
                  {{ post.firstName }} {{ post.lastName }}
                </div></RouterLink
              >
              <small>
                {{ formatTime(post.createdAt) }}
              </small>
            </div>
          </div>
          <div class="dropdown">
            <i
              class="fa-solid fa-ellipsis fa-2xl"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            ></i>
            <ul class="dropdown-menu dropdown-menu-end">
              <li
                class="dropdown-item text-danger"
                @click="deletePost(post)"
                v-if="post.userId === user.id"
              >
                <i class="fa-regular fa-trash-can"></i>
                Sil
              </li>
              <li class="dropdown-item text-danger">
                <i class="fa-regular fa-flag"></i> Raporla
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="card-body p-0">
        <div class="my-4 px-3">
          <p>{{ post.description }}</p>
        </div>
        <div
          :id="`carousel${post.id}`"
          class="carousel slide"
          v-if="post.files.length"
        >
          <div class="carousel-inner">
            <div
              class="carousel-item bg-black"
              :class="{ active: post.files[0] === file }"
              style="transition: 0.35s ease-in-out; max-height: 400px"
              v-for="file in post.files"
              :key="file.file"
            >
              <img
                v-if="file.type === 1 || file.type === 0"
                :src="file.file"
                class="d-block img-fluid w-100 object-fit-contain"
                style="height: 400px"
                alt="image"
              />
              <video
                height="400"
                controls
                v-else-if="file.type === 2"
                :src="file.file"
                class="d-block mx-auto w-100"
              ></video>
            </div>
          </div>
          <button
            class="carousel-control-prev position-absolute top-50 start-0 translate-middle-y"
            type="button"
            :data-bs-target="`#carousel${post.id}`"
            data-bs-slide="prev"
            v-if="post.files.length !== 1"
          >
            <i class="fa-solid fa-circle-chevron-left fa-lg"></i>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next position-absolute top-50 end-0 translate-middle-y"
            type="button"
            :data-bs-target="`#carousel${post.id}`"
            data-bs-slide="next"
            v-if="post.files.length !== 1"
          >
            <i class="fa-solid fa-circle-chevron-right fa-lg"></i>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div class="card-footer px-0">
        <div
          id="interactionPreviews"
          class="container"
          v-if="post.interactionPreviews != null"
        >
          <span
            v-for="interactionPreview in post.interactionPreviews"
            :key="interactionPreview.interaction"
          >
            <span v-if="interactionPreview.interaction === 0"
              ><img
                src="@/assets/images/interactions/ic_like.png"
                alt="Like"
                height="32"
              />
            </span>
            <span v-if="interactionPreview.interaction === 1"
              ><img
                src="@/assets/images/interactions/ic_celebrate.png"
                alt="Celebrate"
                height="32"
              />
            </span>
            <span v-if="interactionPreview.interaction === 2"
              ><img
                src="@/assets/images/interactions/ic_support.png"
                alt="Support"
                height="32"
              />
            </span>
            <span v-if="interactionPreview.interaction === 3"
              ><img
                src="@/assets/images/interactions/ic_insight.png"
                alt="Insightfull"
                height="32"
              />
            </span>
            <span v-if="interactionPreview.interaction === 4"
              ><img
                src="@/assets/images/interactions/ic_dislike.png"
                alt="Dislike"
                height="32"
              />
            </span>
          </span>
          <span v-if="post.interactionCount === 1" class="ms-2">
            {{ post.interactionCount }} İfade
          </span>
          <span v-else-if="post.interactionCount > 1" class="ms-2">
            {{ post.interactionCount }} İfade
          </span>
        </div>
        <div class="container">
          <PostActions
            :post="props.post"
            @interact-post="interactPost"
            @remove-interaction="removeInteraction"
            @save-post="savePost"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";
import moment from "moment";
import { usePostStore } from "@/stores/post";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import PostActions from "./PostActions.vue";
import type { IPostModel } from "@/models/post_model";

const props = defineProps({
  post: {
    type: Object as PropType<IPostModel>,
    required: true,
  },
});

const authStore = useAuthStore();
const postStore = usePostStore();
const { _user: user } = storeToRefs(authStore);

const deleteProcess = ref(false);

const changeDeleteState = () => {
  deleteProcess.value = !deleteProcess.value;
};

const savePost = async (post: any) => {
  await postStore.savePost(post.id).then(() => {
    post.isSaved = true;
  });
};

const deletePost = async (post: any) => {
  changeDeleteState();
  try {
    await postStore
      .deletePost({ postId: post.id, userId: post.userId })
      .then(() => {
        changeDeleteState();
      });
  } catch (error: any) {
    console.log(error.data);
    changeDeleteState();
  }
};

const interactPost = async ({ type, post }: any) => {
  if (post.isInteracted == null) {
    await postStore
      .interactionPost({
        interactionType: type,
        targetId: post.id,
      })
      .then(() => {
        post.interactionCount++;
        post.isInteracted = {
          interaction: type,
        };
      });
  } else {
    await removeInteraction(post);
    await postStore
      .interactionPost({
        interactionType: type,
        targetId: post.id,
      })
      .then(() => {
        post.interactionCount++;
        post.isInteracted = {
          interaction: type,
        };
      });
  }
};

const removeInteraction = async (post: any) => {
  await postStore.removeInteractionPost(post.id).then(() => {
    post.interactionCount--;
    post.isInteracted = null;
  });
};

const formatTime = (time: any) => {
  return moment(time).fromNow();
};
</script>

<style scoped>
.delete {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
