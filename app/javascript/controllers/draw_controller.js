import { Controller } from 'stimulus'; 
import {application} from 'controllers';
import {fabric} from 'fabric';

application.register('draw', class extends Controller {
  connect() {
    function run() {
      let canvas = new fabric.Canvas('myCanvas', { isDrawingMode: true });
      let rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20
      });
    }
    
    run();
    
  }

  changeColor() {
    this.canvas.freeDrawingBrush.color = this.colorValue;
  }

  canvas() {
    return document.getElementById("mycanvas").fabric;
  }
});