<template>
  <div>
    <v-text-field
      v-model="searchTerm"
      class="mb-1"
      hide-details
      label="Пошук фільмів"
      prepend-inner-icon="mdi-magnify"
      role="search"
      single-line
      variant="outlined"
    />
    <v-chip-group
      v-model="selectedGenres"
      column
      multiple
    >
      <v-chip
        v-for="title in GenreTitles"
        :key="title"
        filter
        size="small"
        text="Elevator"
        variant="outlined"
      >
        {{ title }}
      </v-chip>
    </v-chip-group>
  </div>
</template>

<script setup lang="ts">
  import debounce from 'debounce'
  import { useRootStore } from '@/stores'
  import { GenreTitles } from '@/shared/constants'

  const rootStore = useRootStore()

  const searchTerm = ref('')
  const selectedGenres = ref([])

  const performSearch = debounce(() => {
    rootStore.getMovies({ name: searchTerm.value, genres: selectedGenres.value })
  }, 500)

  watch([searchTerm, selectedGenres], performSearch)
</script>
