import React, {Component} from 'react';
import './item-add-form.css';

export default class ItemAddForm extends Component {

    render() {
        return (
            <form className="item-add-form d-flex" onSubmit={this.props.onSubmit}>
                <input type="text"
                       className="form-control"
                       onChange={this.props.onLabelChange}
                       placeholder="What needs to be done"
                       value={this.props.text}
                       />
                <button
                    className="btn btn-outline-secondary" >
                    Add Item
                </button>
            </form>
        )

    }
}