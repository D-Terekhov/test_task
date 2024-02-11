import { defineStore } from 'pinia'
import { insertImg } from '../utils'


export const useImageStore = defineStore('imageStore', {
    state: () => ({
        images: [],
        selected: "fit",
        cureImage: 0,
        storeImagesCount: 0
    }),
    getters: {
        countOfImages: (state) => state.images.length
    },
    actions: {
      createDB() {
        
        console.log('create')
        let openRequest = indexedDB.open('imageDB', 1);
        openRequest.onupgradeneeded = function() {
          console.log('onupgradeneeded');
          let db = openRequest.result;
          if (!db.objectStoreNames.contains('Fit')) { 
            db.createObjectStore('Fit'); 
            console.log('adas');
          }
          if (!db.objectStoreNames.contains('Images')) {
            db.createObjectStore('Images');
            console.log('Images created');
          }
          db.close();
        };  
        
        openRequest.onerror = function() {
          console.error("Error", openRequest.error);
        };
        
        openRequest.onsuccess = function() {
          
          console.log("asdad")
        }
      },
      insertFit(fit) {
        let openRequest = indexedDB.open('imageDB', 1);
        openRequest.onsuccess = function() {
          let db = openRequest.result;
          console.log("asdad")
        
          const txn = db.transaction('Fit', 'readwrite');
          const store = txn.objectStore('Fit');
          
          store.clear();

          let query = store.put(fit, 'fit');
          query.onsuccess = (e) => console.log(e);

          txn.oncomplete = function() {
            db.close();
          }
        }
      },
      async loadImgInBd() {
        this.clearImgStore();
        let i = 0;
          for (let img of this.images) {
            let openRequest = indexedDB.open('imageDB', 1);
            openRequest.onsuccess = async () => {
              let db = openRequest.result;
              
              let blob =  await insertImg(img);
              console.log(blob);
              const txn = db.transaction('Images', 'readwrite');
              const store = txn.objectStore('Images');
              let query = store.put(blob, String(i));
              i++;
              query.onsuccess = (e) => console.log(e);

              txn.oncomplete = function() {
                db.close();
              } 

            }
        }
      },
      clearImgStore() {
        let openRequest = indexedDB.open('imageDB', 1);
        openRequest.onsuccess = () => {
          let db = openRequest.result;
          const txn = db.transaction('Images', 'readwrite');
          const store = txn.objectStore('Images');
          store.clear();
          db.close();
        }
        
      },

      // storeImagesCount() {
      //   let openRequest = indexedDB.open('imageDB', 1);
      //   openRequest.onsuccess = () => {
      //     let db = openRequest.result;
      //     const txn = db.transaction('Images', 'readwrite');
      //     const store = txn.objectStore('Images');
      //     let count = store.count();
      //     count.onsuccess = () => {
      //       return count.result;
      //     }
      //   }
      // },
      loadImagesFromDb() {
        //this.images = [];
        console.log('asdasd');
        let openRequest = indexedDB.open('imageDB', 1);
        openRequest.onsuccess = () => {
        let db = openRequest.result;
        const txn = db.transaction('Images', 'readwrite');
        const store = txn.objectStore('Images');
        console.log("loadImages");
        let count = store.count();
        count.onsuccess = () => {
          this.storeImagesCount = count.result;
          console.log(this.storeImagesCount);
          for (let i = 0; i < this.storeImagesCount; i++ ){
            let request = store.get(String(i));
            request.onsuccess = () => {
              let blob = request.result;
              console.log(blob);
              var imageUrl = URL.createObjectURL(blob);
              let img = new Image();
              console.log(img);
              img.src = imageUrl;
              this.images.push(img);
              console.log(this.images);
            }
          }
        }
      
        
            
         
        
        }
      },
      
      loadFit() {
        let openRequest = indexedDB.open('imageDB', 1);
        openRequest.onsuccess = () => {
        let db = openRequest.result;
        const txn = db.transaction('Fit', 'readwrite');
        const store = txn.objectStore('Fit');
        console.log("loadFit");
        let request = store.get('fit');
        request.onsuccess = () => {
          this.selected = request.result;
          console.log(request.result);
          console.log(this.selected);
        }
        db.close();

        }    
      },
    }
   });



// let openRequest = indexedDB.open('imageDB', 1);



// openRequest.onupgradeneeded = function() {
//     console.log('adas');
//     // срабатывает, если на клиенте нет базы данных
//     // ...выполнить инициализацию...
//     let db = openRequest.result;
//     if (!db.objectStoreNames.contains('Fit')) { // если хранилище "books" не существует
//         db.createObjectStore('Fit', {autoIncrement: true}); 
//         console.log('adas');
//         // 
//     }
// };  
  
// openRequest.onerror = function() {
//   console.error("Error", openRequest.error);
// };
  
// openRequest.onsuccess = function() {
//   let db = openRequest.result;
//   console.log("asdad")

//   insertFit(db, this.selected);
//     // продолжить работу с базой данных, используя объект db
// };

// function insertFit(db, fit) {
//   const txn = db.transaction('Fit', 'readwrite');
//   const store = txn.objectStore('Fit');
//   let query = store.put(fit);
//   query.onsuccess = (e) => console.log(e);

//   txn.oncomplete = function() {
//     db.close();
//   }
// }
