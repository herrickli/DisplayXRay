import React from 'react';
import ReactDOM from 'react-dom';
import data from '../data.json'
import css from './index.css'
import Header from './header.js'

const requireContext = require.context("../data/Images", false, /^\.\/.*\.jpg$/);
const fullImages = requireContext.keys().map(requireContext);
const images = []
fullImages.map((item, index) => {
    images.push(item.split('/')[2])
})

Array.prototype.contains = function (obj) { 
    var index = this.length; 
    while (index--) { 
         if (this[index] === obj) { 
             return true; 
         } 
    } 
    return false; 
    }

class ImgShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            imgDivs: [],
            imagesList: images,
        };
    this.toggleHover = this.toggleHover.bind(this);
    this.showOriginImg = this.showOriginImg.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    //this.update = this.update.bind(this);
    //this.imgDivs = [];
    //this.update();
    }

    update() {
        console.log('执行', data['P00022.jpg'])
        this.state.imagesList.map((item, index) => {
            var content = data[item]['names'].join(' ');
            this.state.imgDivs.push(
                <div id={item} className='outerDiv' onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                    <img 
                        id = {'img_'+item}
                        src={require('../data/Images/' + item)} 
                        className='imgClassNotHover'
                        onClick={(event) => {this.showOriginImg(event, item)}}
                    />
                    <div id={'name_'+item} className='subNames'>{content}</div>
                </div>
            )
        })
    }
    componentWillMount() {
        //this.update()
        console.log('will mount');
    }
    componentDidMount() {
        console.log('did Mount!');
    }
    componentWillUpdate() {
        console.log('before update: images', this.state.imagesList, 'divs:', this.state.imgDivs)
        //this.update()
        console.log('after update: images', this.state.imagesList, 'divs:', this.state.imgDivs)
    }
    componentDidUpdate() {
        console.log('did update')
    }

    showOriginImg(event, item) {
        window.open('./popImg.html?id=' + item);
    }

    toggleHover(e) {
        const imgElement = ReactDOM.findDOMNode(document.getElementById('img_' + e.currentTarget.id));
        const nameElement = ReactDOM.findDOMNode(document.getElementById('name_' + e.currentTarget.id));
        if (imgElement.className == 'imgClassHover') {
            imgElement.className = 'imgClassNotHover';
            nameElement.className = 'subNamesDown';
        } else {
            imgElement.className = 'imgClassHover';
            nameElement.className = 'subNamesUp';
        }
    }
    
    handleSearch(event, item) {

        const noteDom = ReactDOM.findDOMNode(document.getElementById('note'))
        var newNames = []
        for (let name in data) {
            var tmpList = []
            data[name]['names'].map((objname, index) => {
                tmpList.push(objname.toLocaleLowerCase());
            })
            if (item.length != 0) {
                var items = item.split(' ')
                items.map((i, index) => {
                    if (tmpList.contains(i.toLocaleLowerCase())) {
                        if (!newNames.contains(name)) {
                            newNames.push(name);
                        }
                    }
                })
            }
        }
        
        if (newNames.length != 0) {
            console.log('before setState: images', this.state.imagesList, 'divs:', this.state.imgDivs)
            this.setState({imgDivs: [], imagesList: newNames});
            console.log('after setState: images', this.state.imagesList, 'divs:', this.state.imgDivs)
            noteDom.innerHTML = '已更新';
            noteDom.className='noteY';
        } else {
            noteDom.className='noteN';
            noteDom.innerHTML='未找到相关数据';
        }
        setTimeout(() => {
            noteDom.className='';
            noteDom.innerHTML='';
        }, 2000);
   
    }

    render() {
        this.update();
        console.log('render!', 'images:', this.state.imagesList, 'divs:', this.state.imgDivs)
        return (
            <div>
                <Header handleSearch={this.handleSearch} />
                <div id='popImg' className='normal'>
                    {this.state.imgDivs}
                    <img id='originImg' className='popImg' />
                </div>
                <div id='note'></div>
            </div>
        )
    }
}

ReactDOM.render(
    <ImgShow /> ,
    document.getElementById('root')
)