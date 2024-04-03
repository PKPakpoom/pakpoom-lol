export default defineNuxtRouteMiddleware(async (to, from) => {
    const store = userStore();
    if (to.path === '/login' && store.isLoggedIn) {
        if (from.path === '/login') return navigateTo('/');
        return navigateTo(from.path);

    }
})