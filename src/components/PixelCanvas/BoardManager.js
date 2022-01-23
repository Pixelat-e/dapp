import { isGetAccessor } from "typescript";
import { colors } from "./config";
// import * as from "./lib/gif";

export default class BoardManager {
  
  brushColor = colors[0];
  curTool = 0;
  imgRes = { width: 32, height: 32 };
  // gif = new window.GIF({
  //   workers: 2,
  //   quality: 10,
  //   width: 10 * this.imgRes.width,
  //   height: 10 * this.imgRes.height,
  // });
  constructor(canvas = null) {
    this.canvas = canvas;
  }

  getCurTool(){
    return this.curTool;
  }

  setCurTool(tool) {
    this.curTool = tool;
  }

  getCurBrushColor() {
    return this.brushColor;
  }

  setCurBrushColor(color) {
    this.brushColor = color;
  }

  setCanvas(canvas) {
    this.canvas = canvas;
  }

  setCtx(ctx) {
    this.ctx = ctx;
  }

  drawPoint(x, y, count = null) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.imgData[x][y] = this.brushColor;
      this.ctx.fillRect(
        Math.floor(x * (this.w / this.width)),
        Math.floor(y * (this.h / this.height)),
        Math.floor(this.w / this.width),
        Math.floor(this.h / this.height)
      );
      if (
        !count &&
        JSON.stringify(this.steps[this.steps.length - 1]) !==
          JSON.stringify([x, y, this.brushColor, this.ctx.globalAlpha])
      )
        this.steps.push([x, y, this.brushColor, this.ctx.globalAlpha]);
    }
  }

  filler = (x, y, cc) => {
    if (x >= 0 && x < this.imgRes.width && y >= 0 && y < this.imgRes.height) {
      if (
        JSON.stringify(this.imgData[x][y]) == JSON.stringify(cc) &&
        JSON.stringify(this.imgData[x][y]) != JSON.stringify(this.brushColor)
      ) {
        this.drawPoint(x, y);
        this.filler(x + 1, y, cc);
        this.filler(x, y + 1, cc);
        this.filler(x - 1, y, cc);
        this.filler(x, y - 1, cc);
      }
    }
  };

  erase = (x, y) => {
    var temp = this.brushColor;
    var tga = this.ctx.globalAlpha;
    this.setCurBrushColor([255, 255, 255, 255]);
    this.drawPoint(x, y);
    this.setCurBrushColor(temp);
    this.ctx.globalAlpha = tga;
  };

  setBrushColor = (color) => {
    this.ctx.globalAlpha = 1;
    this.setCurBrushColor(color);
    this.ctx.fillStyle =
      "rgba(" +
      color[0] +
      "," +
      color[1] +
      "," +
      color[2] +
      "," +
      color[3] +
      ")";
  };

  setBrushTool = (idx) => {
    // for (let idx in tools){
    //   if (tools[idx]["name"] == name){
    //     this.setCurTool(idx);
    //     break;
    //   }
    // }
    return (e, name) => {
      this.setCurTool(idx);
    };
  };

  toolCallbacks = [
    this.setBrushTool(0),
    this.setBrushTool(1),
    this.setBrushTool(2),
    this.setBrushTool(3),
    this.setBrushTool(4),
    this.setBrushTool(5),
    this.addFrame,
    this.undo,
    this.redo,
    this.clear,
    this.addImage,
    this.addImage,
    // Frames.open,
  ];

  save = () => {
    this.canvas.toBlob(function (blob) {
      var url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.download = "canvas.png";
      link.href = url;
      link.click();
    });
  };

  clear = () => {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.w, this.h);
    this.imgData = [...Array(this.width)].map((e) =>
      Array(this.height).fill([255, 255, 255, 255])
    );
    // .setcolor(this.color);
    this.setBrushMode(this.tools[0]);
  };

  addFrame = (data = null) => {
    var img = new Image();
    img.src = data || this.canvas.toDataURL();
    this.frames.push([img, this.imgData.map((inner) => inner.slice())]);
  };

  deleteFrame = (f) => {
    this.frames.splice(f, 1);
  };

  loadFrame = (f) => {
    this.clear();
    var img = this.frames[f][1];
    var tmp_color = this.color;
    var tmp_alpha = this.ctx.globalAlpha;
    this.ctx.globalAlpha = 1;
    var i, j;
    for (i = 0; i < this.width; i++) {
      for (j = 0; j < this.height; j++) {
        this.setcolor(img[i][j]);
        this.draw(i, j);
      }
    }
    this.setcolor(tmp_color);
    this.ctx.globalAlpha = tmp_alpha;
  };

  renderGIF = () => {
    this.frames.forEach((frame) => {
      this.gif.addFrame(frame[0], {
        copy: true,
        delay: 100,
      });
    });
    this.gif.render();
  };

  undo = () => {
    this.clear();
    this.redo_arr.push(this.steps.pop());
    var step;
    this.steps.forEach((step) => {
      this.setcolor(step[2]);
      this.ctx.globalAlpha = step[3];
      this.draw(step[0], step[1], true);
    });
  };

  redo = () => {
    this.steps.push(this.redo_arr.pop());
    var step;
    this.steps.forEach((step) => {
      this.setcolor(step[2]);
      this.ctx.globalAlpha = step[3];
      this.draw(step[0], step[1], true);
    });
  };

  saveInLocal = () => {
    /*let a = this.frames.map(frame=> [frame[0].src,frame[1]]);
    let f =  JSON.stringify(a);*/
    let d = {
      colors: window.colors,
      currColor: this.color,
      width: this.width,
      height: this.height,
      url: this.canvas.toDataURL(),
      steps: this.steps,
      redo_arr: this.redo_arr,
      dim: window.dim,
    };
    localStorage.setItem("pc-canvas-data", JSON.stringify(d));
  };

  addImage = () => {
    var _this = this;
    var fp = document.createElement("input");
    fp.type = "file";
    fp.click();
    fp.onchange = function (e) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
        var uimg = new Image();
        uimg.src = reader.result;
        uimg.width = _this.w;
        uimg.height = _this.h;
        uimg.onload = function () {
          var pxc = document.createElement("canvas");
          pxc.width = _this.w;
          pxc.height = _this.h;
          var pxctx = pxc.getContext("2d");
          pxctx.drawImage(uimg, 0, 0, _this.w, _this.h);
          var i, j;
          for (i = 0; i < _this.width; i++) {
            for (j = 0; j < _this.height; j++) {
              var ctr = 0;
              var avg = [0, 0, 0, 0];
              var pix = pxctx.getImageData(10 * i, 10 * j, 10, 10).data;
              pix.forEach((x, k) => {
                avg[k % 4] += x;
                if (k % 4 == 0) ctr++;
              });
              avg = avg.map((x) => ~~(x / ctr));
              _this.setcolor(avg);
              _this.draw(i, j);
            }
          }
        };
      };
    };
  };
}
