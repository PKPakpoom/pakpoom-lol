// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    prerender: {
      autoSubfolderIndex: false
    },
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
    url: "https://drnjbcaxcnmzhcmyszbx.supabase.co", //process.env.SUPABASE_URL,
    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRybmpiY2F4Y25temhjbXlzemJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4NDI5NDYsImV4cCI6MjAyNjQxODk0Nn0.2gLoBrYGf35oxbKZwkep1AtdkYx1nIYaGjLEfSNUlXU", //process.env.SUPABASE_KEY,
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
