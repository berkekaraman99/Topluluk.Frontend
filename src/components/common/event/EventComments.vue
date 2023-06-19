<template>
  <div>
    <div class="row">
      <div
        class="col-12 offset-0 col-sm-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 my-4"
      >
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
                    ? 'Yorum Oluştur'
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
      </div>
    </div>

    <div class="container" v-if="eventComments != null">
      <h4 class="col-12 offset-0 col-sm-12 col-md-8 offset-md-2 mb-2">
        Yorumlar (<span>{{ eventComments.length }}</span
        >)
      </h4>
    </div>

    <!-- COMMENTS CARD -->
    <div class="my-2" v-for="comment in eventComments" v-bind:key="comment">
      <div v-if="eventComments.length !== 0" class="row">
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
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useEventStore } from "@/stores/event";
import { storeToRefs } from "pinia";
import { onBeforeUnmount, ref } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

console.log(props.id);

const emit = defineEmits(["updateComments"]);

const authStore = useAuthStore();
const { _user: user } = storeToRefs(authStore);
const message = ref("");

const isPosting = ref(false);
const changePostingState = () => {
  isPosting.value = !isPosting.value;
};

const eventStore = useEventStore();
eventStore.getEventComments(props.id);

const { _statusCode: statusCode, _eventComments: eventComments } =
  storeToRefs(eventStore);

const createComment = async () => {
  changePostingState();
  await eventStore
    .createComment({
      message: message.value,
      eventId: props.id.toString(),
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
  /* background: linear-gradient(#f9efaf, #f7e98d);
  background: -o-linear-gradient(#f9efaf, #f7e98d);
  background: -ms-linear-gradient(#f9efaf, #f7e98d);
  background: -moz-linear-gradient(#f9efaf, #f7e98d);
  background: -webkit-linear-gradient(#f9efaf, #f7e98d); */

  &:focus {
    border-color: var(--color-primary);
  }
}
</style>
