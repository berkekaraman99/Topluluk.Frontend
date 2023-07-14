<template>
  <div class="row d-flex align-items-center">
    <div class="col-12 col-sm-6 col-md-3 text-center my-1 dropup-center">
      <div
        id="interactions"
        :data-bs-toggle="post.isInteracted != null ? '' : 'dropdown'"
        aria-expanded="false"
        class="d-sm-block d-md-flex align-items-center justify-content-center flex-column d-lg-block"
        @click="post.isInteracted == null ? null : removeInteraction(post)"
      >
        <div v-if="post.isInteracted == null">
          <i class="fa-regular fa-face-smile fa-lg my-3"></i>
          <div>{{ t("feed.interact") }}</div>
        </div>
        <div v-else-if="post.isInteracted.interaction === 0">
          <img
            src="@/assets/images/interactions/ic_like.png"
            alt="Like"
            height="32"
          />
          <div>{{ t("feed.liked") }}</div>
        </div>
        <div v-else-if="post.isInteracted.interaction === 1">
          <img
            src="@/assets/images/interactions/ic_celebrate.png"
            alt="Like"
            height="32"
          />
          <div>{{ t("feed.congratulations") }}</div>
        </div>
        <div v-else-if="post.isInteracted.interaction === 2">
          <img
            src="@/assets/images/interactions/ic_support.png"
            alt="Like"
            height="32"
          />
          <div>{{ t("feed.supportive") }}</div>
        </div>
        <div v-else-if="post.isInteracted.interaction === 3">
          <img
            src="@/assets/images/interactions/ic_insight.png"
            alt="Like"
            height="32"
          />
          <div>{{ t("feed.insightfull") }}</div>
        </div>
        <div v-else-if="post.isInteracted.interaction === 4">
          <img
            src="@/assets/images/interactions/ic_dislike.png"
            alt="Like"
            height="32"
          />
          <div>{{ t("feed.disliked") }}</div>
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
            @click="interactPost(0, post)"
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
            @click="interactPost(1, post)"
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
            @click="interactPost(2, post)"
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
            @click="interactPost(3, post)"
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
            @click="interactPost(4, post)"
            ><img
              src="@/assets/images/interactions/ic_dislike.png"
              alt="Dislike"
              height="32"
          /></a>
        </li>
      </ul>
    </div>
    <div class="col-12 col-sm-6 col-md-3 text-center my-1">
      <RouterLink
        :to="{ name: 'postcomments', params: { id: post.id } }"
        class="text-decoration-none text-black"
      >
        <div
          id="comments"
          class="d-sm-block d-md-flex align-items-center justify-content-center flex-column d-lg-block"
        >
          <i class="fa-regular fa-message fa-lg my-3"></i>
          <div>{{ post.commentCount }} {{ t("feed.comments") }}</div>
        </div>
      </RouterLink>
    </div>
    <div class="col-12 col-sm-6 col-md-3 text-center my-1">
      <div
        id="share"
        class="d-sm-block d-md-flex align-items-center justify-content-center flex-column d-lg-block"
      >
        <i class="fa-regular fa-paper-plane fa-lg my-3"></i>
        <div>{{ t("feed.share") }}</div>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-md-3 text-center my-1">
      <div
        v-if="post.isSaved"
        id="save"
        class="d-sm-block d-md-flex align-items-center justify-content-center flex-column d-lg-block"
      >
        <i class="fa-solid fa-bookmark fa-lg my-3"></i>
        <div>{{ t("feed.saved") }}</div>
      </div>
      <div
        v-else
        @click="savePost(post)"
        id="save"
        class="d-sm-block d-md-flex align-items-center justify-content-center flex-column d-lg-block"
      >
        <i class="fa-regular fa-bookmark fa-lg my-3"></i>
        <div>{{ t("feed.save") }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IFeedPost } from "@/models/feed_post_model";
import type { IInteractionPreview } from "@/models/interaction_preview_model";
import type { IPostModel } from "@/models/post_model";
import { usePostStore } from "@/stores/post";
import type { PropType } from "vue";
import { ref } from "vue";

import { useI18n } from "vue-i18n/dist/vue-i18n.cjs";

const { t } = useI18n();

const props = defineProps({
  post: {
    type: Object as PropType<IPostModel> | PropType<IFeedPost>,
    required: true,
  },
});

const interactionId = ref<number | null>(
  props.post.isInteracted != null ? props.post.isInteracted.interaction : null
);

const postStore = usePostStore();

const interactPost = async (type: number, post: IPostModel | IFeedPost) => {
  if (post.isInteracted == null) {
    await postStore
      .interactionPost({
        interactionType: type,
        targetId: post.id,
      })
      .then(() => {
        for (const item of post.interactionPreviews) {
          if (post.interactionPreviews == null) {
            post.interactionPreviews = [
              {
                interaction: type,
                interactionCount: 1,
              },
            ];
            break;
          } else if (
            post.interactionPreviews.length < 3 &&
            item.interaction !== type
          ) {
            post.interactionPreviews.push({
              interaction: type,
              interactionCount: 1,
            });
            break;
          }
        }

        post.interactionCount++;
        post.isInteracted = {
          interaction: type,
        };
        interactionId.value = type;
      });
  }
};

const removeInteraction = async (post: IPostModel | IFeedPost) => {
  if (interactionId.value != null) {
    await postStore.removeInteractionPost(post.id).then(() => {
      for (const item of post.interactionPreviews) {
        if (
          post.interactionPreviews.length <= 3 &&
          item.interaction === interactionId.value &&
          item.interactionCount <= 1
        ) {
          post.interactionPreviews = post.interactionPreviews.filter(
            (e: IInteractionPreview) => e.interaction != interactionId.value
          );
          break;
        }
      }

      post.interactionCount--;
      post.isInteracted = null;
    });
  }
};

const savePost = async (post: IPostModel | IFeedPost) => {
  await postStore.savePost(post.id).then(() => {
    post.isSaved = true;
  });
};
</script>

<style scoped lang="scss">
.horizontal.dropdown-menu.show {
  display: flex;
}

.horizontal {
  border: 1px solid var(--color-primary);
}

.dropdown-menu {
  transition: all 0.3s ease;
  animation-name: translateUp;
}

.dropdown-item {
  transition: all 0.3s ease;
  border-radius: 0.5rem;
  &:hover {
    transform: scale(110%);
  }
}
</style>
