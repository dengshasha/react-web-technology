import React, { Component } from 'react';
import QRCode from 'qrcode.react';

import '../css/blog.css';
import { Link } from 'react-router-dom';
import { fetchRequestPost } from '../utils/request';
import Pagination from '../components/pagination';
import Modal from '../components/modal';

import Footer from '../components/Footer';
import Header from '../components/Header';

const weiboIcon = require('../images/blog-btn-weibo.png');
const wechatIcon = require('../images/blog-btn-wechat.png');

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            newsData: [],
            currentPageNum: 1, //页码
            isOpen: false, //是否打开模态框
        };
        this.id = props.match.params.id;
        this.pageSize = 9; //一页显示的数据条数
        this.currentPageNum = 1; //页码
    }

    componentDidMount() {
        let params = [this.state.currentPageNum, this.pageSize, 4, 'zh']; //第一个：第几页 第二个：显示数据条数 第三个：分类id 第四个：语种
        this.requestNewsData(params);
    }

    //获取新闻列表
    requestNewsData(params) {
        this.setState({
            currentPageNum: params[0]
        });

        fetchRequestPost('/NewsService', 'topListByPage', params)
            .then(res => {
                if(res.result) {
                    let data = res.result.data, resData = [], j;
                    j = data.length;
                    for (let i = 0; i < j; i = i + 3){ //所有的数组遍历方法中，这个方法速度最快
                        resData.push({left: data[i], right: data[i+1], bottom: data[i+2]}) //处理数组，页面布局需要三个数为一组
                    }
                    this.setState({
                        total: res.result.total,
                        newsData: resData
                    })
                }
            })
            .catch(err => {
                console.log('err', err)
            })
    }

    //页码输入框
    changePageNumber(event) {
        this.setState({
            currentPageNum: event.target.value
        });
    }

    //翻页
    goToPage(pageNum) {
        window.location.hash = '#' + pageNum;
        let params = [pageNum, this.pageSize, 4, 'zh']; //第一个：第几页 第二个：显示数据条数 第三个：分类id 第四个：语种
        this.requestNewsData(params);
    }

    //一排两个的分享按钮
    renderShare(count) {
        //count用于区分两种排列方式的布局，为了把这段代码复用起来我真是操碎了心。
        return (
            <section className={`blog__list__share ${count === 'one' ? 'one' : 'two'}`}>
                <a
                    className="blog__list__share-weibo"
                    href="javascript:void((function(s,d,e,r,l,p,t,z,c){var%20f='http://v.t.sina.com.cn/share/share.php?appkey=2235613284',u=z||d.location,p=['&url=',e(u),'&title=',e(t||d.title),'&source=',e(r),'&sourceUrl=',e(l),'&content=',c||'gb2312','&pic=',e(p||'')].join('');function%20a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=440,height=430,left=',(s.width-440)/2,',top=',(s.height-430)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else%20a();})(screen,document,encodeURIComponent,'','','https://www.jiahui.com/imgs/logo.png','','','页面编码gb2312|utf-8默认gb2312'));">
                    <img src={weiboIcon} title="分享到微博" alt="微博" className={count === 'one' ? 'one' : 'two'}/>
                </a>
                <a
                    href="javascript:void(0);"
                    className="blog__list__share-wechat"
                    onClick={() => this.setState({isOpen: true})}
                >
                    <img src={wechatIcon} title="分享到微信" alt="微信" className={count === 'one' ? 'one' : 'two'}/>
                </a>
            </section>
        )
    }

    //列表，一列两个的视图
    renderNewsItem(data) {
        return (
            <section>
                <Link to={`/blogDetails/${data.id}`}>
                    <section className="blog__list--two__classification">
                        <p>{data.categoryName}</p>
                    </section>
                    <section
                        className="blog__list--two__img"
                        style={{backgroundImage: `url(${data.coverUrl})`}}
                    />
                    <section className="blog__list--two__title">
                        <h3>{data.title}</h3>
                    </section>
                </Link>
                {this.renderShare('two')}
            </section>

        )
    }

    render() {
        let blogItem = this.state.newsData && this.state.newsData.map((item, index) => {
            return (
                <section className="blog__list-item" key={index}>
                    <section className="blog__list--two" >
                        {item.left && this.renderNewsItem(item.left)}
                        {item.right && this.renderNewsItem(item.right)}
                    </section>

                    {item.bottom && <section className="blog__list--one">
                        <article>
                            <p>{item.bottom.categoryName}</p>
                            <Link to={`/blogDetails/${item.bottom.id}`}><h3>{item.bottom.title}</h3></Link>
                            {this.renderShare('one')}
                        </article>
                        <Link to={`/blogDetails/${item.bottom.id}`} className="blog__list--one__img">
                            <section
                                className="blog__list--one__img-bg"
                                style={{backgroundImage: `url(${item.bottom.coverUrl})`}}
                            />
                            {/*<img src={item.bottom.coverUrl} alt="新闻封面" className="blog__list--one__img"/>*/}
                        </Link>
                    </section>}
                </section>
            )
        });
        return (
            <section className="blog">
                <Header/>
                <section className="blog__list">
                    {blogItem}
                </section>
                <Pagination
                    total={this.state.total}
                    pageSize = {this.pageSize}
                    currentPageNum = {this.state.currentPageNum}
                    goToPage = {(pageNum) => this.goToPage(pageNum)}
                    changePageNumber = {(event) => this.changePageNumber(event)}
                />
                <Footer/>
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

export default Blog;