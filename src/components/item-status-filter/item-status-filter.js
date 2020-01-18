import React, { Component } from "react";
import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
    buttons = [
        {name: 'all', text: 'All'},
        {name: 'active', text: 'Active'},
        {name: 'done', text: 'Done'}
    ]

    render() {
        const { filter, onFilter } = this.props;
        return (
            <div className="btn-group">
                {this.buttons.map( ({name, text}) => {
                    const isActive = filter === name ;
                    const className = isActive ? 'btn-info' : 'btn-outline-secondary';
                  return (
                    <button type="button"
                        className={`btn ${className}`}
                        key={name}
                        onClick={() => onFilter(name)}>{text}</button>
                    )
                })}
            </div>
        );
    }
}