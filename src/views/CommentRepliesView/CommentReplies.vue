<template>
  <Transition name="scaleInOut" mode="out-in">
    <LoadingSpinner v-if="loading" />
    <div class="container my-3" v-else-if="comment">
      <div class="row">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 my-4">
          <div class="card shadow-sm">
            <div class="card-header py-3">
              <div class="d-flex justify-content-between">
                <div class="d-flex align-items-center">
                  <div
                    class="post-profile-image"
                    :style="{
                      'background-image': 'url(' + comment.profileImage + ')',
                      'background-color': 'grey',
                    }"
                  ></div>
                  <div class="mx-3">
                    <div class="fw-bold">
                      {{ comment.firstName }} {{ comment.lastName }}
                    </div>
                    <small>
                      {{ formatTime(comment.createdAt) }}
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-body py-2 px-1">
              <div class="px-3">
                <p class="mb-0">{{ comment.message }}</p>
              </div>
            </div>

            <div class="card-footer border-0">
              <div class="d-flex align-items-center">
                <div class="d-flex align-items-center">
                  <div class="tw-text-lg mx-1">0</div>
                  <div
                    class="rounded-3 py-1 hover:tw-bg-orange-500 hover:tw-text-white tw-transition tw-ease-in-out tw-duration-300 pointer"
                  >
                    <i class="fa-solid fa-arrow-up fa-lg mx-2"></i>
                  </div>
                </div>
                <div class="d-flex align-items-center">
                  <div class="tw-text-lg mx-1">0</div>
                  <div
                    class="rounded-3 py-1 hover:tw-bg-purple-500 hover:tw-text-white tw-transition tw-ease-in-out tw-duration-300 pointer"
                  >
                    <i class="fa-solid fa-arrow-down fa-lg mx-2"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 my-4">
          <div class="card shadow-sm">
            <div class="card-header"><h1>Yorumunuz</h1></div>
            <div class="card-body">
              <div class="d-flex align-items-center mb-3">
                <div v-if="user.profileImage != null">
                  <div
                    class="post-profile-image me-3 shadow-sm"
                    :style="{
                      'background-image': `url(${user.profileImage})`,
                    }"
                  ></div>
                </div>
                <img
                  src="@/assets/images/profile-man.png"
                  alt="profile-man"
                  class="post-profile-image me-4"
                  v-else-if="user.gender == 2"
                />
                <img
                  src="@/assets/images/profile-woman.png"
                  alt="profile-woman"
                  class="post-profile-image me-4"
                  v-else-if="user.gender == 1"
                />
                <img
                  src="@/assets/images/user.png"
                  alt="profile"
                  class="post-profile-image me-4"
                  v-else
                />
                <textarea
                  class="form-control rounded-3 px-2"
                  id="message"
                  rows="4"
                  placeholder="Your message"
                  v-model="message"
                ></textarea>
              </div>
              <div class="d-flex justify-content-end">
                <FormKit
                  type="button"
                  :label="
                    isPosting
                      ? 'Gönderiliyor'
                      : statusCode !== 200
                      ? 'Yorum Yap'
                      : 'Başarılı'
                  "
                  wrapper-class="mx-auto text-center"
                  @click="createComment"
                  :disabled="
                    message.length === 0 || isPosting || statusCode === 200
                  "
                />
              </div>
            </div>
          </div>
          <h4 class="col-12 mt-4">Yorumlar</h4>

          <div>
            <TransitionGroup
              appear
              @before-enter="beforeEnterFeed"
              @enter="enterFeed"
              @before-leave="beforeLeaveFeed"
              @leave="leaveFeed"
            >
              <div
                class="my-2"
                v-for="(reply, index) in commentReplies"
                v-bind:key="reply.id"
                :data-index="index"
              >
                <ReplyVue
                  :comment="reply"
                  :post-id="postid"
                  :user-id="user.id"
                />
              </div>
            </TransitionGroup>
          </div>
        </div>
      </div>

      <div class="row"></div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import gsap from "gsap";
import LoadingSpinner from "@/components/shared/LoadingVue.vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { usePostStore } from "@/stores/post";
import ReplyVue from "@/components/shared/ReplyVue.vue";
import moment from "moment";

const props = defineProps({
  commentid: {
    type: String,
    required: true,
  },
  postid: {
    type: String,
    required: true,
  },
});

const beforeEnterFeed: any = (el: HTMLElement) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(100px)";
};
const enterFeed: any = (el: HTMLElement) => {
  const index = el.dataset.index ? parseInt(el.dataset.index) : 0;
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    delay: 0.1 * index,
  });
};
const beforeLeaveFeed: any = (el: HTMLElement) => {
  el.style.opacity = "1";
};
const leaveFeed: any = (el: HTMLElement) => {
  const index = el.dataset.index ? parseInt(el.dataset.index) : 0;
  gsap.to(el, {
    opacity: 0,
    y: 100,
    duration: 0.6,
    delay: 0.1 * index,
  });
};

const loading = ref(true);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

const authStore = useAuthStore();
const { _user: user } = storeToRefs(authStore);
const message = ref("");

const postStore = usePostStore();
postStore.getCommentReplies(props.commentid).then(changeLoadingState);

const { _statusCode: statusCode, _comment: comment } = storeToRefs(postStore);

const isPosting = ref(false);
const changePostingState = () => {
  isPosting.value = !isPosting.value;
};

const createComment = async () => {
  changePostingState();
  await postStore
    .createComment({
      postId: props.postid,
      parentCommentId: props.commentid,
      message: message.value,
    })
    .then(async () => {
      changePostingState();
      await postStore.getCommentReplies(props.commentid);
      setTimeout(() => {
        postStore.$patch({
          statusCode: 0,
        });
      }, 2000);
    });
  message.value = "";
};

const { _commentReplies: commentReplies } = storeToRefs(postStore);

const formatTime = (time: any) => {
  return moment(time).fromNow();
};

onBeforeUnmount(() => {
  postStore.$patch({
    post: {},
    postComments: [],
  });
});
</script>

<style scoped lang="scss">
.delete {
  cursor: pointer;
}

.horizontal {
  border: 1px solid var(--color-primary);

  &.dropdown-menu.show {
    display: flex;
  }
}

#message {
  width: 100%;
  box-sizing: border-box;
  direction: ltr;
  display: block;
  max-width: 100%;
  line-height: 1.5;
  letter-spacing: 1px;
  padding: 15px 15px 30px;
  border-radius: 3px;
  border: 1px solid grey;
  font: 13px Tahoma, cursive;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:focus {
    border-color: var(--color-primary);
  }
}
</style>
