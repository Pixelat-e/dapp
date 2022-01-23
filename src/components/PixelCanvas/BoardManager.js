import { isGetAccessor } from "typescript";
import { colors, tools } from "./config";
import { Point, circle, ellipse, line } from "./utils/Shapes";
// import * as from "./lib/gif";




export default class BoardManager {
  
  brushColor = colors[0];
  curTool = tools[0];
  canvasRes = { width: 256, height: 256 };
  imgRes = { width: 32, height: 32 };
  imgData = [...Array(this.imgRes.width)].map(e => Array(this.imgRes.height).fill([255, 255, 255, 255]));
  isActive = true;
  previous_point = null;
  canvas = null;
  ctx = null;
  canvasGrid = null;

  lc = [];
  steps = [];
  redo_arr = [];
  frames = [];
  isPopup = false;

  constructor(canvas = null) {
    this.canvas = canvas;
    this.previous_point = new Point(undefined,undefined); //undefined, undefined
  }

  getCanvasRes(){
    return this.canvasRes;
  }

  //https://stackoverflow.com/questions/4938346/canvas-width-and-height-in-html5
  setCanvasRes(c_r){
    this.canvasRes = c_r;
    // canvas.height = c_r.height;
    // canvas.width = c_r.width;
  }

  getImgRes(){
    return this.imgRes;
  }

  setImgRes(c_r){
    this.imgRes = c_r;
  }

  getCurTool(){
    // console.log("Get cur tool");
    // console.log(this.curTool);
    return this.curTool;
  }

  setCurTool(idx) {
    this.curTool = tools[idx];
  }

  getCurBrushColor() {
    return this.brushColor;
  }

