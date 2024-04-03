<template>
    <ClientOnly>
      <div class="flex flex-row m-auto py-4 w-3/4 lg:w-1/2">
        
        <div v-if="!DStore.isGenerated" class="skeleton alert w-full h-20 shrink-0"></div>
  
        <div v-show="DStore.showFunFact && DStore.isGenerated" role="alert" class="alert">
          <div class="tooltip" data-tip="from https://uselessfacts.jsph.pl/">
            <svg class="w-[24px] h-[24px] base-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
          </div>
          <span>{{ `Did you know? ${DStore.funFact}` }}</span>
          <button @click="DStore.toggleFunFact" class="btn btn-ghost btn-circle">
            <svg class="w-[24px] h-[24px] base-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
            </svg>
          </button>
        </div>
  
      </div>
  
    </ClientOnly>
    
  </template>
  
  
  <script setup>
  
  const DStore = dataStore();
  if (!DStore.isGenerated) {
    DStore.genFact();
  }
  
  
  </script>