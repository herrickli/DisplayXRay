import React from 'react';
import ReactDOM from 'react-dom';
import data from '../data.json'
import Zmage from 'react-zmage'
import css from './index.css'

class CanvasDemo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        imgName: '',  
        size: [0,0],
        names: [],
        boxes: [],
      };
      this.initCanvas = this.initCanvas.bind(this)
    }
    initCanvas() {
        var ele = document.getElementById('time_graph_canvas');
        var ctx = ele.getContext("2d");
        var img = new Image();
        img.src = require('../data/Images/' + this.state.imgName);
        const boxes = this.state.boxes
        const names = this.state.names
        img.onload = function() {
            ctx.drawImage(this,0,0);
            boxes.map((item, index) => {
                ctx.font = "18px bold 黑体";
                ctx.fillStyle="rgb("+Math.random()*255+","+Math.random()*255+","+Math.random()*255+")";
                ctx.strokeStyle="rgb("+Math.random()*255+","+Math.random()*255+","+Math.random()*255+")";
                ctx.lineWidth='3';
                ctx.fillText(names[index], item[0], item[1]-10);
                ctx.strokeRect(item[0], item[1], item[2]-item[0], item[3]-item[1]);
                /*
                ctx.moveTo(item[0], item[1]);
                ctx.lineTo(item[2], item[1]);
                ctx.lineTo(item[2], item[3]);
                ctx.lineTo(item[0], item[3]);
                ctx.lineTo(item[0], item[1]);
                ctx.stroke();
                */
            })
        }
    }
  
    componentDidMount() {
        var imgName = window.location.href.split('?')[1].split('=')[1];
        var imgInfo =  data[imgName];
        var height = parseInt(imgInfo['size'][0]);
        var width = parseInt(imgInfo['size'][1]);
        var names = imgInfo['names'];
        var objs = imgInfo['objects'];
        var boxes = [];
        objs.map((item, index) => {
            for (let objname in item) {
                if (objname == 'box') {
                    boxes.push(item[objname]);
                }
            }
        })
        this.setState({imgName: imgName});
        this.setState({size: [height, width]});
        this.setState({names: names});
        this.setState({boxes: boxes});
    }
    componentDidUpdate() {
        this.initCanvas();
    }

    render() {
      const width = parseInt(this.state.size[0]);
      const height = parseInt(this.state.size[1]);

      return (
        <div>
          <canvas 
            id="time_graph_canvas" 
            className='popImg'
            width={width}
            height={height} >
          </canvas>
        </div>
      )
    }
}


ReactDOM.render(
    //<img className='popImg' src={require('../data/Images/P00022.jpg')} /> ,
    <CanvasDemo />,
    document.getElementById('popimg')
)