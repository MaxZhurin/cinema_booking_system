<template>
  <v-progress-circular
    v-if="rootStore.moviesLoading"
    class="d-block mx-auto mt-10"
    indeterminate
    :size="45"
  />
  <ul v-else class="d-flex flex-wrap justify-center">
    <MovieListItem v-for="movie in movies" :key="movie.id" v-bind="movie" />
  </ul>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia'
  import { useRootStore } from '@/stores'

  const rootStore = useRootStore()
  const { movies } = storeToRefs(rootStore)

  onMounted(rootStore.getMovies)
</script>
