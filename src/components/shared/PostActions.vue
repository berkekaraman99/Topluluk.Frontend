<template>
  <div class="row d-flex align-items-center">
    <div class="col-sm-6 col-md-3 text-center my-1 dropup-center">
      <div
        id="interactions"
        :data-bs-toggle="post.isInteracted != null ? '' : 'dropdown'"
        aria-expanded="false"
        class="d-sm-block d-md-flex align-items-center justify-content-center flex-column d-lg-block"
        @click="post.isInteracted == null ? null : removeInteraction()"
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
      <ul class="dropdown-menu shadow horizontal p-0">
        <li>
          <a
            class="dropdown-item py-3"
            :class="{
              'bg-primary text-white':
                post.isInteracted == null
                  ? false
                  : post.isInteracted.interaction === 0,
            }"
            @click="interactPost(0)"
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
            @click="interactPost(1)"
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
            @click="interactPost(2)"
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
            @click="interactPost(3)"
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
            @click="interactPost(4)"
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
        @click="savePost()"
        id="save"
        class="d-sm-block d-md-flex align-items-center justify-content-center flex-column d-lg-block"
      >
        <i class="fa-regular fa-bookmark fa-lg my-3"></i>
        Save
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "interactPost", { type, post }: any): void;
  (e: "removeInteraction", post: object): void;
  (e: "savePost", post: object): void;
}>();
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const interactPost = (type: number) => {
  emit("interactPost", { type: type, post: props.post });
};

const removeInteraction = () => {
  emit("removeInteraction", props.post);
};

const savePost = () => {
  emit("savePost", props.post);
};
</script>

<style scoped>
.horizontal.dropdown-menu.show {
  display: flex;
}

.horizontal {
  border: 1px solid var(--color-primary);
}
</style>
