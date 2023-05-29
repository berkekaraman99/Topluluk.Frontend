<template>
  <div>
    <div class="row">
      <div class="col-12 offset-0 col-sm-12 col-md-8 offset-md-2 my-4">
        <div class="card shadow-sm">
          <div class="card-header"><h1>Your comment</h1></div>
          <div class="card-body">
            <div class="d-flex align-items-center mb-3">
              <div
                class="post-profile-image px-4 me-3"
                :style="{
                  'background-image': 'url(' + user.profileImage + ')',
                  'background-color': 'grey',
                }"
                v-if="user.profileImage != null"
              ></div>
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
                class="form-control rounded-5 px-4"
                id="message"
                rows="2"
                placeholder="Your message"
                v-model="message"
              ></textarea>
            </div>
            <div class="d-flex justify-content-end">
              <FormKit
                type="button"
                :label="
                  isPosting
                    ? 'Loading'
                    : statusCode !== 200
                    ? 'Create Comment'
                    : 'Success'
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
      </div>
    </div>

    <div class="container" v-if="comments != null">
      <h4 class="col-12 offset-0 col-sm-12 col-md-8 offset-md-2 mb-0">
        Comments<span class="bg-secondary rounded p-1 ms-1 text-white">{{
          comments.length
        }}</span>
      </h4>
    </div>
    <TransitionGroup
      appear
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div class="my-2" v-for="comment in comments" v-bind:key="comment">
        <div v-if="comments.length !== 0" class="row">
          <div class="col-12 offset-0 col-sm-12 col-md-8 offset-md-2 my-2">
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
                        <!-- <small>
                        {{ formatTime(comment.createdAt) }}
                      </small> -->
                      </div>
                    </div>
                  </div>
                  <div v-if="comment.userId === user.id" class="delete">
                    <img
                      src="@/assets/images/ic_delete.png"
                      alt="delete"
                      height="24"
                      @click="deleteComment(comment.id, id)"
                    />
                  </div>
                </div>
              </div>
              <div class="card-body">{{ comment.message }}</div>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { useEventStore } from "@/store/event";
import { storeToRefs } from "pinia";
import { onBeforeUnmount, ref } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  comments: {
    type: Array<any>,
    required: true,
  },
});

const emit = defineEmits(["updateComments"]);

const authStore = useAuthStore();
const { _user: user } = storeToRefs(authStore);
const message = ref("");

const isPosting = ref(false);
const changePostingState = () => {
  isPosting.value = !isPosting.value;
};

const eventStore = useEventStore();

const { _statusCode: statusCode } = storeToRefs(eventStore);

const createComment = async () => {
  changePostingState();
  await eventStore
    .createComment({
      message: message.value,
      eventId: props.id,
    })
    .then(() => {
      emit("updateComments");
      changePostingState();
      setTimeout(() => {
        eventStore.$patch({
          statusCode: 0,
        });
      }, 2000);
    });
};

const deleteComment = async (commentId: string, eventId: string) => {
  await eventStore.deleteComment(commentId, eventId);
};

onBeforeUnmount(() => {
  eventStore.$patch({
    statusCode: 0,
  });
});
</script>

<style scoped></style>
