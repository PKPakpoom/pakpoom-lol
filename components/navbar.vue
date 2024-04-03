<template>
    <div
        class="bg-base-200 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-75 backdrop-blur transition-shadow duration-100"
    >
        <div class="navbar w-full">
            <div class="navbar-start">
                <div class="dropdown">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 base-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </div>
                    <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
                        <li><NuxtLink to="/">Home</NuxtLink></li>
                        <li><NuxtLink to="/about">About</NuxtLink></li>
                        <li><NuxtLink to="/blogs">Blogs</NuxtLink></li>
                    </ul>

                </div>
            </div>
            <div class="navbar-center">
                <NuxtLink to="/" class="btn btn-ghost text-xl hidden sm:flex">
                    <span>
                        @PKPakpoom
                    </span>
                </Nuxtlink>
            </div>
            <div class="navbar-end">
                    <label class="flex items-center cursor-pointer gap-2">
                        <svg class="w-6 h-6 text-base-content" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z"/>
                        </svg>
                        <input :checked="isLight" data-toggle-theme="light,dark" data-act-class="ACTIVECLASS" type="checkbox" class="toggle theme-controller"/>
                        <svg class="w-6 h-6 text-base-content" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/>
                        </svg>
                    </label> 

                    <div class="divider divider-horizontal mx-0"></div>
                    
                    <div class="dropdown dropdown-bottom dropdown-end">
                        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                            <svg class="w-6 h-6 text-base-content" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            </svg>
                            
                        </div>

                        <ClientOnly>
                            <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
                                <li v-show="store.isLoggedIn" class=" menu-title"> {{ `Welcome, ${store.username}` }}</li>
                                <li v-show="!store.isLoggedIn"><NuxtLink to="/login">Login</NuxtLink></li>
                                <li v-show="store.isLoggedIn"><a @click="logout" class=" text-error">Logout</a></li>
                            </ul>
                        </ClientOnly>


                    </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>

const store = userStore();
const isLight = ref(false);

// defineNuxtConfig({
//     ssr: false
// })

onMounted(() => {
    isLight.value = localStorage.getItem('theme') === 'light' ? true : false;
});

</script>