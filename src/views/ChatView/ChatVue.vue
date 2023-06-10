<template>
  <div class="container h-100 px-3">
    <div class="row h-100 pb-3">
      <div class="card">
        <div class="col-12 h-100">
          <div class="row h-100">
            <div
              class="chat-section"
              style="background-color: var(--color-secondary)"
            >
              <div class="d-flex align-items-center my-1 mx-1">
                <div>
                  <div
                    :style="{
                      backgroundImage: `url(${mainUser.profileImage})`,
                    }"
                    class="chat-profile-image me-3 shadow-sm"
                    v-if="mainUser.profileImage"
                  ></div>
                  <img
                    src="@/assets/images/profile-man.png"
                    alt="profile-man"
                    class="chat-profile-image me-3"
                    v-else-if="mainUser.gender == 2"
                  />
                  <img
                    src="@/assets/images/profile-woman.png"
                    alt="profile-woman"
                    class="chat-profile-image me-3"
                    v-else-if="mainUser.gender == 1"
                  />
                  <img
                    src="@/assets/images/user.png"
                    alt="profile"
                    class="chat-profile-image me-3"
                    v-else
                  />
                </div>
                <div>
                  <div class="fw-bold text-black">
                    {{ mainUser.firstName }} {{ mainUser.lastName }}
                  </div>
                </div>
              </div>
              <input
                class="form-control form-control-sm rounded-5 px-3 my-3"
                type="text"
                placeholder="Search"
              />
              <div
                class="chat-users d-flex align-items-center my-3 py-2 mx-1 px-2 rounded-2"
                v-for="usr in users"
                :key="usr.id"
                @click="getUserId(usr.id)"
              >
                <div>
                  <div
                    :style="{
                      backgroundImage: `url(${usr.profileImage})`,
                    }"
                    class="chat-user-image me-3 shadow-sm"
                    v-if="usr.profileImage"
                  ></div>
                  <img
                    src="@/assets/images/profile-man.png"
                    alt="profile-man"
                    class="chat-user-image me-3"
                    v-else-if="usr.gender == 2"
                  />
                  <img
                    src="@/assets/images/profile-woman.png"
                    alt="profile-woman"
                    class="chat-user-image me-3"
                    v-else-if="usr.gender == 1"
                  />
                  <img
                    src="@/assets/images/user.png"
                    alt="profile"
                    class="chat-user-image me-3"
                    v-else
                  />
                </div>
                <div>
                  <div class="fw-bold text-black">
                    {{ usr.firstName }} {{ usr.lastName }}
                  </div>
                </div>
              </div>
            </div>
            <div class="chat-main p-0">
              <div class="chat-header">
                <div
                  class="d-flex align-items-center justify-content-between my-3 me-3"
                >
                  <div class="d-flex align-items-center">
                    <div
                      :style="{
                        backgroundImage: `url(${mainUser.profileImage})`,
                      }"
                      class="chat-profile-image me-3 shadow-sm"
                      v-if="mainUser.profileImage"
                    ></div>
                    <img
                      src="@/assets/images/profile-man.png"
                      alt="profile-man"
                      class="chat-profile-image me-3"
                      v-else-if="mainUser.gender == 2"
                    />
                    <img
                      src="@/assets/images/profile-woman.png"
                      alt="profile-woman"
                      class="chat-profile-image me-3"
                      v-else-if="mainUser.gender == 1"
                    />
                    <img
                      src="@/assets/images/user.png"
                      alt="profile"
                      class="chat-profile-image me-3"
                      v-else
                    />
                    <div>
                      <div class="fw-bold text-black">
                        {{ mainUser.firstName }} {{ mainUser.lastName }}
                      </div>
                    </div>
                  </div>

                  <i class="fa-solid fa-magnifying-glass"></i>
                </div>
              </div>

              <div class="chat-screen"></div>

              <div class="chat-send">
                <input
                  class="form-control form-control-lg rounded-5 px-3 chat-input"
                  type="text"
                  placeholder="Write Something"
                  v-model="text"
                  @keydown.enter="SendMessageAsync()"
                  :disabled="userId === ''"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { inject, onMounted, ref, watch } from "vue";
import { HubConnection } from "@microsoft/signalr";
import { useUserStore } from "@/stores/user";
import { watchEffect } from "vue";

const connection: HubConnection | any = inject("connection");
const hubConnection = ref<HubConnection>(connection);
const text = ref<string>("");
const msgList = ref<any>([]);
const idRef = ref<string>("");
const userId = ref<string>("");

const authStore = useAuthStore();
const { _user: mainUser } = storeToRefs(authStore);

const userStore = useUserStore();
userStore.getUserFollowings(mainUser.value.id.toString());
const { _userFollowings: users } = storeToRefs(userStore);

const getUserId = (id: string) => {
  userId.value = id;
  console.log(userId.value);
};

const getConnectionId = async () => {
  await hubConnection.value.invoke("getconnectionid").then((data: any) => {
    console.log("Connection Id: ", data);
    idRef.value = data;
  });
  await hubConnection.value.invoke("assignconnectionid", mainUser.value.id);
};

onMounted(() => {
  if (hubConnection.value) {
    console.log("Bağlantı Başarılı");

    getConnectionId().then((res: any) => {
      console.log("GetConnectionId then:", res);
    });
  }

  console.log(hubConnection.value);
});

watchEffect(async () => {
  if (hubConnection.value) {
    const receiveMessageHandler = (msg: any) => {
      console.log("Mesaj Alındı: ", msg);
      msgList.value = (prevMsgList: any) => [...prevMsgList, msg];
    };

    hubConnection.value.on("receiveMessage", receiveMessageHandler);

    return () => {
      hubConnection.value.off("receiveMessage", receiveMessageHandler);
    };
  }
});

const SendMessageAsync = () => {
  const user = {
    id: mainUser.value.id.toString(),
    firstName: mainUser.value.firstName.toString(),
    lastName: mainUser.value.lastName.toString(),
    profileImage: mainUser.value.profileImage!.toString(),
    gender: mainUser.value.gender.toString(),
  };

  const message = {
    from: user,
    message: text.value as string,
    createdAt: new Date(),
  };

  console.log(userId.value);
  console.log(message.message);
  console.log(hubConnection.value);

  if (hubConnection.value) {
    hubConnection.value
      .invoke("SendMessageAsync", userId.value, message)
      .then((res: any) => {
        console.log("Response", res);
      })
      .catch((error: any) => console.log(error.message));
  }
};
</script>

<style scoped lang="scss">
.card {
  border: 2px solid var(--color-primary);
  border-radius: 8px;
}

.chat-profile-image {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: grey;
  border-radius: 99px;
  height: 64px;
  width: 64px;
}

.chat-user-image {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: grey;
  border-radius: 99px;
  height: 48px;
  width: 48px;
}

.chat-users {
  transition: all 0.4s ease;
  background-color: var(--color-bg-light);

  &:hover {
    background-color: var(--color-accent);
  }
}

.chat-section {
  flex: 0 0 300px;
  border-radius: 8px;
  height: 100%;
  padding: 12px 6px;
}

.chat-main {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.chat-screen {
  height: 100%;
  width: 100%;
  background-color: var(--color-secondary);
}

.chat-header {
  width: 100%;
  border-bottom: 1px solid var(--color-secondary);
  padding: 0px 16px;
}

.chat-send {
  width: 100%;
  border-top: 1px solid var(--color-secondary);
  padding: 12px 16px;
}

.chat-input {
  transition: all 0.4s ease;
  background-color: var(--color-secondary);

  &:focus {
    background-color: white;
  }
}
</style>
