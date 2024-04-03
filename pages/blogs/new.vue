<template>
  <div class="flex flex-col items-center m-5">
		<div>
			<h1 class="text-5xl m-5">Card Preview</h1>
		</div>

		<div class="grid m-10 lg:m-20 gap-10 md:gap-20 lg:gap-30 2xl:gap-40 grid-cols-1 md:grid-cols-2">

			<div class="card w-80 lg:w-96 bg-base-200 shadow-xl">
				<figure><img :src="uploadedImage" alt="Shoes" /></figure>
				<div class="card-body">
					<h2 class="card-title">
						{{ name }}
					</h2>
					<h3 class="font-thin text-opacity-25">
							By {{ store.username }}
					</h3>
					<p>{{ description }}</p>
					<div class="card-actions justify-start">
						<div v-for="tag in tags.split(',')" class="badge badge-outline">{{ tag }}</div> 
					</div>
					
					<div class=" card-actions justify-end">
						<button class="btn btn-active btn-primary">Read More</button>
						
					</div>
					
					
				</div>
				
			</div>

			<div class="flex flex-col gap-4 align-center 2xl:align-start">
				<label class="form-control w-full">
					<div class="label">
						<span class="label-text">Name</span>
					</div>
					<input v-model="name" type="text" placeholder="Name" class="input input-bordered w-full" />
				</label>

				<label class="form-control w-full">
					<div class="label">
						<span class="label-text">Description</span>
					</div>
					<input v-model="description" type="text" placeholder="Description" class="input input-bordered w-full" />
				</label>

				<label class="form-control w-full">
					<div class="label">
						<span class="label-text">Tags</span>
						<span class="label-text-alt">Ex. "Dev,Code"</span>
					</div>
					<input v-model="tags" type="text" placeholder="Description" class="input input-bordered w-full" />
				</label>


				<label class="form-control w-full">
					<div class="label">
						<span class="label-text">Image</span>
					</div>
					<input @change="handleFileUpload" id="img-input" type="file" accept="image/*" class="file-input file-input-primary w-full" />
				</label>

				<div v-show="errMessage" role="alert" class="alert alert-error">
					<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
					<span>{{ errMessage }}</span>
				</div>

			</div>
			
			
		</div>

		<button @click="upload" class="btn">
			<span v-show="isUploading" class="loading loading-spinner"></span>
			Upload
		</button>
  </div>


</template>


<script setup>

const store = userStore();

const uploadedImage = ref('https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg');
const isUploading = ref(false);
const errMessage = ref('');

const handleFileUpload = async (event) => {
	const file = event.target.files[0];

	if (file && file.type.startsWith('image/')) {
		const reader = new FileReader();

		reader.onload = (e) => {
			uploadedImage.value = e.target.result;
		};

		reader.readAsDataURL(file);
	} else {
		uploadedImage.value = 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg';
	}
};


const name = ref('Name');
const description = ref('Description');
const tags = ref('Dev,Code');

const formData = ref(new FormData());

async function upload() {
	errMessage.value = '';
	const fileInput = document.getElementById('img-input');
	const file = fileInput.files[0];

	if (!file) {
		errMessage.value = 'Please select an image file to upload.';
		return;
	}

	formData.value.append('image', file);
	isUploading.value = true;

	try {
		const response = await fetch('/api/blog/uploadimg', {
		method: 'POST',
				headers: {
					filename: `${name.value}-cover.${file.type.split('/')[1]}`
				},
		body: formData.value,
		});

		if (!response.ok) {
			throw new Error(`Upload failed with status: ${response.status}`);
		}

		formData.value = new FormData();
		fileInput.value = '';
		navigateTo('/blogs');
			
	} catch (error) {
		console.error('Error uploading image:', error);
	}

	// upload the blog
	const blog = {
		name: name.value,
		author: store.username,
		data: {},
		description: description.value,
		tags: {"tags": tags.value.split(',')},
		cover_img: `${name.value}-cover.${file.type.split('/')[1]}`,
	};
	try {
		const response = await $fetch('/api/blog/uploadblog', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: blog,
		});

		if (!response.statusCode === 200) {
		throw new Error(`Upload failed with status: ${response.status}`);
		}

		navigateTo('/blogs');
	} catch (error) {
		console.error('Error uploading blog:', error);
	}

}

</script>