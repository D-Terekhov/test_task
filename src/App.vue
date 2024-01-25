<template>
  <div id="main" ref="main" @fullscreenchange="fullscreenchange">
    <canvas id="imageCanvas" v-show="inView" ref="imageCanvas"></canvas>
    <div id="controlPanel">
      <input
        type="file"
        id="imageLoader"
        @change="arrayImageLoader"
        webkitdirectory="true"
        directory
      />
      <button @click="prew" v-if="inView">Prew</button>
      <button @click="next" v-if="inView">Next</button>
      <button @click="outFull" v-if="inView">Выйти</button>
      <button @click="view" v-else>Просмотр</button>

      <div id="select">
        <select v-model="this.selected">
          <option value="fit">Вписать</option>
          <option value="fitVert">Вписать по вертикали</option>
          <option value="fitHor">Вписать по горизонтали</option>
          <option value="default">1:1</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapWritableState } from "pinia";
import { mapActions } from "pinia";
import { useImageStore } from "./stores/ImageStore";
import { loadImage } from "./utils";

export default {
  data() {
    return {
      inView: false,
    };
  },
  computed: {
    //...mapState(useImageStore, []),
    ...mapWritableState(useImageStore, [
      "selected",
      "images",
      "countOfImages",
      "cureImage",
    ]),
  },

  methods: {
    ...mapActions(useImageStore, ["createDB"]),
    // createDB() {
    //   this.createDB;
    //   console.log("asdasd");
    // },
    next() {
      this.cureImage++;
      if (this.cureImage > this.countOfImages - 1) {
        this.cureImage = 0;
      }
      this.drawCanvasImage(this.images[this.cureImage]);
      console.log(this.countOfImages);
    },
    prew() {
      this.cureImage--;
      if (this.cureImage < 0) this.cureImage = this.countOfImages - 1;
      this.drawCanvasImage(this.images[this.cureImage]);
      console.log(this.countOfImages);
    },

    view() {
      this.inView = true;
      this.$refs.main.requestFullscreen();
      this.drawCanvasImage(this.images[this.cureImage]);
    },

    outFull() {
      document.exitFullscreen();
    },

    fullscreenchange() {
      if (
        !document.fullscreenElement &&
        !document.webkitIsFullScreen &&
        !document.mozFullScreen &&
        !document.msFullscreenElement
      ) {
        this.inView = false;
      }
    },

    async arrayImageLoader(e) {
      this.cureImage = 0;
      this.images = [];
      let files = e.target.files;
      for (let i of files) {
        this.images.push(await loadImage(i));
      }
      console.log(this.images);
    },

    drawCanvasImage(img) {
      let canvas = this.$refs.imageCanvas;
      canvas.width = window.screen.width;
      canvas.height = window.screen.height;
      let hRatio = canvas.width / img.width;
      let vRatio = canvas.height / img.height;
      let ratio = Math.min(hRatio, vRatio);
      let ctx = canvas.getContext("2d");
      console.log(
        window.innerWidth,
        window.innerHeight,
        canvas.width,
        canvas.height,
        img.width,
        img.height
      );

      switch (this.selected) {
        case "fit":
          ctx.drawImage(
            img,
            (canvas.width - img.width * ratio) * 0.5,
            (canvas.height - img.height * ratio) * 0.5,
            img.width * ratio,
            img.height * ratio
          );
          break;
        case "fitVert":
          ctx.drawImage(
            img,
            (canvas.width - img.width * vRatio) * 0.5,
            (canvas.height - img.height * vRatio) * 0.5,
            img.width * vRatio,
            img.height * vRatio
          );
          break;
        case "fitHor":
          ctx.drawImage(
            img,
            (canvas.width - img.width * hRatio) * 0.5,
            (canvas.height - img.height * hRatio) * 0.5,
            img.width * hRatio,
            img.height * hRatio
          );
          break;
        case "default":
          ctx.drawImage(
            img,
            (canvas.width - img.width) * 0.5,
            (canvas.height - img.height) * 0.5
          );
          break;
      }
    },
  },
  mounted() {
    this.createDB();
    console.log("asdasd");
  },
};
</script>

<style>
.display_none {
  display: none;
}

button {
  display: inline-block;
}

#controlPanel {
  position: absolute;
  bottom: 0;
}
</style>
