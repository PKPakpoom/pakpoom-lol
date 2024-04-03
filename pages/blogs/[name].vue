<template>
    {{ name }}
</template>


<script setup>

const route = useRoute();
const name = ref(route.params.name);



</script>