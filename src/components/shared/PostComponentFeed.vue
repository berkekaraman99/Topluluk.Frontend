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
            class="carousel-control-prev"
            type="button"
            :data-bs-target="`#carousel${post.id}`"
            data-bs-slide="prev"
            v-if="post.files.length !== 1"
          >
            <i class="fa-solid fa-circle-chevron-left fa-lg"></i>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
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
          <div class="row">
            <div class="col-sm-6 col-md-3 text-center my-1 dropup-center">
              <div
                id="interactions"
                :data-bs-toggle="post.isInteracted != null ? '' : 'dropdown'"
                aria-expanded="false"
                class="d-sm-block d-md-flex align-items-center justify-content-center flex-column d-lg-block"
                @click="
                  post.isInteracted == null ? null : removeInteraction(post)
                "
              >
                <div v-if="post.isInteracted == null">
                  <i class="fa-regular fa-face-smile fa-lg my-3"></i>
                  Interact
                </div>
                <div v-else-if="post.isInteracted.interaction === 0">
                  <img
                    src="@/assets/images/interactions/ic_like.png"
                    alt="Like"
                    height="32"
                  />
                  <div>Like</div>
                </div>
                <div v-else-if="post.isInteracted.interaction === 1">
                  <img
                    src="@/assets/images/interactions/ic_celebrate.png"
                    alt="Like"
                    height="32"
                  />
                  <div>Celebrate</div>
                </div>
                <div v-else-if="post.isInteracted.interaction === 2">
                  <img
                    src="@/assets/images/interactions/ic_support.png"
                    alt="Like"
                    height="32"
                  />
                  <div>Support</div>
                </div>
                <div v-else-if="post.isInteracted.interaction === 3">
                  <img
                    src="@/assets/images/interactions/ic_insight.png"
                    alt="Like"
                    height="32"
                  />
                  <div>Insightfull</div>
                </div>
                <div v-else-if="post.isInteracted.interaction === 4">
                  <img
                    src="@/assets/images/interactions/ic_dislike.png"
                    alt="Like"
                    height="32"
                  />
                  <div>Dislike</div>
                </div>
              </div>
              <ul
                class="dropdown-menu shadow border-2 border-black horizontal p-0"
              >
                <li>
                  <a
                    class="dropdown-item py-3"
                    :class="{
                      'bg-primary text-white':
                        post.isInteracted == null
                          ? false
                          : post.isInteracted.interaction === 0,
                    }"
                    @click="
                      interactPost({
                        type: 0,
                        post,
                      })
                    "
                    ><img
                      src="@/assets/images/interactions/ic_like.png"
                      alt="Like"
                      height="32"
                  /></a>
                </li>
                <li>
                  <a
                    class="dropdown-item py-3"
                    :class="{
                      'bg-primary text-white':
                        post.isInteracted == null
                          ? false
                          : post.isInteracted.interaction === 1,
                    }"
                    @click="
                      interactPost({
                        type: 1,
                        post,
                      })
                    "
                    ><img
                      src="@/assets/images/interactions/ic_celebrate.png"
                      alt="Celebrate"
                      height="32"
                  /></a>
                </li>
                <li>
                  <a
                    class="dropdown-item py-3"
                    :class="{
                      'bg-primary text-white':
                        post.isInteracted == null
                          ? false
                          : post.isInteracted.interaction === 2,
                    }"
                    @click="
                      interactPost({
                        type: 2,
                        post,
                      })
                    "
                    ><img
                      src="@/assets/images/interactions/ic_support.png"
                      alt="Support"
                      height="32"
                  /></a>
                </li>
                <li>
                  <a
                    class="dropdown-item py-3"
                    :class="{
                      'bg-primary text-white':
                        post.isInteracted == null
                          ? false
                          : post.isInteracted.interaction === 3,
                    }"
                    @click="
                      interactPost({
                        type: 3,
                        post,
                      })
                    "
                    ><img
                      src="@/assets/images/interactions/ic_insight.png"
                      alt="Insightfull"
                      height="32"
                    />
                  </a>
                </li>
                <li>
                  <a
                    class="dropdown-item py-3"
                    :class="{
                      'bg-primary text-white':
                        post.isInteracted == null
                          ? false
                          : post.isInteracted.interaction === 4,
                    }"
                    @click="
                      interactPost({
                        type: 4,
                        post,
                      })
                    "
                    ><img
                      src="@/assets/images/interactions/ic_dislike.png"
                      alt="Dislike"
                      height="32"
                  /></a>
                </li>
              </ul>
            </div>
            <div class="col-sm-6 col-md-3 text-center my-1">
              <RouterLink
                :to="{ name: 'postcomments', params: { id: post.id } }"
                class="text-decoration-none text-black"
              >
                <div
                  id="comments"
                  class="d-sm-block d-md-flex align-items-center justify-content-center flex-column d-lg-block"
                >
                  <i class="fa-regular fa-message fa-lg my-3"></i>
                  {{ post.commentCount }} Comments
                </div>
              </RouterLink>
            </div>
            <div class="col-sm-6 col-md-3 text-center my-1">
              <div
                id="share"
                class="d-sm-block d-md-flex align-items-center justify-content-center flex-column d-lg-block"
              >
                <i class="fa-regular fa-paper-plane fa-lg my-3"></i>
                Share
              </div>
            </div>
            <div class="col-sm-6 col-md-3 text-center my-1">
              <div
                v-if="post.isSaved"
                id="save"
                class="d-sm-block d-md-flex align-items-center justify-content-center flex-column d-lg-block"
              >
                <i class="fa-solid fa-bookmark fa-lg my-3"></i> Saved
              </div>
              <div
                v-else
                @click="savePost(post)"
                id="save"
                class="d-sm-block d-md-flex align-items-center justify-content-center flex-column d-lg-block"
              >
                <i class="fa-regular fa-bookmark fa-lg my-3"></i>
                Save
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { usePostStore } from "@/store/post";

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

<style scoped>
.horizontal.dropdown-menu.show {
  display: flex;
}
</style>
