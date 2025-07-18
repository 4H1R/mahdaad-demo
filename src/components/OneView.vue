<script setup lang="ts">
import { ref, watch } from 'vue'

interface ISettings {
  theme: 'light' | 'dark'
  fontSize: 'small' | 'medium' | 'large'
}

function useLocalStorage<T>(key: string, defaultValue: T) {
  const data = ref<T>(defaultValue)

  const storedValue = localStorage.getItem(key)
  if (storedValue) {
    try {
      data.value = JSON.parse(storedValue) as T
    } catch (e) {
      console.error('Error parsing localStorage', e)
    }
  }

  watch(
    data,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue))
    },
    { deep: true },
  )

  return data
}

const settings = useLocalStorage<ISettings>('settings', {
  theme: 'light',
  fontSize: 'medium',
})
</script>

<template>
  <p>Theme : {{ settings.theme }}</p>
</template>
