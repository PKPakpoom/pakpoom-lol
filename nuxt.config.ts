// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    prerender: {
      autoSubfolderIndex: false
    },
  },
  ssr: false,
  routeRules: {
    "/blogs": { ssr: false },
  },

  devtools: { enabled: false },
  modules: ["@pinia/nuxt", "@nuxtjs/supabase", "@nuxtjs/tailwindcss"],
  plugins: ["~/plugins/auth.client.ts", "~/plugins/theme.ts"],

  tailwindcss: {
    viewer: false,
  },

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false,
  },

  pinia: {
    storesDirs: ['./stores/**'],
  },

  app: {
    head: {
      title: "PKPakpoom",
    }
  },

  compatibilityDate: "2024-10-25",
})