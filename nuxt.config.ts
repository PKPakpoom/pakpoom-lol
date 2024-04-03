// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: "node-server",
  },
  routeRules: {
    "/blogs": { ssr: false },
  },

  devtools: { enabled: true },
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
})
