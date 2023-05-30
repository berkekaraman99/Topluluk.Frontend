<template>
  <LoadingSpinner v-if="loading" />
  <div class="row" v-else-if="userCommunities.length">
    <TransitionGroup
      appear
      @before-enter="beforeEnterCommunity"
      @enter="enterCommunity"
    >
      <div
        class="col-sm-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2"
        v-for="(community, index) in userCommunities"
        v-bind:key="community.id"
        :data-index="index"
      >
        <RouterLink
          :to="{
            name: 'communitydetails',
            params: { id: community.id, name: community.title },
          }"
          class="text-decoration-none text-dark"
        >
          <div class="container shadow mb-5 rounded-3">
            <div class="row">
              <div class="col-sm-12 col-md-4 d-grid align-content-center">
                <img
                  :src="community.coverImage"
                  alt="community cover"
                  class="p-2 img-fluid rounded-4"
                  v-if="community.coverImage"
                />
                <img
                  class="my-2 rounded-3 img-fluid"
                  src="https://picsum.photos/400"
                  alt="event-image"
                  v-else
                />
              </div>

              <div class="col-sm-12 col-md-8 col lg-6">
                <div
                  class="d-flex flex-column justify-content-between rounded-4 m-2 p-2"
                >
                  <div>
                    <h3 class="fw-bold">{{ community.title }}</h3>
                    <p class="description">
                      {{
                        WordCount(community.description) < 30
                          ? community.description
                          : getDescriptionCharacters(
                              community.description
                            ).concat("...")
                      }}
                    </p>
                  </div>
                  <div>
                    <div>
                      Participiants:
                      <span class="fw-bold">{{
                        community.participiantsCount
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RouterLink>
      </div>
    </TransitionGroup>
  </div>
  <div class="my-3" v-else>
    <p class="text-center fs-5">There is no communities here...</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import gsap from "gsap";
import LoadingSpinner from "@/components/shared/LoadingVue.vue";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { useCommunityStore } from "@/store/community";

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

const authStore = useAuthStore();
const { _user: user } = storeToRefs(authStore);
const communityStore = useCommunityStore();

const loading = ref(true);
const changeLoadingState = () => {
  loading.value = !loading.value;
};
const WordCount = (str: string) => {
  return str.split(" ").length;
};
const getDescriptionCharacters = (str: string) => {
  let mainStr = "";
  for (let i = 0; i < 200; i++) {
    mainStr += str[i];
  }
  return mainStr;
};

communityStore.getUserCommunities(user.value.id).then(changeLoadingState);
const { _userCommunities: userCommunities } = storeToRefs(communityStore);
</script>

<style scoped>
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
