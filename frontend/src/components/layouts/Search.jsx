import React from "react";
import {FaSearch} from "react-icons/fa";

export default function Search() {
    return (
        <form action="">
            <div className="input-group">
                <input type="text" 
                placeholder="Search Your Favorite Restaurant..." 
                id="search-field" 
                className="form-control"
                 />
                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                        <FaSearch className="fa fa-search" />
                    </button>
                </div>
                
            </div>
        </form>
    );
}