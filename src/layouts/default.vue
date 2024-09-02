<template>
  <v-app>
    <AppHeader />
    <v-main class="pa-4 mx-auto w-100" role="main" style="max-width: 1092px;">
      <router-view />
    </v-main>

    <AppFooter />
  </v-app>
</template>
