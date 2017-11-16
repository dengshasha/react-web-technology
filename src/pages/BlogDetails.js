import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';
import Modal from '../components/modal';

import Footer from '../components/Footer';
import Header from '../components/Header';

import { fetchRequestPost } from '../utils/request';

const weiboIcon = require('../images/blogDetail-btn-weibo.png');
const wechatIcon = require('../images/blogDetail-btn-weixin.png');

class BlogDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: {}, //新闻详情数据
            recommendNews: [], //推荐新闻数据
            isOpen: false, //是否打开模态框
            isHidden: false, //是否显示Header和Footer
        };
        this.id = props.match.params.id;
    }

    componentDidMount() {
        if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
            require('../css/blogDetails-mobile.css');
            this.setState({isHidden: true})
        } else {
            require('../css/blogDetails.css');
        }
        this.requestBlogDetails(this.id);
        this.requestRecommendBlog(this.id)
    }

    //获取新闻详情
    requestBlogDetails(id) {
        let params = [id.toString(), 'zh'];
        fetchRequestPost('/NewsService', 'getNews', params)
            .then(res => {
                this.setState({news: res.result})
            })
            .catch(err => {
                console.log(err)
            })
    }

    //获取推荐文章
    requestRecommendBlog(id) {
        let params = [id]; //传整型id
        fetchRequestPost('/NewsService', 'getRecommendNews', params)
            .then(res => {
                this.setState({recommendNews: res.result})
            })
            .catch(err => {
                console.log(err)
            })
    }

    //推荐文章列表视图
    renderRecommendNews() {
        let itemList = this.state.recommendNews && this.state.recommendNews.map((item, index) => {
            return (
                <section key={index} className="blogDetail__recommend-item">
                    <Link
                        to={`/blogDetails/${item.id}`}
                        className="blogDetail__recommend-item-a"
                        onClick={() => { this.requestBlogDetails(item.id); this.requestRecommendBlog(item.id) }}
                    >
                        <h1>{item.title}</h1>
                    </Link>
                    <p className="blogDetail__recommend-author">作者：{item.editor}</p>
                    <p className="blogDetail__recommend-time">{item.createTime}</p>
                </section>
            )
        });
        return (
            <section className="blogDetail__recommend-list">
                {itemList}
            </section>
        )
    }

    render() {
        let title = this.state.news ? this.state.news.title : '';
        let createTime = this.state.news && this.state.news.createTime ? this.state.news.createTime.split(" ")[0] : '';
        let content = this.state.news ? this.state.news.content : '';
        let author = this.state.news ? this.state.news.editor : '';

        return(
            <section className="blogDetail">
                <Header isHidden={this.state.isHidden}/>
                <article>
                    <h1>{title}</h1>
                    <div className="blogDetail-line"/>
                    <section className="blogDetail__header">
                        <div className="blogDetail__header-author">
                            <p>作者／{author}</p>
                            <p>时间／{createTime}</p>
                        </div>
                        <div className="blogDetail__header-button">
                            <a href="javascript:void((function(s,d,e,r,l,p,t,z,c){var%20f='http://v.t.sina.com.cn/share/share.php?appkey=2235613284',u=z||d.location,p=['&url=',e(u),'&title=',e(t||d.title),'&source=',e(r),'&sourceUrl=',e(l),'&content=',c||'gb2312','&pic=',e(p||'')].join('');function%20a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=440,height=430,left=',(s.width-440)/2,',top=',(s.height-430)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else%20a();})(screen,document,encodeURIComponent,'','','https://www.jiahui.com/imgs/logo.png','','','页面编码gb2312|utf-8默认gb2312'));">
                                <img src={weiboIcon} alt=""/>
                            </a>
                            <a
                                href="javascript:void(0);"
                                className="blogDetail__header-button__wechat"
                                onClick={() => this.setState({isOpen: true})}
                            >
                                <img src={wechatIcon} alt=""/>
                            </a>
                        </div>
                    </section>
                    <section dangerouslySetInnerHTML={{__html: content}} />
                </article>
                <section className="blogDetail__recommend">
                    <div className="blogDetail__recommend-content">
                        <p className="blogDetail__recommend-title">推荐文章</p>
                    </div>
                    {this.state.recommendNews.length ? this.renderRecommendNews() : <p className="blogDetail__recommend-noText">暂无推荐文章</p>}
                </section>
                <Footer isHidden={this.state.isHidden}/>
                <Modal
                    closeModal = {() => this.setState({isOpen: false})}
                    isOpen={this.state.isOpen}>
                    <div className="modal-container__body">
                        <p>
                            打开微信"扫一扫"，打开网页后点击屏幕右上角"分享"按钮
                        </p>
                        <aside className="qrcode-wechat">
                            <QRCode value={window.location.href}/>
                        </aside>
                    </div>
                </Modal>
            </section>
        )
    }
}

export default BlogDetails