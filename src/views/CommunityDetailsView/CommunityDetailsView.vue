<template>
  <div class="container">
    <Transition name="scaleInOut" mode="out-in">
      <LoadingSpinner v-if="isLoading" />
      <div class="row mt-3" v-else>
        <div class="col-12 col-sm-12 col-md-2 col-lg-2">
          <!-- Sidebar -->
          <div
            id="sidebar"
            class="d-flex align-items-start justify-content-start flex-column flex-sm-row flex-md-column flex-lg-column"
          >
            <div
              class="nav-link d-flex align-items-center justify-content-center justify-content-lg-start"
              @click="changeCategory('About')"
              :class="{ selected: category === 'About' }"
            >
              <input
                type="radio"
                name="group-radio"
                id="radio-1"
                class="radio"
                value="radio1"
                :checked="category === 'About'"
              />
              <label for="radio-1">
                <span class="fw-bold" id="about">Hakkında</span>
              </label>
            </div>

            <div
              class="nav-link d-flex align-items-center justify-content-center justify-content-lg-start"
              @click="changeCategory('Posts')"
              :class="{ selected: category === 'Posts' }"
            >
              <input
                type="radio"
                name="group-radio"
                id="radio-2"
                class="radio"
                value="radio2"
                :checked="category === 'Posts'"
              />
              <label for="radio-2">
                <span class="fw-bold" id="posts">Gönderiler</span>
              </label>
            </div>

            <div
              class="nav-link d-flex align-items-center justify-content-center justify-content-lg-start"
              @click="changeCategory('Participiants')"
              :class="{ selected: category === 'Participiants' }"
            >
              <input
                type="radio"
                name="group-radio"
                id="radio-3"
                class="radio"
                value="radio3"
                :checked="category === 'Participiants'"
              />
              <label for="radio-3">
                <span class="fw-bold" id="participiants">Üyeler </span>
              </label>
            </div>

            <div
              class="nav-link d-flex align-items-center justify-content-center justify-content-lg-start"
              v-if="community.adminId === user.id"
              @click="changeCategory('Settings')"
              :class="{ selected: category === 'Settings' }"
            >
              <input
                type="radio"
                name="group-radio"
                id="radio-4"
                class="radio"
                value="radio4"
                :checked="category === 'Settings'"
              />
              <label for="radio-4">
                <span class="fw-bold" id="settings">Ayarlar</span>
              </label>
            </div>
          </div>
        </div>
        <!-- Community View -->
        <div class="col-12 col-sm-12 col-md-10 col-lg-10">
          <div class="card shadow-sm my-2">
            <div
              class="banner-image tw-bg-slate-100"
              :style="{
                'background-image': `url(${community.bannerImage})`,
              }"
            ></div>
            <div class="px-3 mb-3">
              <div
                class="d-flex align-items-center justify-content-between position-relative flex-column flex-md-row"
              >
                <div
                  class="d-flex align-items-center align-items-md-end flex-column flex-md-row"
                >
                  <div
                    class="cover-image p-2 mx-3 d-flex align-items-center justify-content-center shadow-sm"
                  >
                    <img
                      :src="community.coverImage"
                      alt="cover image"
                      class="img-fluid rounded-4"
                      v-if="community.coverImage != null"
                    />
                  </div>
                  <div class="my-3 my-sm-3 my-md-0 text-center text-md-start">
                    <h1 class="m-0 mb-2 fs-2">{{ community.title }}</h1>
                    <p class="fs-6 mb-0">
                      <i class="fa-solid fa-location-dot"></i>
                      {{ community.location }}
                    </p>
                    <p class="fs-6 mb-0">
                      <i class="fa-solid fa-users"></i>
                      {{ community.participiantsCount }} üye
                    </p>
                  </div>
                </div>
                <div
                  class="align-self-md-end align-self-sm-center align-self-center my-3 my-sm-3 my-md-0"
                >
                  <div v-if="community.adminId !== user.id">
                    <button
                      class="btn btn-warning"
                      type="button"
                      disabled
                      v-if="loading"
                    >
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      {{ loadingText }}
                    </button>
                    <button
                      class="btn btn-success"
                      v-else-if="!community.isParticipiant"
                      @click="join(community)"
                    >
                      Topluluğa Katıl
                    </button>
                    <button
                      class="btn btn-danger"
                      v-else
                      @click="leave(community)"
                    >
                      Topluluktan Ayrıl
                    </button>
                  </div>
                </div>
              </div>
              <br />
              <Transition mode="out-in" name="scaleInOut">
                <CommunityAbout
                  :community="community"
                  v-if="category === 'About'"
                />
                <CommunityPosts :id="id" v-else-if="category === 'Posts'" />
                <CommunityParticipiants
                  :community="community"
                  v-else-if="category === 'Participiants'"
                  :id="id"
                />
                <CommunitySettings
                  v-else-if="category === 'Settings'"
                  :id="id"
                  :adminId="community.adminId"
                />
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, onBeforeUnmount } from "vue";
import CommunityAbout from "@/components/common/community/CommunityAbout.vue";
import CommunityParticipiants from "@/components/common/community/CommunityParticipiants.vue";
import { useCommunityStore } from "@/stores/community";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import LoadingSpinner from "@/components/shared/LoadingVue.vue";
import CommunitySettings from "@/components/common/community/CommunitySettings.vue";
import type { ICommunity } from "@/models/community_model";
import CommunityPosts from "@/components/common/community/CommunityPosts.vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const isLoading = ref(true);
const loading = ref(false);
const loadingText = ref("");
const changeloadingState = (state: Ref<boolean>) => {
  state.value = !state.value;
};

