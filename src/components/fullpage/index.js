import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import medical from '../../images/home-medical-program.png';
import asthma from '../../images/home-kids-asthma.png';
import opsx from '../../images/home-opsx.png';

const imgList = [
    {image: medical},
    {image: asthma},
    {image: opsx}
];

class FullPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSection: 0,
        };
    }

    componentDidMount() {
        //this.addEvent('scroll', this.handleScroll.bind(this));
        this.addEvent('mousewheel', this._handleMouseWheel.bind(this));
        this.addEvent('DOMMouseScroll', this._handleMouseWheel.bind(this));
    }

    componentWillReceiveProps(nextProps, nextState) {

    }

    addEvent(type, callback) {
        if (window.addEventListener) {
            window.addEventListener(type, callback, false)
        } else if (window.attachEvent) {
            window.attachEvent(`on${type}`, callback)
        }
    }

    handleWheel(e) {
        console.log(e)
    }

    _handleMouseWheel(e) {
        let deltaY = e.deltaY;
        if (deltaY > 0) {
            //向下滚动

        }
        console.log(e)
    }

    scrollPage(index) {
        this.setState({
            activeSection: index
        })
    }

    renderNavigation() {
        let dotList = imgList.map((item, index) =>
            <a href="javascript:;"
               onClick={this.scrollPage.bind(this, index)}
               className={this.state.activeSection === index ? 'active' : ''}
               key={index}
            />
        );
        return(
            <section className="fullpage-nav">
                <nav style={{height: imgList.length * this.props.navDotDistance + 'px'}}>
                    <section className="fullpage-nav__line" />
                    <section className="fullpage-nav__dot">
                        {dotList}
                    </section>
                </nav>
            </section>
        )
    }

    render() {
        let imgItem = imgList.map((item, index) => {
            return(
                <section
                    key={index} className="fullpage__img"
                    style={{
                        height: window.innerHeight,
                        backgroundImage: `url(${item.image})`,
                        backgroundPosition: 'center',
                        transform: `translateY(${window.innerHeight})`
                    }}>
                </section>
            )
        });
        return (
            <div>
                <section
                    onWheel = {this.handleWheel.bind(this)}
                    style={{height: window.innerHeight, overflow: 'hidden'}}
                    className="fullpage-page">
                    {imgItem}
                </section>
                {this.renderNavigation()}
            </div>

        )
    }
}

FullPage.defaultProps = {
    navDotDistance: 100,
};

FullPage.propTypes = {
    navDotDistance: PropTypes.number
};

export default FullPage;
