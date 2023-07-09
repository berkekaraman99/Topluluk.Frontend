<template>
  <div>
    <Transition appear @before-enter="beforeEnterTitle" @enter="enterTitle">
      <h1 class="display-6 fw-bold px-2">Arama</h1>
    </Transition>
    <div class="container">
      <div class="col-6 offset-3 d-flex justify-content-center">
        <input
          type="text"
          class="form-control form-control-lg mb-3"
          id="search"
          v-model="search.text"
          :style="{ width: search.text.length > 0 ? '100%' : '' }"
          @keydown.enter="handleSearch"
          placeholder="Arama"
        />
      </div>
      <div class="container">
        <TransitionGroup
          appear
          @before-enter="beforeEnterSearch"
          @enter="enterSearch"
          @before-leave="beforeLeaveSearch"
          @leave="leaveSearch"
        >
          <RouterLink
            :to="{ name: 'userprofile', params: { id: item.id } }"
            class="card px-4 py-3 my-4 col-12 col-sm-12 col-md-8 offset-md-2"
            v-for="(item, index) in searchItems"
            v-bind:key="item.id"
            :data-index="index"
            id="search-highlights"
          >
            <div
              class="search-user-background position-absolute top-0 start-0 end-0 bottom-0"
              :style="{
                'background-image': `url(${item.profileImage})`,
              }"
            ></div>
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <img
                  :src="item.profileImage"
                  alt="profile image"
                  class="post-profile-image me-4"
                  v-if="item.profileImage"
                />
                <img
                  src="@/assets/images/profile-man.png"
                  alt="profile-man"
                  class="post-profile-image me-4"
                  v-else-if="item.gender == 2"
                />
                <img
                  src="@/assets/images/profile-woman.png"
                  alt="profile-woman"
                  class="post-profile-image me-4"
                  v-else-if="item.gender == 1"
                />
                <img
                  src="@/assets/images/user.png"
                  alt="profile"
                  class="post-profile-image me-4"
                  v-else
                />
                <div class="tw-bg-black/50 tw-rounded px-1 py-1">
                  <div class="fw-bold text-white">
                    {{ item.firstName }} {{ item.lastName }}
                  </div>
                  <div class="text-white-50">@{{ item.userName }}</div>
                </div>
              </div>
            </div>
          </RouterLink>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { reactive } from "vue";
import { useSearchStore } from "@/stores/search";
import gsap from "gsap";

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

const beforeEnterSearch: any = (el: HTMLElement) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(100px)";
};
const enterSearch: any = (el: HTMLElement) => {
  const index = el.dataset.index ? parseInt(el.dataset.index) : 0;
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    delay: 0.1 * index,
  });
};
const beforeLeaveSearch: any = (el: HTMLElement) => {
  el.style.opacity = "1";
};
const leaveSearch: any = (el: HTMLElement) => {
  const index = el.dataset.index ? parseInt(el.dataset.index) : 0;
  gsap.to(el, {
    opacity: 0,
    y: 100,
    duration: 0.6,
    delay: 0.1 * index,
  });
};

const searchStore = useSearchStore();
const { _searchItemList: searchItems } = storeToRefs(searchStore);

const search = reactive({
  text: "",
});

const handleSearch = async () => {
  if (search.text.length > 0) {
    await searchStore.loadSearchItems(search.text);
  } else {
    searchStore.searchItemList = [];
  }
};
</script>

<style scoped lang="scss">
#search-highlights {
  text-decoration: none;
  border-radius: 8px;
}

#search {
  border-radius: 99px;
  // transition: 0.4s ease;
  transition: 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  width: 96px;

  &::before {
    width: 0px;
  }

  &::after {
    width: 100px;
  }

  &:hover {
    box-shadow: inset 0 -4px 2px -2px grey;
  }

  &:focus {
    width: 100%;
    border-radius: 4px;
    box-shadow: inset 0 -4px 2px -2px var(--color-primary);
  }
}
.card {
  background-color: rgba(0, 0, 0, 0.62);
}
</style>
