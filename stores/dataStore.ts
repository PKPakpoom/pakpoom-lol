import { defineStore } from "pinia";
import { ref } from "vue";

export const dataStore = defineStore("Data", {
    state: () => {
        return {
            funFact: ref(""),
            isGenerated: ref(false),
            showFunFact: ref(true)
        }
    },
    actions: {
        genFact() {
            try {
                fetch('https://uselessfacts.jsph.pl/random.json?language=en').then(response => response.json()).then(data => {
                    this.funFact = data.text;
                    this.isGenerated = true;
                });
            } catch (error) {
                console.error(error);
            }
        },
        toggleFunFact() {
            this.showFunFact = !this.showFunFact;
        }
    }
    
});