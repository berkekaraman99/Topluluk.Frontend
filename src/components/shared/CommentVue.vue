<template>
  <div>
    <div class="row">
      <div class="col-12 offset-0 col-sm-12 col-md-8 offset-md-2 my-4">
        <div class="card shadow-sm">
          <div class="card-header">
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <div
                  class="post-profile-image"
                  :style="{
                    'background-image': 'url(' + comment.profileImage + ')',
                    'background-color': 'grey',
                  }"
                ></div>
                <div class="mx-3">
                  <div>
                    <div class="fw-bold">
                      {{ comment.firstName }} {{ comment.lastName }}
                    </div>
                    <small>
                      {{ formatTime(comment.createdAt) }}
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
                    <li class="dropdown-item" v-if="comment.userId === userId">
                      <i class="fa-solid fa-pen-to-square"></i> Edit Comment
                    </li>
                    <li
                      class="dropdown-item text-danger"
                      @click="deleteComment(comment.id, postId)"
                      v-if="comment.userId === userId"
                    >
                      <i class="fa-regular fa-trash-can"></i>
                      Delete
                    </li>
                    <li class="dropdown-item text-danger">
                      <i class="fa-regular fa-flag"></i> Report
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">{{ comment.message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import type { IComment } from "@/models/comment_model";
import type { PropType } from "vue";

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

const formatTime = (time: any) => {
  return moment(time).fromNow();
};
</script>

<style scoped></style>
