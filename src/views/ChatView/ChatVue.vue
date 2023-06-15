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
                class="chat-users d-flex align-items-center justify-content-between my-3 py-2 mx-1 px-2 rounded-2"
                v-for="recentChat in recentChats"
                :key="recentChat.userId"
                @click="
                  () => {
                    selectUser(recentChat);
                    getUserId(recentChat.userId);
                    setUserHandle(mainUser.id.toString());
                  }
                "
              >
                <div class="d-flex">
                  <div v-if="recentChat.profileImage">
                    <div
                      :style="{
                        backgroundImage: `url(${recentChat.profileImage})`,
                      }"
                      class="chat-user-image me-3 shadow-sm"
                    ></div>
                  </div>
                  <img
                    src="@/assets/images/profile-man.png"
                    alt="profile-man"
                    class="chat-user-image me-3"
                    v-else-if="recentChat.gender == 2"
                  />
                  <img
                    src="@/assets/images/profile-woman.png"
                    alt="profile-woman"
                    class="chat-user-image me-3"
                    v-else-if="recentChat.gender == 1"
                  />
                  <img
                    src="@/assets/images/user.png"
                    alt="profile"
                    class="chat-user-image me-3"
                    v-else
                  />
                  <div>
                    <div>
                      <div class="fw-bold text-black">
                        {{ recentChat.firstName }} {{ recentChat.lastName }}
                      </div>
                      <div class="tw-text-gray-500">
                        {{ recentChat.lastMessage }}
                      </div>
                      <div class="tw-text-gray-400">
                        {{ formatTime(recentChat.lastMessageDate) }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <div
                    class="tw-text-white tw-bg-red-600 tw-text-xs chat-unread-message"
                    v-if="recentChat.unreadMessageCount > 0"
                  >
                    {{ recentChat.unreadMessageCount }}
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
                        backgroundImage: `url(${targetUser.profileImage})`,
                      }"
                      class="chat-profile-image me-3 shadow-sm"
                      v-if="targetUser.profileImage"
                    ></div>
                    <img
                      src="@/assets/images/profile-man.png"
                      alt="profile-man"
                      class="chat-profile-image me-3"
                      v-else-if="targetUser.gender == 2"
                    />
                    <img
                      src="@/assets/images/profile-woman.png"
                      alt="profile-woman"
                      class="chat-profile-image me-3"
                      v-else-if="targetUser.gender == 1"
                    />
                    <img
                      src="@/assets/images/user.png"
                      alt="profile"
                      class="chat-profile-image me-3"
                      v-else
                    />
                    <div>
                      <div class="fw-bold text-black">
                        {{ targetUser.firstName }} {{ targetUser.lastName }}
                      </div>
                    </div>
                  </div>

                  <i class="fa-solid fa-magnifying-glass"></i>
                </div>
              </div>

              <div class="chat-screen">
                <TransitionGroup name="fade" tag="div">
                  <div v-for="message in receiveMessage" :key="message._id">
                    <div
                      class="d-flex align-items-center"
                      :class="{
                        'justify-content-end': message.senderId === mainUser.id,
                      }"
                    >
                      <div class="d-flex flex-column my-1">
                        <div
                          class="chat-bubble"
                          :class="{
                            'bg-primary': message.senderId !== mainUser.id,
                            'bg-success': message.senderId === mainUser.id,
                            'align-self-end': message.senderId === mainUser.id,
                          }"
                        >
                          <div class="chat-bubble-text">
                            {{ message.content }}
                          </div>
                          <div
                            class="tw-text-gray-200 tw-text-xs d-flex justify-content-end"
                          >
                            <span>{{ formatTime(message.createdAt) }}</span>
                            <span class="ps-2" v-if="message.isUpdated"
                              >(edited)</span
                            >
                          </div>
                        </div>
                        <!-- <div
                          class="pt-1 pb-3"
                          :class="{
                            'align-self-end': message.senderId === mainUser.id,
                          }"
                        >
                          <span>{{ formatTime(message.createdAt) }}</span>
                        </div> -->
                      </div>
                    </div>
                  </div>
                </TransitionGroup>
              </div>

              <div class="chat-send">
                <input
                  id="chat-input"
                  class="form-control form-control-lg px-3"
                  type="text"
                  placeholder="Write Something"
                  @keydown.enter="message.length > 0 ? sendMessage() : null"
                  v-model="message"
                  :style="{ width: message.length > 0 ? '100%' : '' }"
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
import { inject, onMounted, ref } from "vue";
import moment from "moment";
import { useChatStore } from "@/stores/chat";

const authStore = useAuthStore();
const { _user: mainUser } = storeToRefs(authStore);

const chatStore = useChatStore();
const { _chat: chat, _recentChats: recentChats } = storeToRefs(chatStore);

