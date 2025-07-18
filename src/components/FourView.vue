<script setup lang="ts">
import axios from 'axios';
import { ref, watch } from 'vue';

interface IUser {
    id: string;
    name: string;
}

const user = ref<IUser | null>(null)
const userId = ref<string>('1')
const userCache = new Map<string, IUser>()

let abortController: AbortController;

watch(userId, async (newId) => {
    if (abortController) {
        abortController.abort()
    }

    if(!newId) {
        user.value = null
        return;
    }

    if(userCache.has(newId)) {
        user.value = userCache.get(newId)!
        return;
    }

    abortController = new AbortController();
    try {
        const resp = await axios.get<IUser>(`https://jsonplaceholder.typicode.com/users/${newId}`,{
            signal : abortController.signal
        })

        user.value = resp.data
        userCache.set(newId,resp.data)
    }catch(e) {
        if(e instanceof Error && e.name !== 'AbortError') {
            user.value = null
        }
    }

}, { immediate: true })

</script>

<template>
    <input v-model="userId" placeholder="User ID"/>
    <p>Hello {{ user?.name }}</p>
</template>
