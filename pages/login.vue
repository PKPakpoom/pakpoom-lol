<template>
    <main>
        
        <div class="relative mt-44 flex justify-center items-center bg-base-100">
            <div class="relative flex flex-col justify-center p-10 xl:w-1/4 lg:w-1/3 md:w-1/2 bg-base-200 rounded-2xl">

                <div class="label">
                    <span class="label-text text-base-content">Username</span>
                </div>
                <label class="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input v-model="username" type="text" class="grow" placeholder="Username" />
                </label>

                <div class="label">
                    <span class="label-text text-base-content">Password</span>
                </div>
                <label class="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" /></svg>
                    <input v-model="password" type="password" class="grow" placeholder="Password" />
                </label>

                <div class="my-10">
                </div>

                <div class="flex justify-center">
                    <button :disabled="!username || !password" @click.stop="login(username, password)" class="btn btn-wide bg-base-300 text-base-content">LOGIN</button>

                </div>
            </div>
        </div>

    </main>

</template>

<script setup>
const username = ref("");
const password = ref("");

definePageMeta({
    middleware: "login"
});

</script>