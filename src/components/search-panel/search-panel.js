import React from "react";
import './search-panel.css';

const SearchPanel = (props) => {
    return (
            <input
                className="form-control search-input"
                onChange={props.onSearchChange}
                placeholder={props.placeholder}
            value={props.value}/>

    );
};
export default SearchPanel;