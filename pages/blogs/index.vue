<template>
	<div v-if="store.isLoggedIn" class="flex justify-center mt-5">
		<NuxtLink to="/blogs/new" class="btn">
			<svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
			</svg>
			New
		</NuxtLink>
	</div>

	<div v-if="pending" class="flex flex-col items-center">
		<div class="grid m-10 lg:m-20 gap-4 lg:gap-8 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
			<div class="card w-80 lg:w-96 bg-base-200 shadow-xl" v-for="i in 9">
				<figure><div class="skeleton h-48 w-full"></div></figure>
				<div class="flex gap-4 w-full">
					<div class="card-body">
						<div class="card-title flex-row">
							<div class="skeleton h-4 w-28"></div>
							
						</div>
						<div class="skeleton h-4 w-full"></div>
						<div class="skeleton h-4 w-full"></div>


					</div>
				</div>

			</div>
		</div>
	</div>



	<div v-if="!pending" class="flex flex-col items-center">
		<div class="grid m-10 lg:m-20 gap-4 lg:gap-8 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
			<div class="card w-80 lg:w-96 bg-base-200 shadow-xl border border-slate-600" v-for="d, i in data.data">
				<figure class="w-full h-48" v-if="images[i]"><img class="" :src="images[i]" :alt="d.cover_img" /></figure>
				<figure v-else><div class="skeleton h-48 w-full"></div></figure>
					<div class="card-body">
						<h2 class="card-title">
							{{ d.name }}
						</h2>
						<h3 class="font-thin text-opacity-25">
							By {{ d.author }}
						</h3>
						<p>{{ d.description }}</p>
						<div class="card-actions justify-start">
							<div v-for="tag in d.tags.split(',')" class="badge badge-outline">{{ tag }}</div>
						</div>

						<div class=" card-actions justify-end">
							<NuxtLink :to="`/blogs/${d.name}`" class="btn btn-active btn-primary">Read More</NuxtLink>

						</div>


					</div>
	
			</div>

		</div>


	</div>



</template>

<script setup>

const store = userStore();
const images = reactive([]);

function setImagesArray() {
	for (let i = 0; i < data.value.data.length; i++) {
		getPublicUrl(data.value.data[i].cover_img).then((url) => {
			images.push(url);
		}).catch((err) => {
			console.error(err);
		})
	}
}

const { data, pending, error, refresh } = useFetch("/api/blog/getblogs", {
	method: "GET",
});

if (!pending.value && !error.value) {
	setImagesArray();
}

watch(data, (newData) => {
	if (newData) {
		setImagesArray();
	}
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

</script>