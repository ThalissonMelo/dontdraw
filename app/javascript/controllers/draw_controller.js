import { Controller } from 'stimulus';
import {application} from 'controllers';
import {fabric} from 'fabric';
import Picker from 'vanilla-picker'

application.register('draw', class extends Controller {
  connect() {
      let canvas = new fabric.Canvas('myCanvas', { isDrawingMode: true });

      canvas.freeDrawingBrush.shadow = new fabric.Shadow({
        blur: parseInt(10, 10) || 0,
        offsetX: 5,
        offsetY: 5,
        affectStroke: true,
        color: 'red',
      });

    var parent = document.querySelector('#parent');
    new Picker({
      parent: parent,
      color: '#252525',
      onChange: function(color) {
        canvas.freeDrawingBrush.color = color.rgbaString
        parent.style.background = color.rgbaString;
      }
    });

    var parent2 = document.querySelector('#parent2');
    console.log(parent2)
    new Picker({
      parent: parent2,
      color: 'red',
      onChange: function(color) {
        console.log(color.rgbaString)
        console.log(canvas.freeDrawingBrush.shadow)
        canvas.freeDrawingBrush.shadow.color = color.rgbaString
        parent2.style.background = color.rgbaString;
      }
    });

    document.getElementById("myCanvas").fabric = canvas;
  }

  changeShadowWidth(event) {
    console.log(event.currentTarget.value)
    this.canvas().freeDrawingBrush.shadow.blur = parseInt(event.currentTarget.value, 10) || 1;
  }

  changeLineWidth() {
    this.canvas().freeDrawingBrush.width = parseInt(event.currentTarget.value, 10) || 1;
  }

  changeShadowOffset() {
    this.canvas().freeDrawingBrush.shadow.offsetX = parseInt(event.currentTarget.value, 10) || 0;
    this.canvas().freeDrawingBrush.shadow.offsetY = parseInt(event.currentTarget.value, 10) || 0;
  }

  clearCanvas() {
    this.canvas().clear();
  }

  canvas() {
    return document.getElementById("myCanvas").fabric;
  }
});