import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './style.css';

export default class Modal extends Component {
    static defaultProps = { //设置default props的一种方式，另一种方式是在组件外：Modal.defaultProps = {}
        isOpen: false
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.isOpen && !this.props.isOpen) {
            this.node = document.createElement('div');
            this.node.id = 'modal';

            document.body.appendChild(this.node);
            let modal = (
                <section
                    style={{height: window.innerHeight}}
                    className="modal">
                    <section className="modal-container animation">
                        <section className="modal-container__header">
                            <button onClick={() => this.props.closeModal()}>x</button>
                        </section>
                        {nextProps.children}
                    </section>
                </section>
            );
            ReactDom.render(
                modal,
                document.getElementById('modal')
            )
        }
        if (!nextProps.isOpen && this.props.isOpen) {
            document.body.removeChild(this.node);
        }

    }

    render() {
        return null
    }
}