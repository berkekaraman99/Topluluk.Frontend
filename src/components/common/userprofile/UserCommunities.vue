<template>
  <Transition name="scaleInOut" mode="out-in">
    <LoadingSpinner v-if="loading" />
    <div class="my-5" v-else-if="userCommunities.length === 0">
      <h1 class="text-center fw-light">
        {{ t("profile.communitiesnotfound") }}
      </h1>
    </div>
    <div class="row" v-else-if="userCommunities.length > 0">
      <TransitionGroup
        appear
        @before-enter="beforeEnterCommunity"
        @enter="enterCommunity"
      >
        <div
          class="col-sm-12 col-md-10 offset-md-1 col-xl-8 offset-xl-2"
          v-for="(community, index) in userCommunities"
          v-bind:key="community.id"
          :data-index="index"
        >
          <CommunityVue :community="community" />
        </div>
      </TransitionGroup>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
import gsap from "gsap";
import LoadingSpinner from "@/components/shared/LoadingVue.vue";
import { useCommunityStore } from "@/stores/community";
import { storeToRefs } from "pinia";
import CommunityVue from "../community/CommunityVue.vue";
import { useI18n } from "vue-i18n/dist/vue-i18n.cjs";

const { t } = useI18n();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const beforeEnterCommunity: any = (el: HTMLElement) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(100px)";
};
const enterCommunity: any = (el: HTMLElement) => {
  const index = el.dataset.index ? parseInt(el.dataset.index) : 0; // "index" değerini "el.dataset.index" değerinden alıyoruz. Eğer "el.dataset.index" değeri "undefined" ise 0 olarak ayarlıyoruz.
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.2 * index,
  });
};

const communityStore = useCommunityStore();

const loading = ref(true);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

communityStore.getUserCommunities(props.id).then(changeLoadingState);
const { _userCommunities: userCommunities } = storeToRefs(communityStore);
</script>

<style scoped>
.community-img {
  background-size: cover;
  background-position: center;
  height: 208px;
  min-width: 208px;
  width: calc(100% - 16px);
  border-radius: 1em;
}

.container {
  border-radius: 1em;
  max-width: 880px;
}

.text {
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

.description {
  letter-spacing: 1px;
}
</style>
