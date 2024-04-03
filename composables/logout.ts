export default async function () {
    const store = userStore();
    const response = await $fetch('/api/auth/logout', {
        method: 'POST',
    });


    if (response.success) {
        await store.checkJwt();
    }
}