import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SectionsContainer, Section } from '../plugins/fullpage';

import Footer from '../components/Footer';
import Header from '../components/Header';

import '../css/home.css';

import { fetchRequestPost } from '../utils/request';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollBar: false,
            newsData: [],
            productData: []
        }
    }
    componentDidMount() {
        this.requestNewsData();
        this.requestProduct();
    }

    //获取置顶新闻
    requestNewsData() {
        let params = [1, 3, 4, 'zh']; //第一个：第几页 第二个：显示数据条数 第三个：分类id 第四个：语种
        fetchRequestPost('/NewsService', 'topListByPage', params)
            .then(res => {
                this.setState({newsData: res.result.data || []})
            })
            .catch(err => {
                console.log('err', err)
            })
    }

    //获取产品
    requestProduct() {
        fetchRequestPost('/ProdService', 'getProductCover', '')
            .then(res => {
                this.setState({productData: res.result})
            })
            .catch(err => {
                console.log('err', err)
            })
    }

    render() {
        let options = {
            sectionClassName:     'section',
            anchors:              ['WeChat-Mini-App', 'Kids-Asthma', 'OpsX', 'News'],
            scrollBar:            false,
            navigation:           true,
            verticalAlign:        false,
            sectionPaddingTop:    '0px',
            sectionPaddingBottom: '0px',
            arrowNavigation:      true
        };

        let newsItem = this.state.newsData && this.state.newsData.map((item, index) =>
            <Link to={`/blogDetails/${item.id}`} key={index}>
                <section className="fullpage-newsAndTech-item" key={index}>
                    <section className="fullpage-newsAndTech__classification">
                        <p>{item.categoryName}</p>
                    </section>
                    <section style={{backgroundImage: `url(${item.coverUrl})`}} className="fullpage-newsAndTech__img">
                        {/*<img src={item.coverUrl} alt="" className="fullpage-newsAndTech__img"/>*/}
                    </section>
                    <section className="fullpage-newsAndTech__title">
                        <p>{item.title}</p>
                    </section>
                </section>
            </Link>
        );

        return (
            <div className="fullpage">
                <Header/>
                <SectionsContainer className="container" {...options}>
                    {this.state.productData && this.state.productData.map((item, index) =>
                        <Section key={index} className="fullpage-item">
                            <div className="fullpage-item__bg" style={{
                                backgroundImage: `url(${item.coverUrl})`,
                            }}/>
                            <Link
                                to={{pathname: '/products', query: {id: item.id}}}
                                className="fullpage-moreBtn"
                            >
                                More >
                            </Link>
                        </Section>
                    )}
                    <Section>
                        <section className="fullpage-newsAndTech">
                            <section className="fullpage-newsAndTech__content">
                                {newsItem}
                            </section>
                            <Link to='/blog' className="fullpage-moreBtn">More ></Link>
                        </section>
                        <Footer isHome = {true}/>
                    </Section>

                </SectionsContainer>
            </div>
        )
    }
}

export default Home;