import { defineStore } from 'pinia'

export const useImageStore = defineStore('imageStore', {
    state: () => ({
        images: [],
        selected: 'fit',
        cureImage: 0
    }),
    getters: {
        countOfImages: (state) => state.images.length
    }, 
   });