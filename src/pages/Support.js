import React, { Component } from 'react';
import '../css/support.css';
import { fetchRequestPost } from '../utils/request';

import Footer from '../components/Footer';
import Header from '../components/Header';

const programList = [
    {
        id: 1,
        name: '嘉会医疗小程序',
        icon: require('../images/support-icon2.png'),
        cover: require('../images/support-computer.png')
    },
    {
        id: 2,
        name: '嘉会儿童哮喘微信服务号',
        icon: require('../images/support-icon3.png'),
        cover: require('../images/support-computer.png')
    },
    {
        id: 5,
        name: '嘉会官网',
        icon: require('../images/support-icon1.png'),
        cover: require('../images/support-computer.png')
    }
];

class Support extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedProgram: 1, //1-小程序 2-儿童哮喘 5-嘉会官网（要与后台对应，但是又是写死的，所以！！不要骂我写的乱，不要跟我说看不懂1 2 3是啥，我也觉得这样丑爆了）
            selectedAdvice: 1, //1-提建议 2-提bug
            info: '', //建议|bug内容
        }
    }

    componentDidMount() {
        this.getEmail()
    }

    //获取邮箱
    getEmail() {
        let params = ["VKn4FWfj31DQhde+jgtQgNaevkZ/JuYOurfOASZM5VTmG0YrbJrf0KDmsnTEH/WIEWjECfNsdimnjW5tCP20eQ=="];
        fetchRequestPost('/LoginService', 'getUserIdByParseToken', params)
            .then(res => {
                if(res.result) {
                    this.email = res.result
                }
            })
            .catch(err => {
                console.log('err', err)
            })
    }

    //选择项目
    chooseProgram(proName) {
        this.setState({selectedProgram: proName})
    }

    //选择bug||建议
    chooseAdvice(advName) {
        this.setState({selectedAdvice: advName})
    }

    //提交反馈
    submit() {
        if(this.state.info === null || this.state.info.trim() === '') { //使用trim()去掉空格，全为空格的字符串不为''也不为null
            alert('请输入改进建议或bug反馈')
        } else {
            let params = [{
                projectId: this.state.selectedProgram,
                email: this.email,
                type: this.state.selectedAdvice,
                content: this.state.info
            }];
            fetchRequestPost('/SupportService', 'submitComment', params)
                .then(res => {
                    if(res.result) {
                        if (res.result.code === 0) {
                            alert('提交成功！谢谢您珍贵的建议！')
                            this.setState({info: ''})
                        }
                    }
                })
                .catch(err => {
                    console.log('err', err)
                })
        }
    }

    render() {
        let isImprove = this.state.selectedAdvice === 1;
        let isBug = this.state.selectedAdvice === 2;
        return (
            <section className="support">
                <Header/>
                <section className="support-intro">
                    <h1 className="support-intro__title--EN">Support</h1>
                    <h1 className="support-intro__title--CN">支持</h1>
                    <p className="support-intro__text--EN">Please choose the project and then give us your precious advice and feedback.</p>
                    <p className="support-intro__text--CN">请选择产品后再提出您的建议或反馈。</p>
                </section>
                <section className="support-step1">
                    <div className="support-step1__title">
                        <h2 className="support-step__title"><span />STEP&nbsp;1</h2>
                        <p>请选择项目 <img src={require('../images/support-go.png')} alt="箭头" /></p>
                    </div>
                    <section className="support-step1__program">
                        <img src={require('../images/support-computer.png')} className="support-step1__program__bg" alt="官网"/>
                        <section
                            onClick={() => this.chooseProgram(5)}
                            style={this.state.selectedProgram === 5 ? {transform: 'scale(1.2)'} : {}}
                            className="support-step1__program-item top">
                            <img src={require('../images/support-icon1.png')} alt="嘉会官网"/>
                            <p className="support-step1__program__title"><span />嘉会官网</p>
                        </section>
                        <section
                            onClick={() => this.chooseProgram(1)}
                            style={this.state.selectedProgram === 1 ? {transform: 'scale(1.2)'} : {}}
                            className="support-step1__program-item center">
                            <img src={require('../images/support-icon2.png')} alt="嘉会医疗小程序"/>
                            <p className="support-step1__program__title"><span />嘉会医疗小程序</p>
                        </section>
                        <section
                            onClick={() => this.chooseProgram(2)}
                            style={this.state.selectedProgram === 2 ? {transform: 'scale(1.2)'} : {}}
                            className="support-step1__program-item bottom">
                            <img src={require('../images/support-icon3.png')} alt="嘉会儿童哮喘微信服务号"/>
                            <p className="support-step1__program__title"><span />嘉会儿童哮喘微信服务号</p>
                        </section>
                    </section>
                </section>
                <section className="support-step2">
                    <h2 className="support-step__title" style={{marginLeft: '15%'}}><span />STEP&nbsp;2</h2>
                    <section className="support-step2__adviceBtn">
                        <button
                            className={isImprove ? 'active' : 'normal hover'}
                            onClick={() => this.chooseAdvice(1)}>
                            <img src={isImprove ? require('../images/support-advice-white.png') : require('../images/support-advice-gray.png')} alt=""/>
                            <p style={{color: isImprove ? '#fff' : '#999'}}>改进建议</p>
                        </button>
                        <button
                            className={isBug ? 'active' : 'normal hover'}
                            onClick={() => this.chooseAdvice(2)}>
                            <img src={isBug ? require('../images/support-bug-white.png') : require('../images/support-bug-gray.png')} alt=""/>
                            <p style={{color: isBug ? '#fff' : '#999'}}>Bug反馈</p>
                        </button>
                    </section>
                    <section className="support-step2__textarea">
                        <textarea
                            value={this.state.info}
                            onChange={(event) => this.setState({info: event.target.value})}
                            placeholder={`请在此填写您的${this.state.selectedAdvice === 1 ? '改进建议' : 'bug反馈'}`}>
                        </textarea>
                    </section>
                    <section className="support-step2__submitBtn">
                        <button onClick={() => this.submit()}>
                            <p>提&nbsp;交</p>
                        </button>
                    </section>
                </section>
                <Footer/>
            </section>
        );
    }
}

export default Support;