  setCurBrushColor(color) {
    // console.log("setCurBrushColor")
    // console.log(color)
    // console.log(this.brushColor)
    // let curColor = this.getCurBrushColor();
    this.ctx.fillStyle = "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] + ")";
    this.ctx.globalAlpha = 1; // TODO: this may not be necessary
    this.brushColor = color;
  }

  setCanvas(canvas) {
    console.log("SET CANVAS");
    this.canvas = canvas;
    this.setCtx(canvas.getContext("2d"));
    this.ctx.fillStyle = "black";  //TODO:
    this.ctx.globalAlpha = 1;
    this.ctx.fillRect(0, 0, this.canvasRes.width, this.canvasRes.height);
  }

  setCtx(ctx) {
    this.ctx = ctx;
  }
  get_grid_size = () => {
    let imgRes = this.getImgRes();
    let canvasRes = this.getCanvasRes();
    let w = canvasRes.width / imgRes.width;
    return `${w}px ${w}px`
  }
  getCanvasGrid(){
    return this.canvasGrid;
  }

  setCanvasGrid(el){
    this.canvasGrid = el;
  }

  setCanvasGridSize(){
    this.canvasGrid.style.backgroundSize = this.get_grid_size();
  }

  drawPoint(x, y, count = false) {
    console.log(`DRAW POINT: ${x}, ${y}`)
    console.log(this.imgRes);
    if (x >= 0 && x < this.imgRes.width && y >= 0 && y < this.imgRes.height) {
      console.log("VALID POINT")
      this.imgData[x][y] = this.brushColor;
      // console.log(this.imgData)
      console.log(this.ctx)
      console.log(this.canvasRes)
      let scaleRatio = this.canvasRes.width / this.imgRes.width;
      console.log(`scaleRatio: ${scaleRatio}, ${x * scaleRatio}, ${y * scaleRatio}`)
      this.ctx.fillRect(
        x * scaleRatio,
        y * scaleRatio,
        scaleRatio,
        scaleRatio
        // Math.floor(x * scaleRatio),
        // Math.floor(y * scaleRatio),
        // Math.floor(scaleRatio),
        // Math.floor(scaleRatio)
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
        this.setCurBrushColor(img[i][j]);
        this.draw(i, j);
      }
    }
    this.setCurBrushColor(tmp_color);
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
      this.setCurBrushColor(step[2]);
      this.ctx.globalAlpha = step[3];
      this.draw(step[0], step[1], true);
    });
  };

  redo = () => {
    this.steps.push(this.redo_arr.pop());
    var step;
    this.steps.forEach((step) => {
      this.setCurBrushColor(step[2]);
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
              _this.setCurBrushColor(avg);
              _this.draw(i, j);
            }
          }
        };
      };
    };
  };

  canvasMouseMove = (e) => {
    // console.log("MOUSE MOVE");
    // console.log(`is active? ${this.isActive}`)
    if (this.isActive) {
      let imgRes = this.imgRes;
      let canvas = this.canvas;
      console.log(this.canvas)
      var rect = canvas.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      let scaleRatio =  this.imgRes.width / this.canvasRes.width;
      x = Math.floor(scaleRatio * x);//Math.floor((imgRes.width * x) / canvas.clientWidth);
      y = Math.floor(scaleRatio * y);//Math.floor((imgRes.height * y) / canvas.clientHeight);
      if (this.getCurTool()["name"] == "Pen") {
        var p = new Point(x, y);
        if (!p.equals(this.previous_point)) {
          this.previous_point = p;
          this.drawPoint(p.x, p.y);
          // board_manager.drawPoint();
        }
      } else if (this.getCurTool()["name"] == "Eraser") { //TODO, titally wrong
        this.erase(x, y);
      }
    }
  }

  canvasMouseDown = (e) => {
    this.previous_point = new Point(undefined,undefined)
    this.isActive = true;
    console.log("Active")
  }

  canvasMouseUp = (e) => {
    this.previous_point = new Point(undefined,undefined)
    this.isActive = false;
    console.log("Active false")
    if (this.previous_point.x !== undefined) {
      return; // Don't re-paint the last point in a streak
    }

    var rect = this.canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    let scaleRatio =  this.imgRes.width / this.canvasRes.width;
    x = Math.floor(scaleRatio * x);//Math.floor((imgRes.width * x) / canvas.clientWidth);
    y = Math.floor(scaleRatio * y);//Math.floor((imgRes.height * y) / canvas.clientHeight);
    if (this.getCurTool()["name"] == "Fill") {
      console.log(`Filler: ${x}, ${y}`)
      this.filler(x, y, this.imgData[x][y]);
    } else if (this.getCurTool()["name"] == "Eraser") {
      var temp = this.color;
      var tga = this.ctx.globalAlpha;
      this.setCurBrushColor([255, 255, 255, 255]);
      this.drawPoint(x, y);
      this.setCurBrushColor(temp);
      this.ctx.globalAlpha = tga;
    } else if (this.getCurTool()["name"] == "Line") {
      this.lc.push(new Point(x, y));
      if (this.lc.length == 2) {
        var lp = line(this.lc[0], this.lc[1]);
        this.lc = [];
        var p;
        for (p of lp) this.draw(p.x, p.y);
      }
    } else if (this.getCurTool()["name"] == "Circle") {
      var centre = new Point(x, y);
      var radius = +prompt("radius?");
      var lp = circle(radius, centre);
      var p;
      for (p of lp) this.draw(p.x, p.y);
    } else if (this.getCurTool()["name"] == "Ellipse") {
      var center = new Point(x, y);
      var radiusX = +prompt("X radius?");
      var radiusY = +prompt("Y radius?");
      var lp = ellipse(radiusX, radiusY, center);
      for (p of lp)
        this.draw(p.x, p.y);
    } else {
      this.previous_point = new Point(x,y);
      this.drawPoint(x, y);
    }
  }

  newProject = () =>{
    localStorage.removeItem('pc-canvas-data');
  }



  handleWindowResize(){
    console.log(this.canvas)
    // let bounds = this.canvas.getBoundingClientRect();
    // this.canvasRes.width = bounds.clientWidth;
    // this.canvasRes.height = bounds.clientHeight;

    this.canvas.width = this.canvasRes.width;
    this.canvas.height = this.canvasRes.height;
    this.canvasGrid.style.width = `${this.canvasRes.width}px`;
    this.canvasGrid.style.height = `${this.canvasRes.height}px`;

    this.setCanvasGridSize();
  }

}
