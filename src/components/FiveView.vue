<script setup lang="ts">

</script>

<template>
    <div class="flex flex-col min-h-screen relative">
        <header class="p-4 shadow fixed w-full top-0 right-0 bg-gray-400 text-center">
            <p>Header</p>
        </header>
        <main class="flex flex-col flex-1 pt-16 pb-20">
            <p>Main</p>
            <p v-for="n in 20" :key="n">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti aut laudantium nisi velit illum inventore cupiditate voluptatibus, doloribus tempora assumenda molestias minus accusamus voluptas ducimus voluptates temporibus ad sapiente repellendus ab autem ipsum natus. Error ab voluptates quis nulla ipsa repudiandae delectus, quam, in veniam accusamus rerum dolorum. Dignissimos aliquid inventore quo quas molestiae minima reprehenderit earum minus harum autem? Quasi itaque sunt repellendus. Accusantium blanditiis distinctio, unde molestiae recusandae fugiat ea similique, corrupti dicta maiores ipsam id hic? Quisquam alias sunt iste cum ex fugiat ea quas aliquam, molestias illo illum eveniet impedit itaque obcaecati mollitia laboriosam veritatis unde?</p>
        </main>
        <footer class="p-4 shadow fixed w-full bottom-0 right-0 bg-gray-400 text-center">
            <p>footer</p>
        </footer>
    </div>
</template>
