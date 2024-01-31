import { defineStore } from 'pinia'


export const useImageStore = defineStore('imageStore', {
    state: () => ({
        images: [],
        selected: "fit",
        cureImage: 0
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
        };  
        
        openRequest.onerror = function() {
          console.error("Error", openRequest.error);
        };
        
        openRequest.onsuccess = function() {
          let db = openRequest.result;
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
          

        }    
      }
    }
   });

 //indexedDB.deleteDatabase('imageDB')   

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
