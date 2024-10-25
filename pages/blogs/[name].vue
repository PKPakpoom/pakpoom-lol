<template>
    <div class="flex flex-col items-center m-5 markdown-container">
        <div>
            <h1 class="text-5xl">{{ name }}</h1>
        </div>
        <div>
            <figure class="w-full md:w-1/2 h-auto m-auto"><img class="rounded-sm" :src="publicUrl" :alt="cover_img" /></figure>
        </div>
        <div v-html="content" class="w-full md:w-1/2 h-auto rounded-lg p-4 m-5"></div>
    </div>
</template>

<script setup>
import { marked } from 'marked';
import { onMounted } from 'vue';

const route = useRoute();
const name = ref(route.params.name);

const content = ref('');
const cover_img = ref('');
const publicUrl = ref('');

onMounted(() => {
    getBlog().then((data) => {
        const blog = data.data[0];
        content.value = marked.parse(blog.content);
        cover_img.value = blog.cover_img;
        getPublicUrl(blog.cover_img).then((url) => {
            publicUrl.value = url;
        }).catch((err) => {
            console.error(err);
        })
    }).catch((err) => {
        console.error(err);
    })
})

async function getPublicUrl(filename) {
	const response = await $fetch("/api/blog/getimg",{
		method: "GET",
		headers: {
			filename: filename,
		}
	});

	return response.publicUrl;
}

async function getBlog() {
    const response = await $fetch("/api/blog/getblog",{
        method: "GET",
        headers: {
            name: name.value,
        }
    });
    return response;
}

</script>