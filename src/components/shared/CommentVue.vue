<template>
  <div>
    <div class="row">
      <div class="col-12 my-4">
        <div class="card shadow-sm">
          <div class="card-header">
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <div
                  class="post-profile-image"
                  :style="{
                    'background-image': `url(${props.comment.profileImage})`,
                    'background-color': 'grey',
                  }"
                ></div>
                <div class="mx-3">
                  <div>
                    <div class="fw-bold">
                      {{ props.comment.firstName }} {{ props.comment.lastName }}
                    </div>
                    <small>
                      {{ formatTime(props.comment.createdAt) }}
                    </small>
                  </div>
                </div>
              </div>
              <div>
                <div class="dropup">
                  <i
                    class="fa-solid fa-ellipsis fa-2xl"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></i>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li
                      class="dropdown-item"
                      v-if="props.comment.userId === props.userId"
                      @click="editComment()"
                    >
                      <i class="fa-solid fa-pen-to-square"></i> Yorumu Düzenle
                    </li>
                    <li
                      class="dropdown-item text-danger"
                      @click="deleteComment(props.comment.id, props.postId)"
                      v-if="props.comment.userId === props.userId"
                    >
                      <i class="fa-regular fa-trash-can"></i>
                      Yorumu Sil
                    </li>
                    <li class="dropdown-item text-danger">
                      <i class="fa-regular fa-flag"></i> Raporla
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body" v-if="!isCommentEditable">
            <p>
              {{ props.comment.message }}
              <span
                v-if="props.comment.isEdited"
                class="text-secondary-emphasis fst-italic tw-text-xs"
              >
                ( Düzenlendi )
              </span>
            </p>
          </div>
          <div class="card-body" v-else>
            <div class="d-flex">
              <textarea
                class="form-control rounded-3 px-2"
                id="message"
                rows="4"
                placeholder="Your message"
                v-model="message"
                :disabled="loading"
              ></textarea>
              <div class="d-flex flex-column px-2">
                <FormKit
                  type="submit"
                  :label="
                    loading
                      ? 'Loading'
                      : statusCode !== 200
                      ? 'Edit'
                      : 'Success'
                  "
                  :disabled="loading || statusCode === 200"
                  :classes="{ input: 'w-100' }"
                  @click="updateComment(props.comment)"
                />
                <FormKit
                  type="submit"
                  label="Cancel"
                  :classes="{ input: 'w-100 bg-secondary' }"
                  @click="cancelEditing()"
                />
              </div>
            </div>
          </div>
          <div class="card-footer border-0">
            <div class="d-flex align-items-center">
              <div class="d-flex align-items-center">
                <div class="fs-5 mx-1">0</div>
                <div
                  class="rounded-3 py-1 hover:tw-bg-orange-500 hover:tw-text-white tw-transition tw-ease-in-out tw-duration-300 pointer"
                >
                  <i class="fa-solid fa-arrow-up fa-lg mx-2"></i>
                </div>
              </div>
              <div class="d-flex align-items-center">
                <div class="fs-5 mx-1">0</div>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import type { IComment } from "@/models/comment_model";
import type { PropType } from "vue";
import { ref } from "vue";
import { usePostStore } from "@/stores/post";
import { storeToRefs } from "pinia";

const props = defineProps({
  comment: {
    type: Object as PropType<IComment>,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["deleteComment"]);

const deleteComment = (commentId: String, postId: string) => {
  emit("deleteComment", commentId, postId);
};

const postStore = usePostStore();
const { _statusCode: statusCode } = storeToRefs(postStore);

const message = ref(props.comment.message);
const loading = ref(false);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

const isCommentEditable = ref(false);

const editComment = () => {
  isCommentEditable.value = true;
};

const cancelEditing = () => {
  isCommentEditable.value = false;
};

const updateComment = async (comment: IComment) => {
  changeLoadingState();
  await postStore.editComment(props.comment.id, message.value).then(() => {
    changeLoadingState();
    if (statusCode.value === 200) {
      comment.message = message.value;
      comment.isEdited = true;
    }
    isCommentEditable.value = false;
    setTimeout(() => {
      postStore.$patch({
        statusCode: 0,
      });
    }, 3000);
  });
};

const formatTime = (time: any) => {
  return moment(time).fromNow();
};
</script>

<style scoped lang="scss">
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
