<template>
    <v-sheet rounded="lg" min-height="268" class="pa-3">
      <v-list-item-title class="text-h5 mb-1 mt-2"> Filter: </v-list-item-title>
      <v-text-field
        v-model="searchValue"
        label="Search value:"
        density="comfortable"
      ></v-text-field>
    </v-sheet>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from "vue";
  const searchValue = ref("");
  const emit = defineEmits(["searchValueChanged"]);
 
  watch(searchValue, (newValue) => {
    emit("searchValueChanged", newValue);
  });
  </script>
  