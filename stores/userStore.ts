import { defineStore } from "pinia";

export const userStore = defineStore("User", {
    state: () => {
        return {
            username: ref(""),
            isLoggedIn: ref(false),
        }
    },
    actions: {
        async checkJwt() {
            try {
                const response: { success: boolean; username: string} = await $fetch('/api/auth/checkjwt', {
                    method: 'POST',
                })

                if (response.success) {
                    this.username = response.username;
                    this.isLoggedIn = true;
                    
                } else {
                    this.username = "";
                    this.isLoggedIn = false;
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
    
});