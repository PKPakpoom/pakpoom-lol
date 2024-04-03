import { userStore } from "~/stores/userStore";

export default defineNuxtPlugin(async ({ nuxtApp }) => {
    const store = userStore();
    await store.checkJwt();
})