import { Controller } from 'stimulus';
import {application} from 'controllers';
import 'fabric';
import Picker from 'vanilla-picker';

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
    new Picker({
      parent: parent2,
      color: 'red',
      onChange: function(color) {
        canvas.freeDrawingBrush.shadow.color = color.rgbaString
        parent2.style.background = color.rgbaString;
      }
    });

    document.getElementById("myCanvas").fabric = canvas;
  }

  changeShadowWidth(event) {
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

  changeMode(event) {

    let canvas = this.canvas();

    if (event.currentTarget.value === 'hline') {

      var vLinePatternBrush = new fabric.PatternBrush(canvas);
      vLinePatternBrush.getPatternSrc = function() {

        var patternCanvas = fabric.document.createElement('canvas');
        patternCanvas.width = patternCanvas.height = 10;
        var ctx = patternCanvas.getContext('2d');

        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, 5);
        ctx.lineTo(10, 5);
        ctx.closePath();
        ctx.stroke();

        return patternCanvas;
      };

      this.canvas().freeDrawingBrush = vLinePatternBrush;
    }
    else if (event.currentTarget.value === 'vline') {
      var hLinePatternBrush = new fabric.PatternBrush(canvas);
      hLinePatternBrush.getPatternSrc = function() {

        var patternCanvas = fabric.document.createElement('canvas');
        patternCanvas.width = patternCanvas.height = 10;
        var ctx = patternCanvas.getContext('2d');

        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(5, 0);
        ctx.lineTo(5, 10);
        ctx.closePath();
        ctx.stroke();

        return patternCanvas;
      };

      this.canvas().freeDrawingBrush = hLinePatternBrush;
    }
    else if (event.currentTarget.value === 'square') {

      var squarePatternBrush = new fabric.PatternBrush(canvas);
      squarePatternBrush.getPatternSrc = function() {

        var squareWidth = 10, squareDistance = 2;

        var patternCanvas = fabric.document.createElement('canvas');
        patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
        var ctx = patternCanvas.getContext('2d');

        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, squareWidth, squareWidth);

        return patternCanvas;
      };

      this.canvas().freeDrawingBrush = squarePatternBrush;
    }
    else if (event.currentTarget.value === 'diamound') {

      var diamondPatternBrush = new fabric.PatternBrush(canvas);
      diamondPatternBrush.getPatternSrc = function() {

        var squareWidth = 10, squareDistance = 5;
        var patternCanvas = fabric.document.createElement('canvas');
        var rect = new fabric.Rect({
          width: squareWidth,
          height: squareWidth,
          angle: 45,
          fill: this.color
        });

        var canvasWidth = rect.getBoundingRect().width;

        patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
        rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });

        var ctx = patternCanvas.getContext('2d');
        rect.render(ctx);

        return patternCanvas;
      };

      this.canvas().freeDrawingBrush = diamondPatternBrush;
    }
    else {
      canvas.freeDrawingBrush = new fabric[event.currentTarget.value + 'Brush'](canvas);
    }
  }
});