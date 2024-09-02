<template>
  <li class="cursor-pointer">
    <router-link :to="`/movie/${id}`">
      <v-img
        :alt="name"
        class="mx-2 mb-4"
        cover
        height="290"
        :src="image"
        width="196"
      />
    </router-link>
  </li>
</template>

<script setup lang="ts">
  import type { Movie } from '@/stores/root'

  const props = defineProps<Movie>()
  const { id, name, image } = props
</script>
