<template>
  <div :class="{ 'movie-shows': !noPlaces }">
    <section class="mb-2">
      <h2 v-if="props.movieName" class="mb-2">
        Бронювання квитків на "<span v-html="props.movieName" />"
      </h2>

      <h3 class="mb-1">Доступні дати:</h3>
      <v-chip-group
        v-if="oneMovieShows"
        column
        mandatory
        :model-value="selectedDate"
        selected-class="selected-chip"
        tag="ul"
        @update:model-value="selectDate"
      >
        <v-chip
          v-for="{ showdate } in oneMovieShows"
          :key="showdate"
          class="mb-2"
          tag="li"
          :value="showdate"
        >
          {{ showdate }}
        </v-chip>
      </v-chip-group>
      <v-progress-circular v-else indeterminate />
    </section>

    <transition name="fade">
      <section v-if="daytimes.length > 0" class="mb-2">
        <h3 class="mb-1">Доступний час:</h3>
        <v-chip-group
          column
          mandatory
          :model-value="selectedTime"
          selected-class="selected-chip"
          tag="ul"
          @update:model-value="selectTime"
        >
          <v-chip
            v-for="daytime in daytimes"
            :key="daytime"
            class="mb-2"
            tag="li"
            :value="daytime"
          >
            {{ daytime }}
          </v-chip>
        </v-chip-group>
      </section>
    </transition>

    <MoviePlaces
      v-if="!noPlaces"
      :available-places="availablePlaces"
      class="mb-4"
      :loading="placesLoading"
      :selected-place="selectedPlace"
      @select-place="selectPlace"
    />

    <transition name="fade">
      <MovieCardDetail
        v-if="selectedPlace?.seat"
        class="mb-4"
        :date="selectedDate"
        :movie-id="movieId"
        :place="selectedPlace"
        :time="selectedTime"
        @reset="resetBookingSteps()"
      />
    </transition>

    <v-btn
      v-if="selectedTime && noPlaces"
      color="#ff0000"
      :to="`movie/${movieId}?date=${selectedDate}&time=${selectedTime}`"
      variant="tonal"
    >
      Перейти до бронювання
    </v-btn>
  </div>
</template>

<script setup lang="ts">
  import { useToast } from 'vue-toastification'
  import { useRootStore } from '@/stores'
  import MoviePlaces from './MoviePlaces.vue'
  import MovieCardDetail from './MovieCardDetail.vue'

  import type { AvailablePlaceRow, Place } from '@/stores/root'

  const props = defineProps<{
    movieId: number;
    movieName?: string;
    noPlaces?: boolean;
    time?: string;
    date?: string;
  }>()

  const toast = useToast()
  const rootStore = useRootStore()

  const selectedDate = ref(props.date || '')
  const selectedTime = ref(props.time || '')
  const placesLoading = ref(false)

  const selectedPlace: Ref<Place> = ref({ row: 0, seat: 0 })
  const availablePlaces: Ref<AvailablePlaceRow[]> = ref([])

  const oneMovieShows = computed(
    () => rootStore.movieShows[props.movieId] || null
  )

  const daytimes = computed(() => {
    if (oneMovieShows.value) {
      const index = oneMovieShows.value.findIndex(
        item => item.showdate === selectedDate.value
      )
      if (index !== -1) {
        return oneMovieShows.value[index].daytime.split(';')
      }
    }
    return []
  })

  onMounted(() => {
    if (props.noPlaces) return
    rootStore.getMovieShows({ movie_id: props.movieId })
    if (selectedTime.value) getAvailablePlaces()
  })

  const getAvailablePlaces = async () => {
    try {
      placesLoading.value = true

      const { data } = await rootStore.getAvailablePlaces({
        movie_id: props.movieId,
        daytime: selectedTime.value,
        showdate: selectedDate.value,
      })

      availablePlaces.value = data

      nextTick(scrollToBottom)
    } catch (error) {
      toast.error('Помілка отримання вільних місць. Будь-ласка, перезавантажте сторінку.')
    } finally {
      placesLoading.value = false
    }
  }

  const selectDate = (date: string) => {
    resetBookingSteps(false)
    selectedDate.value = date
    nextTick(scrollToBottom)
  }

  const selectTime = (time: string) => {
    selectedTime.value = time
    selectedPlace.value = { row: 0, seat: 0 }
    getAvailablePlaces()
  }

  const selectPlace = (place: Place) => {
    selectedPlace.value = place
    nextTick(scrollToBottom)
  }

  const resetBookingSteps = (resetDate: boolean = true) => {
    if (resetDate) selectedDate.value = ''
    selectedTime.value = ''
    selectedPlace.value = { row: 0, seat: 0 }
    availablePlaces.value = []
  }

  const scrollToBottom = () => {
    if (props.noPlaces) return

    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth',
    })
  }
</script>

<style lang="scss">
.movie-shows {
  min-height: 90dvh;
}

.selected-chip {
  background-color: red;
}
</style>
