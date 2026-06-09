<script setup>
import DefaultTheme from 'vitepress/theme'
import CustomSidebarNav from './CustomSidebarNav.vue'
import HomeHero from './HomeHero.vue'
import HomeHeader from './HomeHeader.vue'
import DocHeader from './DocHeader.vue'
import TocToggle from './TocToggle.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-top>
      <HomeHeader />
      <TocToggle />
    </template>
    <template #sidebar-nav-before>
      <CustomSidebarNav />
    </template>
    <template #home-features-before>
      <HomeHero />
    </template>
    <template #doc-before>
      <DocHeader />
    </template>
  </Layout>
</template>
