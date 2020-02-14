import React from 'react';
import ReactDOM from 'react-dom';
import css from './header.css'

export default class HeaderSearch extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
    }

    handleClick(event) {
        let element = ReactDOM.findDOMNode(document.getElementById('searchInput'));
        var content = element.value;
        this.props.handleSearch(event, content)
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <p>X光安检图像数据库</p>
                    <div className='searchBox'>
                            <input id='searchInput' type='text'></input>
                            <button onClick={this.handleClick}>搜索</button>
                    </div>
                </div>
            </div>
        )
    }
}

