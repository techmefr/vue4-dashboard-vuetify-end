<template>
    <v-card class="pa-2" color="blue-grey-darken-4" elevation="0">
      <v-card-title><ShowMetric :isUp="isUp" /> {{ blocValue }}</v-card-title>
      <v-card-subtitle>{{ blocTitle }}</v-card-subtitle>
    </v-card>
  </template>
  
  <script setup lang="ts">
  import ShowMetric from "../components/ShowMetric.vue";
  
  defineProps<{
    blocTitle: string;
    blocValue: string;
    isUp: Boolean;
  }>();
  </script>
  