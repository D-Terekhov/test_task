export function loadImage(file) {
    return new Promise((resolve, reject) => {
      console.log(file);
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function (e) {
          let img = new Image();
          img.src = e.target.result;
          resolve(img);
        }
      );
      reader.readAsDataURL(file);
    });
  }

// export function insertImg(img) {
//   let xhr = new XMLHttpRequest();
//           console.log(i.src);
//   xhr.open("GET", img.src, true);
//           // console.log(xhr);
//   xhr.responseType = "blob";
//   xhr.send();
//   xhr.onload = function() {
//     let blob = xhr.response;
//     console.log(blob);
//             // Further steps will involve handling this blob.
            
//   }
  
// }

export function insertImg(img) {
  return new Promise ((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", img.src, true);
    xhr.responseType = "blob";
    xhr.send();
    xhr.onload = function() {
      let blob = xhr.response;
      resolve(blob);
    }
    
  })
}