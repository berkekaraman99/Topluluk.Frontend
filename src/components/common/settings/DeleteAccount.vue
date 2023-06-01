<template>
  <div
    class="modal fade"
    id="offcanvasDeleteMyAccount"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 fw-bold" id="exampleModalLabel">
            Are you sure you want to delete your account?
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>
            All your data will be deleted as soon as the deletion process starts
            on your account.
          </p>
          <span class="fst-italic">"This action cannot be undone"</span>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            No
          </button>
          <button
            type="button"
            class="btn btn-danger"
            data-bs-target="#confirmModalToggle"
            data-bs-toggle="modal"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="confirmModalToggle"
    aria-hidden="true"
    aria-labelledby="confirmModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 fw-bold" id="confirmModalToggleLabel">
            Please enter your password to continue the transaction.
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <FormKit
            type="password"
            label="Password"
            v-model="confirmPassword"
            suffix-icon="eyeClosed"
            @suffix-icon-click="handleIconClick"
            :wrapper-class="{
              'formkit-wrapper': false,
              'w-100': true,
            }"
          />
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-danger"
            @click="deleteUser"
            :disabled="isDeleting"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const handleIconClick = (node: any, e: any) => {
  node.props.suffixIcon = node.props.suffixIcon === "eye" ? "eyeClosed" : "eye";
  node.props.type = node.props.type === "password" ? "text" : "password";
};

const userStore = useUserStore();
const confirmPassword = ref("");

const isDeleting = ref(false);
const changeDeleting = () => {
  isDeleting.value = !isDeleting.value;
};

const deleteUser = async () => {
  changeDeleting();
  userStore.deleteUser(confirmPassword.value).then(changeDeleting);
};
</script>

<style scoped></style>
