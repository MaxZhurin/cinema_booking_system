<template>
  <div class="position-relative">
    <v-progress-circular
      v-if="props.loading"
      class="loading mt-4 position-absolute"
      indeterminate
      :size="45"
    />

    <transition name="fade">
      <section
        v-if="props.availablePlaces.length > 0"
        class="movie-places position-relative"
        :class="{
          'movie-places_opacity': props.loading
        }"
      >
        <h3>Місця:</h3>

        <div
          class="movie-places__screen text-center font-weight-bold mx-auto my-2"
        >
          ЕКРАН
        </div>

        <ul class="movie-places__list">
          <li
            v-for="[{ row }, seats] in props.availablePlaces"
            :key="row"
            class="d-flex"
          >
            <v-chip
              class="movie-places__row-item position-absolute left-0 flex-shrink-0 justify-center"
              color="#707070"
              size="small"
              variant="elevated"
            >
              {{ row }}
            </v-chip>

            <ul class="d-flex ml-12">
              <v-chip
                v-for="{seat, is_free} in seats"
                :key="`${row}-${seat}`"
                class="flex-shrink-0"
                :class="{'selected-chip': isSeatSelected({row, seat})}"
                :disabled="!is_free"
                size="small"
                tag="li"
                @click="selectPlace({row, seat})"
              >
                {{ seat }}
              </v-chip>
            </ul>
          </li>
        </ul>
      </section>
    </transition>
  </div>
</template>

<script setup lang="ts">
  import type { AvailablePlaceRow, Place } from '@/stores/root'

  const emit = defineEmits<{
    selectPlace: [Place]
  }>()

  const props = defineProps<{
    loading: boolean;
    availablePlaces: AvailablePlaceRow[];
    selectedPlace: Place;
  }>()

  const isSeatSelected = ({ row, seat }: Place) => {
    return row === props.selectedPlace.row && seat === props.selectedPlace.seat
  }

  const selectPlace = ({ row, seat }: Place) => {
    emit('selectPlace', { row, seat })
  }
</script>

<style scoped lang="scss">
.loading{
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.movie-places {
  transition: 0.15s;

  &_opacity {
    opacity: 0.7;
    pointer-events: none;
  }

  &__list {
    max-width: 100%;
    overflow-x: auto;
  }

  &__row-item {
    width: 36px;
    z-index: 1;
  }

  &__screen {
    border-top: 2px solid #fff;
    border-radius: 50%;
    width: 280px;
    font-size: 14px;
  }
}
</style>
