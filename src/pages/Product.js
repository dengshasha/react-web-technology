import React, { Component } from 'react';
import '../css/product.css';

import { fetchRequestPost } from '../utils/request';

import Footer from '../components/Footer';
import Header from '../components/Header';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [], //产品列表数据
            selectedProduct: props.location.query ? props.location.query.id : 0, //当前选中产品
            productDetail: '', //产品详情数据
            teamList: [], //团队成员
        };
        this.id = props.location.query ? props.location.query.id : 0; //产品的id,有的页面不会传这个id
    }

    componentDidMount() {
        this.requestProducts(this.id); //如果有产品id则获取所有产品列表的时候不再请求第一个产品详情
        this.id && this.requestProductDetail(this.id) //如果有产品id则直接请求该产品详情
    }

    //获取产品列表
    requestProducts(id) {
        fetchRequestPost('/ProdService', 'getProdNames', '')
            .then(res => {
                if (res.result.length) {
                    if (id) {
                        this.setState({
                            productList: res.result,
                        });
                    } else {
                        this.setState({
                            productList: res.result,
                            selectedProduct: res.result[0].id,
                        });
                        this.requestProductDetail(res.result[0].id)
                    }
                }

            })
            .catch(err => {
                console.log('err', err)
            })
    }

    //获取产品详情
    requestProductDetail(id) {
        let params = [id];
        fetchRequestPost('/ProdService', 'getProductById', params)
            .then(res => {
                if (res.result) {
                    this.setState({
                        productDetail: res.result,
                    });
                    this.requestTeamMember(res.result.team)
                }

            })
            .catch(err => {
                console.log('err', err)
            })
    }

    //获取团队成员
    requestTeamMember(team) {
        let params = team.split('#')
            .filter(item => item !== '')
            .map(item => parseInt(item, 10)); //parseInt()第二个参数是指定参数是几进制的，如果不指定eslint会报'Missing radix parameter'警告
        fetchRequestPost('/TeamService', 'getByMemberIdArrs', [params])
            .then(res => {
                if (res.result) {
                    this.setState({teamList: res.result})
                }
            })
            .catch(err => {
                console.log('err', err)
            })
    }

    //切换产品
    chooseProduct(id) {
        this.setState({
            selectedProduct: id,
        });
        this.requestProductDetail(id)
    }

    //介绍视图
    renderProductDetail(tab) {
        let title_EN, title_CN, intro, url;
        switch (tab) {
            case 'introduction' :
                title_EN = 'Introduction of Products';
                title_CN = '产品介绍';
                intro = this.state.productDetail.prodIntro;
                url = this.state.productDetail.prodUrl;
                break;
            case 'interaction' :
                title_EN = 'Interaction Detail Design';
                title_CN = '交互细节设计';
                intro = this.state.productDetail.uiIntro;
                url = this.state.productDetail.uiUrl;
                break;
            case 'technology' :
                title_EN = 'Technical Analysis';
                title_CN = '技术分析';
                intro = this.state.productDetail.techIntro;
                url = this.state.productDetail.techUrl;
                break
        }
        return (
            <div className="product-introduction-item">
                <section className="product-title">
                    <h1 className="product-title--english">{title_EN}</h1>
                    <h1 className="product-title--chinese">{title_CN}</h1>
                    <div className="product-line"/>
                </section>

                <section className="product-introduction__content">
                    <div className="product-circle top"/>
                    <div className="product-circle bottom"/>
                    <section className="product-introduction-flex">
                        <section className="product-introduction__text">
                            <article dangerouslySetInnerHTML={{__html: intro}} />
                        </section>
                        <section className="product-introduction__img">
                            <img src={url} alt={title_CN} />
                        </section>
                    </section>
                </section>
            </div>
        )
    }

    render() {
        let productList = this.state.productList && this.state.productList.map((item, index) => {
            return (
                <li key={index} className={this.state.selectedProduct === item.id ? 'active' : ''}>
                    <a href="javascript:void(0)" onClick={() => this.chooseProduct(item.id)}>{item.name}</a>
                </li>
            )
        });
        let teamList = this.state.teamList && this.state.teamList.map((item, index) => {
            return (
                <section key={index}>
                    <figure>
                        <img src={item.avatarUrl} alt="团队成员"/>
                    </figure>
                    <p>{item.name}</p>
                    <p>{item.title}</p>
                </section>
            )
        });
        let coverUrl = this.state.productDetail ? this.state.productDetail.coverUrl : '';
        return (
            <section className="product">
                <Header/>
                <section
                    className="product-nav__bg"
                    style={{
                        backgroundImage: `url(${coverUrl})`
                    }}
                />
                <nav className="product-nav">
                    <ul className="product-nav__list">
                        {productList}
                    </ul>
                </nav>
                <section className="product-team">
                    <h1 className="product-title--english">Work Team</h1>
                    <h1 className="product-title--chinese">工作团队</h1>
                    <div className="product-line"/>
                    <section className="product-team__content">
                        {teamList}
                    </section>
                </section>

                <section className="product-introduction">
                    {this.state.productDetail.prodIntro && this.renderProductDetail('introduction')}
                    {this.state.productDetail.uiIntro && this.renderProductDetail('interaction')}
                    {this.state.productDetail.techIntro && this.renderProductDetail('technology')}
                </section>
                <Footer/>
            </section>
        )
    }
}

export default Product;