const authStore = useAuthStore();
const { _user: user } = storeToRefs(authStore);

const communityStore = useCommunityStore();
communityStore.getCommunity(props.id).then(() => {
  changeloadingState(isLoading);
});
const { _community: community } = storeToRefs(communityStore);

const category = ref("About");
const changeCategory = (name: string) => {
  category.value = name;
};

const join = async (community: ICommunity) => {
  loadingText.value = "Joining...";
  changeloadingState(loading);
  await communityStore.joinCommunity(props.id).then(async () => {
    community.isParticipiant = !community.isParticipiant;
    community.participiantsCount++;
    await communityStore.getCommunityParticipiants(props.id);
    changeloadingState(loading);
  });
};

const leave = async (community: ICommunity) => {
  loadingText.value = "Leaving...";
  changeloadingState(loading);
  await communityStore.leaveCommunity(props.id).then(async () => {
    community.isParticipiant = !community.isParticipiant;
    community.participiantsCount--;
    await communityStore.getCommunityParticipiants(props.id);
    changeloadingState(loading);
  });
};

onBeforeUnmount(() => {
  communityStore.$patch({
    community: {},
    participiants: [],
  });
});
</script>

<style scoped lang="scss">
.banner-image {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 224px;
  border-top-left-radius: 1.25rem;
  border-top-right-radius: 1.25rem;
}

.cover-image {
  background-color: ghostwhite;
  border-radius: 1rem;
  height: 160px;
  width: 160px;
  position: relative;
}
.card {
  border-radius: 1.25rem;
  border: none;
}

.position-relative {
  top: -48px;
}

.fs-4 {
  transition: 0.4s all ease;
}
.radio {
  appearance: none;
}

.img-fluid {
  max-height: 144px;
  max-width: 144px;
}

#sidebar {
  border-radius: 12px;
  padding: 0.5rem 0px;
  height: fit-content;

  @media screen and (max-width: 992px) {
    width: 100%;
  }
  @media screen and (min-width: 768px) and (max-width: 992px) {
    position: fixed;
    width: fit-content;
  }
  @media screen and (max-width: 576px) {
    top: 60px;
  }
  @media screen and (min-width: 993px) {
    position: fixed;
  }
}

.nav-link {
  background-color: white;
  font-weight: 500;
  height: 40px;
  width: 100%;
  // border-radius: 0.25rem;
  transition: 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  margin: 3px 0px;
  display: flex;
  text-decoration: none;
  color: rgb(27, 27, 27);
  padding: 0px 1rem;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;

  &:hover {
    color: var(--color-primary);
    box-shadow: inset 8px 0px 0px -2px grey;
  }

  @media screen and (min-width: 993px) {
    width: 144px;
  }

  @media screen and (max-width: 992px) {
    margin: 3px 6px;
  }

  @media screen and (min-width: 768px) and (max-width: 992px) {
    padding: 0px 4px;
  }
}

.selected {
  color: var(--color-primary);
  background-color: var(--color-secondary);
  box-shadow: inset 8px 0px 0px -2px var(--color-primary);
  // border: 1px solid var(--color-primary);

  // box-shadow: 1px 1px 7px -5px black;
}
</style>
