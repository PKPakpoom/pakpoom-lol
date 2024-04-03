export default async function (username: string, password: string) {
    const store = userStore();
    const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: {
            username: username,
            password: password,
        },
    });


    if (response.success) {
        await store.checkJwt();
        await navigateTo("/");
    }
}