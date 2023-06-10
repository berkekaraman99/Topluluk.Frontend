<template>
  <div class="d-flex align-items-center">
    <div class="ps-0 ps-md-0 ps-lg-3">
      <slot name="icon" />
    </div>

    <div
      class="d-block d-sm-block d-md-none d-lg-block ms-0 ms-sm-2 ms-md-2 ps-2 ps-sm-0 pe-0 pe-md-0 pe-lg-3"
    >
      <slot name="name" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
