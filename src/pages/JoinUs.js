import React, { Component } from 'react';
import '../css/joinUs.css';

import Footer from '../components/Footer';
import Header from '../components/Header';

class JoinUs extends Component {
    //职责列表视图
    renderLiContent(data) {
        let item = data.map((item, index) => <li key={index}> {item} </li>);
        return(
            <ul>{item}</ul>
        )
    }

    //招聘需求视图
    renderJob() {
        let item = jobList.map((item, index) => {
            return(
                <section className="joinUs-job" key={index}>
                    <section className="joinUs-job__title">
                        <h1>{item.id}</h1>
                        <div className="joinUs-job__jobName">
                            <h2 className="joinUs-job__jobName--CN">{item.title}</h2>
                            <h2 className="joinUs-job__jobName--EN">{item.title_EN}</h2>
                        </div>
                    </section>
                    <section className="joinUs-job__content">
                        <h3 className="joinUs-job__responsibility">{item.resTitle}</h3>
                        {this.renderLiContent(item.resContent)}
                        <h3 className="joinUs-job__request">{item.reqTitle}</h3>
                        {this.renderLiContent(item.reqContent)}
                        <h3 className="joinUs-job__address">工作地点</h3>
                        <p className="joinUs-job__address-content">上海市徐汇区桂平路689号</p>
                    </section>
                    <section className="joinUs-job__button">
                        <button onClick={() => window.open('http://carebridge.gllue.me/position#home')}><p>在线申请</p></button>
                    </section>
                </section>
            )
        });
        return(
            <section style={{marginBottom: '80px'}}>
                {item}
            </section>
        )
    }

    render() {
        return (
            <section className="joinUs">
                <Header/>
                <section className="joinUs-bg">
                    <section className="joinUs-bg__intro">
                        <h1>Join Us</h1>
                        <h2>加入我们</h2>
                        <p className="joinUs-bg__intro--EN">We're a new passionate bunch and we're looking from more.</p>
                        <p className="joinUs-bg__intro--CN">我们新生且激情，并在寻找更多。</p>
                    </section>
                </section>
                <section className="joinUs-intro">
                    <div className="joinUs-intro__line" />
                    <article>
                        <p>
                            嘉会国际医院是上海一家外资综合性医院，位于徐汇区，已在上海各区的黄金路段逐步开设诊所，未来会创新居家医护服务。我们和美国麻省总医院等国际一流机构在医疗领域有着广泛的合作，有着国际化的医疗队伍。
                            我们的目标是引领医疗最佳服务，促进健康教育，推动医学发展。IT技术在提升服务水准中将起到核心作用，伴随着信息化，我们会更加努力向智能化和个性化推进。
                        </p>
                        <p>在嘉会，你不需要做大企业的一颗螺丝钉，你有足够的机会全方位施展你的才能。</p>
                        <p>来到嘉会，你会拥有：</p>
                        <p className="weight">
                            随着工龄增长的带薪年假；弹性上下班时间，方便你平衡生活和陪伴自己的家人；不存在没有意义的加班；
                            在国际一流水准的职工餐厅用餐；配置与你能力相符的硬件装备，给你飞一般的感觉；各领域的大牛定期分享专业领域知识；
                            给予员工规范的福利保障；如果你是个孝子，可以帮助家人获得更好的健康保障…
                        </p>
                        <p>看到这里还不心动的人想必已经是得道高僧了吧，快看看有哪些适合自己申请的职位吧～</p>
                    </article>
                </section>
                {this.renderJob()}
                <Footer/>
            </section>
        );
    }
}

