import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';
import nextBtn from './images/nextBtn.png';
import preBtnDisabled from './images/preBtn-disabled.png';

export default class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPageNum: props.currentPageNum
        }
    }

    //键盘按下事件
    handleKeyUp(e, pageTotal) {
        let value = e.target.value;
        let event = e || window.event;
        let code = event.keyCode || event.which || event.charCode;
        if (code === 13) { //回车键
            if (isNaN(value)) { //isNaN() 不是一个数字返回true
                alert('请输入数字！')
            } else if(value > pageTotal || value === null || value.trim() === '') { //使用trim()去掉空格，全为空格的字符串不为''也不为null
                alert('请输入合法的页码')
            } else {
                this.props.goToPage(parseInt(value)) //这里一定要将value类型转换为数字，用户手动输入页码很有可能是string。而最好在这里转换是因为已经过滤了不是数字和空的值，不会出现NaN的情况
            }
        }
    }


    render() {
        let pageTotal = Math.ceil(this.props.total / this.props.pageSize); //页码总数
        return (
            <section className="pagination">
                {this.props.currentPageNum === 1 ?
                    <span className="pagination-button">
                        <img src={preBtnDisabled} alt=""/>
                    </span>
                    :
                    <a href="javascript:void(0)" className="pagination-button pre-button" onClick={() => this.props.goToPage(this.props.currentPageNum-1)}>
                        <img src={nextBtn} alt="" style={{transform: 'rotate(180deg)'}}/>
                    </a>
                }

                <p className="pagination-pageNumber">
                    <input
                        type="text"
                        value={this.props.currentPageNum}
                        onChange={this.props.changePageNumber.bind(this)}
                        onKeyUp={(event) => this.handleKeyUp(event, pageTotal)}
                    />
                    <span>/{pageTotal}</span>
                </p>

                {this.props.currentPageNum === pageTotal ?
                    <span className="pagination-button">
                        <img src={preBtnDisabled} alt="" style={{transform: 'rotate(180deg)'}}/>
                    </span>
                    :
                    <a href="javascript:void(0)" className="pagination-button next-button" onClick={() => this.props.goToPage(this.props.currentPageNum+1)}>
                        <img src={nextBtn} alt="" />
                    </a>
                }
            </section>
        )
    }
}

Pagination.defaultProps = {
    pageSize: 5,
};

Pagination.propTypes = {
    total: PropTypes.number.isRequired, //数据总数
    pageSize: PropTypes.number, //一页显示几条数据
    currentPageNum: PropTypes.any, //当前页码,按理说应该为number型，但是用户会输入其他类型的值，导致控制台会报警告，所以我在输入的时候再判断类型
};