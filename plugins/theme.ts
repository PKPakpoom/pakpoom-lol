import { themeChange } from "theme-change";

export default defineNuxtPlugin((nuxtApp) => {
    onNuxtReady(() => {
        if (localStorage.getItem('theme') === null) {
            localStorage.setItem('theme', 'dark');
        }
        themeChange(false);
    });

});