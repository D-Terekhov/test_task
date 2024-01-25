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