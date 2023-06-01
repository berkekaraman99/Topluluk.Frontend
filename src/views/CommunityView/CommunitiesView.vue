<template>
  <div>
    <Transition appear @before-enter="beforeEnterTitle" @enter="enterTitle">
      <h1 class="fw-bold display-6 px-2">Communities</h1>
    </Transition>

    <LoadingSpinner v-if="loading" />
    <div class="container" v-else>
      <div
        class="row d-flex justify-content-center align-items-center"
        v-if="communityList.length"
      >
        <TransitionGroup
          appear
          @before-enter="beforeEnterCommunity"
          @enter="enterCommunity"
        >
          <div
            class="col-12 col-sm-12 col-md-12 col-lg-6"
            v-for="(community, index) in communityList"
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
              <div class="card shadow-sm mb-5">
                <div
                  class="card-img-top"
                  :style="{
                    'background-image': 'url(' + community.coverImage + ')',
                  }"
                  v-if="community.coverImage"
                ></div>
                <div
                  class="card-img-top"
                  style="background-image: url('https://picsum.photos/800')"
                  v-else
                ></div>
                <div class="card-body">
                  <h5 class="card-title">{{ community.title }}</h5>
                  <div class="overlay">
                    <p class="text">
                      {{ community.description }}
                    </p>
                  </div>
                  <p class="card-text">
                    Participiants: {{ community.participiantsCount }}
                  </p>
                </div>
              </div>
            </RouterLink>
          </div>
        </TransitionGroup>
      </div>
      <div class="my-3" v-else>
        <h1>There is no communities here...</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import gsap from "gsap";
import LoadingSpinner from "@/components/shared/LoadingVue.vue";
import { useCommunityStore } from "@/stores/community";
import { storeToRefs } from "pinia";

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
const beforeEnterTitle: any = (el: HTMLElement) => {
  el.style.transform = "translateY(-30px)";
  el.style.opacity = "0";
};
const enterTitle: any = (el: HTMLElement, done: any) => {
  gsap.to(el, {
    duration: 1,
    y: 0,
    opacity: 1,
    ease: "bounce.out",
    onComplete: done,
  });
};
const loading = ref(true);
const changeLoadingState = () => {
  loading.value = !loading.value;
};
const communityStore = useCommunityStore();

communityStore.getCommunities().then(changeLoadingState);
const { _communityList: communityList } = storeToRefs(communityStore);
</script>

<style scoped>
.card-img-top {
  background-size: cover;
  background-position: center;
  height: 304px;
}

.image {
  display: block;
  width: 100%;
  height: auto;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.5s ease;
  background-color: black;
  border-radius: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card:hover .overlay {
  opacity: 0.9;
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
</style>
