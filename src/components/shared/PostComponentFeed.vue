<template>
  <div class="col-12 my-4 px-2">
    <div class="card shadow-sm">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between">
          <div class="d-flex align-items-center">
            <div
              class="post-profile-image"
              :style="{
                'background-image': `url(${post.profileImage})`,
              }"
              v-if="post.profileImage != null"
            ></div>
            <img
              src="@/assets/images/profile-man.png"
              alt="profile-man"
              class="post-profile-image me-4"
              v-else-if="post.gender == 2"
            />
            <img
              src="@/assets/images/profile-woman.png"
              alt="profile-woman"
              class="post-profile-image me-4"
              v-else-if="post.gender == 1"
            />
            <img
              src="@/assets/images/user.png"
              alt="profile"
              class="post-profile-image me-4"
              v-else
            />
            <div class="mx-3">
              <RouterLink
                class="text-decoration-none"
                :to="{ name: 'userprofile', params: { id: post.userId } }"
              >
                <div class="fw-bold">
                  {{ post.firstName }} {{ post.lastName }}
                </div>
              </RouterLink>
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
              <li class="dropdown-item text-danger">
                <i class="fa-regular fa-flag"></i> Report
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
              :key="file"
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
                preload="none"
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
            :key="interactionPreview"
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
            {{ post.interactionCount }} Interaction
          </span>
          <span v-else-if="post.interactionCount > 1" class="ms-2">
            {{ post.interactionCount }} Interactions
          </span>
        </div>
        <div class="container">
          <PostActions
            :post="post"
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
import moment from "moment";
import { usePostStore } from "@/stores/post";
import PostActions from "./PostActions.vue";

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const postStore = usePostStore();

const savePost = async (post: any) => {
  await postStore.savePost(post.id).then(() => {
    post.isSaved = true;
  });
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

<style scoped></style>
