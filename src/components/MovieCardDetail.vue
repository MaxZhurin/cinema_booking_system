<template>
  <section>
    <h3>Ваше замовлення:</h3>

    <table>
      <tbody>
        <tr>
          <td>Дата та час:</td>
          <td>{{ date }} {{ time }}</td>
        </tr>
        <tr>
          <td>Ряд / Mісце:</td>
          <td>{{ place.row }}/{{ place.seat }}</td>
        </tr>
      </tbody>
    </table>

    <v-btn
      class="d-block mx-auto"
      color="#ff0000"
      :loading="bookPlaceLoading"
      @click="bookPlace"
    >
      Забронювати
    </v-btn>
  </section>
</template>

<script setup lang="ts">
  import { useToast } from 'vue-toastification'
  import { useRootStore } from '@/stores'

  import type { Place } from '@/stores/root'

  const props = defineProps<{
    movieId: number;
    date: string;
    time: string;
    place: Place;
  }>()
  const emit = defineEmits(['reset'])

  const toast = useToast()
  const rootStore = useRootStore()

  const bookPlaceLoading = ref(false)

  const bookPlace = async () => {
    if (bookPlaceLoading.value) return

    bookPlaceLoading.value = true

    try {
      const { data } = await rootStore.bookPlace({
        movie_id: props.movieId,
        row: props.place.row,
        seat: props.place.seat,
        showdate: props.date,
        daytime: props.time,
      })

      toast.success(
        `Ваш квиток успішно заброньовано на ${props.date} ${props.time}! 
        \nРяд - ${props.place.row}, місце - ${props.place.seat}, ключ - ${data.ticketkey}`
      )

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })

      emit('reset')
    } catch (error) {
      toast.error(`Щось не так з бронюванням! Спробуйте ще раз.`)
    } finally {
      bookPlaceLoading.value = false
    }
  }
</script>
