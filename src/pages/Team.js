import React, { Component } from 'react';
import Swiper from 'swiper';

import '../css/team.css';
import Timeline from '../components/timeline';
import { fetchRequestPost } from '../utils/request';

import Footer from '../components/Footer';
import Header from '../components/Header';

class Team extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamData: [],
            eventData: []
        }
    }

    componentDidMount() {
        this.requestTeamData();
        this.requestEventData();
        new Swiper('.swiper-container', {
            slidesPerView: 6, //配置一屏显示几个
            spaceBetween: 30,
            breakpoints: {
                1500: {slidesPerView: 5},
                1200: {slidesPerView: 4}
            },
            autoplay: true
        })
    }

    componentDidUpdate() {
        //由于动态获取数据，只在componentDidMount里实例化swiper对象会导致显示不正确，所以需要在数据成功返回以后再实例化一次。
        new Swiper('.swiper-container', {
            slidesPerView: 6,
            spaceBetween: 30,
            breakpoints: {
                1500: {slidesPerView: 5},
                1200: {slidesPerView: 4}
            },
            autoplay: true
        })
    }

    //获取所有成员
    requestTeamData() {
        fetchRequestPost('/TeamService', 'getAll', '')
            .then(res => {
                if (res.result) {
                    this.setState({teamData: res.result})
                }
            })
            .catch(err => {
                console.log('err', err)
            })
    }

    //获取所有事件
    requestEventData() {
        let params = [1, 10];
        fetchRequestPost('/EventService', 'getEventsByPage', params)
            .then(res => {
                if (res.result) {
                    this.setState({eventData: res.result.data.content})
                }
            })
            .catch(err => {
                console.log('err', err)
            })
    }

    render() {
        let swiperItem = this.state.teamData && this.state.teamData.map((item, index) => {
            return (
                <section className="swiper-slide" key={index}>
                    <p className="team-intro__title">{item.title}</p>
                    <img src={item.avatarUrl} className="team-line__avatar" alt={item.nameEn}/>
                    <p className="team-intro__EN-name">{item.nameEn}</p>
                    <p className="team-intro__CN-name">{item.name}</p>
                </section>
            )
        });
        return (
            <section className="team">
                <Header/>
                <section className="team-bg">
                    <section className="team-bg__intro">
                        <h1>Team</h1>
                        <h2>团队</h2>
                        <p className="team-bg__intro--EN">You can find details of our team and events at here.</p>
                        <p className="team-bg__intro--CN">在此你可以找到更多的团队和项目信息。</p>
                    </section>
                </section>
                <section className="team-intro">
                    <section className="team-title">
                        <h1 className="team-title--english">Our Team</h1>
                        <h1 className="team-title--chinese">我们的团队</h1>
                        <div className="team-line"/>
                    </section>
                    <article className="team-description">
                        <p>
                            We provide direct billing with most major insurance companies to ensure that your visit is as
                            convenient as possible.Your medical fees at Jiahui will be paid directly by your insurance company.
                        </p>
                    </article>
                    <section className="swiper-container">
                        <section className="swiper-wrapper">
                            {swiperItem}
                        </section>
                    </section>
                </section>
                <section className="team-events">
                    <section className="team-title">
                        <h1 className="team-title--english">Events</h1>
                        <h1 className="team-title--chinese">大事件</h1>
                        <div className="team-line"/>
                    </section>
                    <article className="team-description">
                        <p>
                            Our healthcare network includes Jiahui Clinic for outpatient care, Jiahui International Hospital
                            (coming October 2017) for tertiary care, and Jiahui Wellness (coming 2018) for health management.
                        </p>
                    </article>
                    <div className="time-line">
                        <Timeline data={this.state.eventData}/>
                    </div>
                </section>
                <Footer/>
            </section>
        );
    }
}

export default Team;
