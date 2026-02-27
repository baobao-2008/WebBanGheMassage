<template>
  <div class="main-layout">
    <Header v-if="showLayout" />

    <main class="content-wrapper">
      <router-view />
    </main>

    <Footer v-if="showLayout" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

const route = useRoute();

const showLayout = computed(() => {
  const hiddenPages = ["/login", "/register","/admin","/pos","/custorner","/staff","/bill"];
  return !hiddenPages.includes(route.path);
});
</script>

<style scoped>
.content-wrapper {
  min-height: 80vh;
  padding-top: 20px;
}
</style>