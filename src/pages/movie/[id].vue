<template>
  <v-progress-circular
    v-if="rootStore.moviesLoading"
    class="d-block mx-auto mt-10"
    indeterminate
    :size="45"
  />
  <div v-else-if="movie" class="movie-page">
    <section class="movie-data mb-10">
      <div class="movie-data__main mb-4">
        <v-img
          :alt="movie.name"
          class="mx-auto"
          cover
          height="290"
          :src="movie.image"
          width="196"
        />

        <div>
          <h1 class="mb-2" v-html="movie.name" />
          <div class="additional-wrapper" v-html="movie.additional" />
        </div>
      </div>

      <h3>Про фільм:</h3>
      <p v-html="movie.description" />
    </section>

    <MovieShows :movie-id="movieId" :movie-name="movie.name" v-bind="route.query" />
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router'
  import { useRootStore } from '@/stores'

  const route = useRoute()
  const rootStore = useRootStore()

  const movieId = +route.params.id

  const movie = computed(() => {
    const index = rootStore.movies.findIndex(({ id }) => id === movieId)

    return index !== -1 ? rootStore.movies[index] : null
  })

  onMounted(() => {
    if (movie.value) return
    rootStore.getMovies({ movie_id: movieId })
  })
</script>

<style lang="scss" scoped>
.movie-page {
  .movie-data {
    &__main {
      display: grid;
      grid-template-columns: 196px 1fr;
      grid-gap: 24px;

      @media screen and (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .additional-wrapper {
      :deep(li) {
        display: flex;
        margin-bottom: 4px;
        pointer-events: none;

        .key {
          width: 135px;
          font-weight: bold;
          flex-shrink: 0;
        }

        a {
          text-decoration: none;
          color: inherit;
        }
      }
    }
  }
}
</style>