const socket = inject("socket");
const connection = ref<any>(socket);

const formatTime = (time: any) => {
  return moment(time).fromNow();
};

const receiveMessage = ref(chat.value);
const userId = ref<string>("");
const message = ref<string>("");
const user = ref<any>({
  id: mainUser.value.id.toString(),
  firstName: mainUser.value.firstName,
  lastName: mainUser.value.lastName,
  profileImage: mainUser.value.profileImage,
  gender: mainUser.value.gender,
});
const targetUser = ref<any>({
  firstName: null,
  gender: null,
  id: null,
  isFollowing: null,
  lastName: null,
  profileImage: null,
  userName: null,
});
const selectUser = (user: any) => {
  targetUser.value = user;
  console.log(targetUser.value);
};

const getUserId = async (id: string) => {
  userId.value = id;
  console.log(userId.value);
  await chatStore
    .getMessageHistory(userId.value)
    .then(() => (receiveMessage.value = chat.value));
};

onMounted(() => {
  chatStore.getRecentChats();

  console.log(connection.value);

  // Kullanıcıyı sunucuya kaydetme
  connection.value.open(); // Soket bağlantısını açma
  console.log("User Effect çalıştı");

  // Socket.IO'dan gelen mesajları dinleme
  connection.value.on("receiveMessage", (message: any) => {
    console.log("Yeni mesaj:", message);
    // receiveMessage.value = (prev: any) => [...prev, message];
    receiveMessage.value.push(message);
  });

  // connection.value.on("messageUpdated", async (message: any) => {
  //   const { id, userId, content }: any = message;
  //   const result = await Message.findOneAndUpdate(
  //     { _id: id, senderId: userId },
  //     { $set: { content: content, isUpdated: true, updatedAt: Date.now() } }
  //   );

  //   var targetUser = await ConnectedUser.findOne({ userId: result.receiverId });

  //   console.log("Update result: ", result);

  //   io.to(connection.value.id)
  //     .to(targetUser.connectionId)
  //     .emit("messageUpdated", { id, content });
  // });

  // ComponentWillUnmount işlevi
  return () => {
    // Soket bağlantısını kapatma
    console.log("User Effect return çalıştı");
    connection.value.close();
  };
});

const setUserHandle = (userId: string) => {
  console.log("setUserHandle  calıstı id : " + userId);
  connection.value.emit("setUser", {
    connectionId: connection.value.id,
    id: mainUser.value.id.toString(),
    firstName: mainUser.value.firstName,
    lastName: mainUser.value.lastName,
    profileImage: mainUser.value.profileImage,
    gender: mainUser.value.gender,
  });
  user.value = {
    connectionId: connection.value.id,
    id: mainUser.value.id.toString(),
    firstName: mainUser.value.firstName,
    lastName: mainUser.value.lastName,
    profileImage: mainUser.value.profileImage,
    gender: mainUser.value.gender,
  };
  connection.value.emit("joinGroup", {
    groupId: "5",
    userId: userId,
  });
};

// Mesaj gönderme işlevi
const sendMessage = () => {
  console.log(user.value);

  const toUserId = userId.value; // Hedef kullanıcının ID'sini burada belirtin
  const newMessage = {
    from: user.value,
    to: toUserId,
    content: message.value,
    createdAt: new Date().toISOString(),
  };
  connection.value.emit("sendMessage", newMessage);
  message.value = "";
};

// const sendMessageToGroup = () => {
//   const data = {
//     groupId: "5",
//     from: user,
//     content: message,
//     createdAt: new Date().toISOString(),
//   };
//   connection.value.emit("sendMessageToGroup", data);
//   message.value = "";
// };
</script>

<style scoped lang="scss">
.card {
  border: 2px solid var(--color-primary);
  border-radius: 8px;
  height: calc(100vh - 88px);
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

.chat-message-profile-image {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: grey;
  border-radius: 99px;
  height: 32px;
  width: 32px;
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
    background-color: rgb(209, 238, 255);
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
  height: 100vh;
  width: 100%;
  padding: 1rem 8px;
  background-color: var(--color-secondary);
  overflow: auto;
}

.chat-bubble {
  border-radius: 0.4rem;
  width: fit-content;
  padding: 0.5rem 1.05rem;
}

.chat-bubble-text {
  color: var(--color-text);
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

#chat-input {
  background-color: var(--color-secondary);
  border-radius: 99px;
  width: 100%;

  transition: 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);

  &::before {
    width: 0px;
  }

  &::after {
    width: 100px;
  }

  &:focus {
    background-color: white;
    border-radius: 0.5rem;
    border-color: var(--color-primary);
    width: 100%;
  }
}

.chat-unread-message {
  height: 24px;
  width: 24px;
  border-radius: 99px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
