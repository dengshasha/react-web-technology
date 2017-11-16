import React, { Component } from 'react';

import '../css/footer.css';

class Footer extends Component {
    constructor(props) {
        super(props);
        //控制footer的高度，首屏需要屏幕高度的50%，其他屏按固定高度
        this.footerHeight = props.isHome ? '50%' : '440px';
        this.footerTopHeight = props.isHome ? 'calc(100% - 50px)' : '390px';
    }
    render() {
        return (
            <footer style={{height: this.footerHeight}}>
                <section className="footer--top" style={{height: this.footerTopHeight}}>
                    <section className="footer--top__item">
                        <h4 className="footer--top__icon-product">产品</h4>
                        <div className="footer--top-margin">
                            <div className="footer--top__line"/>
                            <ul>
                                <li><p><a href="">嘉会医疗官网</a></p></li>
                                <li><p><a href="">嘉会研发技术网</a></p></li>
                                <li><p><a href="">嘉会医疗微信小程序</a></p></li>
                                <li><p><a href="">嘉会儿童哮喘微信服务号</a></p></li>
                                <li><p><a href="">OspX数据分析软件</a></p></li>
                            </ul>
                        </div>
                    </section>

                    <section className="footer--top__item top">
                        <ul>
                            <li><p><a href="">嘉会云微服务中间件</a></p></li>
                            <li><p><a href="">嘉会医生控制台</a></p></li>
                            <li><p><a href="">嘉会内容管理系统</a></p></li>
                        </ul>
                    </section>

                    <section className="footer--top__item">
                        <section className="footer--top__service">
                            <h4 className="footer--top__icon-service">企业用户服务</h4>
                            <div className="footer--top-margin">
                                <div className="footer--top__line"/>
                                <ul>
                                    <li><p><a href="">改进建议</a></p></li>
                                    <li><p><a href="">Bug反馈</a></p></li>
                                </ul>
                            </div>
                        </section>
                        <section className="footer--top__aboutUs">
                            <h4 className="footer--top__icon-us">关于我们</h4>
                            <div className="footer--top-margin">
                                <div className="footer--top__line"/>
                                <ul>
                                    <li><p><a href="">博客</a></p></li>
                                    <li><p><a href="">团队</a></p></li>
                                    <li><p><a href="">加入我们</a></p></li>
                                </ul>
                            </div>
                        </section>
                    </section>

                    <section className="footer--top__item">
                        <h4 className="footer--top__icon-us">联系我们</h4>
                        <div className="footer--top-margin">
                            <div className="footer--top__line"/>
                            <ul>
                                <li><p>地址：<br/>上海市徐汇区桂平路689号</p></li>
                                <li><p>邮箱：<br/>feedback@jiahui.com</p></li>
                            </ul>
                        </div>
                    </section>
                </section> {/*end footer--top*/}
                <section className="footer--bottom">
                    <p>Copyright<span>©</span>️2017 by Jiahui,Inc. All rights reserved 沪ICP备15019023号</p>
                </section>
            </footer>
        )
    }
}

export default Footer