import React, { Component } from 'react'

import './AloneSection.scss'

export default class AloneSection extends Component {
    render() {
        let {title,children,style,className} = this.props;

        return (
            <section style={style || {}} className={`alone-section-wrapper ${className||''}` }>
                {
                    title && 
                    <div className="alone-section-title">{title}</div>
                }
                {
                    children
                }
            </section>
        )
    }
}
