<template>
  <div class="locale-changer">
    <!-- <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang.code">
        {{ lang.text }}
      </option>
    </select> -->
    <FormKit
      type="select"
      label="Language"
      :options="[
        { label: langs[0].text, value: langs[0].code },
        { label: langs[1].text, value: langs[1].code },
      ]"
      validation="required"
      v-model="$i18n.locale"
      :classes="{
        inner: 'rounded-1',
      }"
      @change="saveLanguageLocale($i18n.locale)"
    />
  </div>
</template>

<script setup lang="ts">
const langs = [
  { code: "tr", text: "Türkçe" },
  { code: "en", text: "English" },
];

const saveLanguageLocale = (code: string) => {
  localStorage.setItem("locale", code);
  localStorage.setItem("fallbacklocale", code);
  console.log("Locale Setted");
};
</script>

<style scoped></style>
