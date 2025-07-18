<script setup lang="ts">
import { useProductsStore } from '@/stores/products'

const products = useProductsStore()
console.log(products.getRecommendationsForCustomer(1))
</script>

<template>
  <p>Two</p>
</template>