const jobList = [
    {
        id: '01',
        title: '高级Java工程师',
        title_EN: 'Senior Java Engineer',
        resTitle: '工作职责',
        resContent: [
            '负责数据业务平台（API、MQ、服务框架）的研发和优化工作；',
            '负责现有系统的稳定性、性能调优等的设计实现；',
            '负责数据分析和数据挖掘算法的研究和实现；',
            '根据用户需求，快速制定解决方案，解决技术难题并高效实施。'
        ],
        reqTitle: '能力与要求',
        reqContent: [
            '计算机相关专业，本科及以上学历；',
            '至少三年以上Java开发经验，五年以上待遇可谈；',
            '扎实的Java编程和算法基础，熟悉高并发，精通Spring和常用ORM框架；',
            '熟练使用MySQL和Oracle，熟悉SQL优化；',
            '熟练使用Linux命令并能在Linux/MacOS环境下开发；',
            '学习能力强、具备良好的问题分析和问题解决能力，对新技术有学习热情;',
            '具备良好的团队合作精神和语言表达能力，乐于分享技术；',
            '熟练使用Python等脚本语言者优先;',
            '有架构设计或优化经验者优先；',
            '有在线支付开发经验者优先;'
        ],
    },
    {
        id: '02',
        title: '高级Web前端工程师',
        title_EN: 'Senior Web Front-end Engineer',
        resTitle: '工作职责',
        resContent: [
            '负责Web产品（包括PC端、移动端和微信端）的前端开发和维护，参与产品的技术选型和调研;',
            '与产品负责人、设计师一起讨论产品设计，与后台工程师合作制定最佳技术实现方案；',
            '前沿技术学习、研究和应用;',
        ],
        reqTitle: '能力与要求',
        reqContent: [
            '至少三年以上JavaScript开发经验，五年以上待遇可谈。',
            '扎实的JavaScript和CSS基础且能够熟练开发高性能的Web应用程序；',
            '熟悉Web性能优化并有实践经验；',
            '熟悉并在实际工作中使用过JQuery、React和Vue.js中的至少两种技术；',
            '能够独立解决问题并且具有良好的代码风格，接口设计及架构意识；',
            '热爱前端技术，并具有良好的沟通能力和团队合作精神；',
            '具备良好的团队合作精神和语言表达能力，乐于分享技术；',
            '计算机相关专业，本科及以上学历优先；',
            '熟悉微信小程序并有移动支付开发经验者优先。',
        ],
    },
    {
        id: '03',
        title: '高级Android工程师',
        title_EN: 'Senior Android Engineer',
        resTitle: '工作职责',
        resContent: [
            '负责嘉会Android应用的研发和优化工作；',
            '负责设计和开发Hybrid应用的Native接口；',
            '根据用户需求，快速制定解决方案，解决技术难题并高效实施。',
        ],
        reqTitle: '能力与要求',
        reqContent: [
            '计算机相关专业，本科及以上学历；',
            '至少2年Android平台的开发经验；',
            '扎实的Java编程和算法基础，熟悉虚拟机原理和网络通讯协议；',
            '能够独立解决问题并且具有良好的代码风格，接口设计及架构意识；',
            '具有良好的沟通能力和团队合作精神；',
            '有OpenGL开发经验者优先；',
            '有Hybrid应用开发经验者优先。'
        ],
    },
    {
        id: '04',
        title: '高级iOS工程师',
        title_EN: 'Senior iOS Engineer',
        resTitle: '工作职责',
        resContent: [
            '负责嘉会iOS应用的研发和优化工作；' ,
            '负责设计和开发Hybrid应用的Native接口；' ,
            '根据用户需求，快速制定解决方案，解决技术难题并高效实施。',
        ],
        reqTitle: '能力与要求',
        reqContent: [
            '计算机相关专业，本科及以上学历；',
            '至少3年iOS平台开发经验，能够从无到有开发完整的App应用；',
            '熟练掌握Objective-C或swift，深入理解iOS相关库的实现原理；',
            '扎实的算法基础，熟悉iOS应用的内存管理及优化方法;',
            '能够独立解决问题并且具有良好的代码风格，接口设计及架构意识；',
            '具有良好的沟通能力和团队合作精神；',
            '有OpenGL开发经验者优先；',
            '有Hybrid应用开发经验者优先。',
        ],
    },
];

export default JoinUs;