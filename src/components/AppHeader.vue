<template>
  <header class="header position-sticky top-0">
    <v-img alt="logo" height="60" src="@/assets/logo.svg" />
    <nav role="navigation">
      <ul class="h-100 d-flex align-center justify-center">
        <li v-for="{ link, title } in navItems" :key="link" class="mx-4">
          <router-link
            class="header__link text-h6 text-decoration-none font-weight-bold"
            :to="link"
          >
            {{ title }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
  const navItems = [
    {
      link: '/',
      title: 'Головна',
    },
    {
      link: '/sessions',
      title: 'Сессії',
    },
  ]
</script>

<style scoped lang="scss">
.header {
  background-color: #121212;
  height: 60px;
  display: grid;
  grid-template-columns: 100px 1fr 100px;
  border-bottom: 1px solid #3c3c3c;
  z-index: 1;

  @media screen and (max-width: 768px) {
    grid-template-columns: 70px 1fr 70px;
  }

  &__link {
    color: #fff;
    transition: 0.3s;

    &:hover, &.router-link-active {
      opacity: 0.7;
    }
  }
}
</style>
