<template>
  <div>
    <Transition appear @before-enter="beforeEnterTitle" @enter="enterTitle">
      <h1 class="display-6 fw-bold px-2">Search</h1>
    </Transition>
    <div class="container">
      <!-- <div class="col-8 offset-2">
        <FormKit
          type="search"
          placeholder="Search..."
          prefix-icon="search"
          @keydown.enter="handleSearch"
          v-model="search.text"
          :classes="{
            wrapper: 'mw-100',
          }"
        />
      </div> -->
      <div class="col-6 offset-3 d-flex justify-content-center">
        <input
          type="text"
          class="form-control form-control-lg mb-3"
          id="search"
          v-model="search.text"
          :style="{ width: search.text.length > 0 ? '100%' : '' }"
          @keydown.enter="handleSearch"
          placeholder="Search"
        />
      </div>
      <div class="container">
        <RouterLink
          :to="{ name: 'userprofile', params: { id: item.id } }"
          class="card px-4 py-3 my-4 col-12 col-sm-12 col-md-8 offset-md-2"
          v-for="item in searchItems"
          v-bind:key="item.id"
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
              <div
                :style="{
                  'background-image': `url(${item.profileImage})`,
                }"
                alt="profile image"
                class="post-profile-image me-4"
                v-if="item.profileImage"
              ></div>
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
              <div>
                <div class="fw-bold text-white">
                  {{ item.firstName }} {{ item.lastName }}
                </div>
                <div class="text-white-50">@{{ item.userName }}</div>
              </div>
            </div>
          </div>
        </RouterLink>
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
}

#search {
  border-radius: 99px;
  transition: 0.4s ease;
  width: 96px;

  &::before {
    width: 0px;
  }

  &::after {
    width: 100px;
  }

  &:focus {
    width: 100%;
    border-radius: 0.5rem;
  }
}
.card {
  background-color: rgba(0, 0, 0, 0.62);
}
</style>
