import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default class Timeline extends Component {

    //获取英文月份
    getEnMonth(month) {
        let EnMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return EnMonth[month]
    }

    render() {
        let item = this.props.data && this.props.data.map((item, index) => {
            console.log(item)
            let time = new Date(item.createTime * 1000);
            let year = time.getFullYear();
            let month = this.getEnMonth(time.getMonth());
            let day = time.getDate();

            return (
                <section className="time-line-item" key={index}>
                    <div className="time-line__circle"/>
                    <a href={item.id || '#'} className="time-line__a">
                        <section className="time-line__img">
                            <div
                                style={{backgroundImage: `url(${item.coverUrl})`}}
                                className="time-line__img-bg">
                                <h2>{item.name}</h2>
                            </div>
                            {/*<img src={item.coverUrl} alt={item.coverUrl}/>*/}
                        </section>
                    </a>
                    <section className="time-line__time">
                        <p className="time-line__time-month">{day} {month}</p>
                        <p className="time-line__time-year">{year}</p>
                    </section>
                </section>
            )
        });
        return (
            <section className="time-line">
                {item}
            </section>
        )
    }
}