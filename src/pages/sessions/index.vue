<template>
  <MoviesSearch class="mb-6" />

  <v-progress-circular
    v-if="rootStore.moviesLoading"
    class="d-block mx-auto mt-10"
    indeterminate
    :size="45"
  />

  <p v-else-if="movies.length === 0" class="text-center">Фільми не знайдено</p>

  <ul v-else class="session-list w-100">
    <v-card
      v-for="movie in movies"
      :key="movie.id"
      class="session-list__item mb-4 w-100"
      tag="li"
    >
      <v-img
        class="flex-grow-0 flex-shrink-0  mx-auto"
        cover
        height="290"
        :src="movie.image"
        width="196"
      />

      <section class="px-4 py-2">
        <router-link :to="`movie/${movie.id}`">
          <h1 v-html="movie.name" />
        </router-link>
        <p class="text-caption">Жанр: {{ GenreTitles[movie.genre] }}</p>
        <MovieShows :movie-id="movie.id" :no-places="true" />
      </section>
    </v-card>
  </ul>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia'
  import { useRootStore } from '@/stores'
  import { GenreTitles } from '@/shared/constants'

  const rootStore = useRootStore()
  const { movies } = storeToRefs(rootStore)

  onMounted(() => {
    if (movies.value.length < 2) rootStore.getMovies()
    rootStore.getMovieShows()
  })
</script>

<style lang="scss" scoped>
.session-list {
  &__item {
    display: grid;
    grid-template-columns: 196px 1fr;

    @media screen and (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
