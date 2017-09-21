import React, { Component } from 'react';
import api from './api';
import ResultsBlock from './ResultsBlock';

export default class Home extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            data: [],
            searchValue: '',
            searchInput: '',
            showEmpty: false
        };

        this.renderAPI = this.renderAPI.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.getAPI = this.getAPI.bind(this);
        this.handleEnterSubmit = this.handleEnterSubmit.bind(this);
        this.showEmpty = this.showEmpty.bind(this);
        this.filterByPopularity = this.filterByPopularity.bind(this);
    }

    getAPI() {
        const { searchValue } = this.state;

        api.getSearchAPI(searchValue)
        .then((data) => {
            if (data.total_results > 0) {
                this.setState({
                    data: data.results
                });
            } else {
                this.setState({ showEmpty: true });
            }
        });
    }


    handleOnChange(event) {
        const prop = event.target.name;

        this.setState({
            [prop]: event.target.value
        });
    }

    handleEnterSubmit(event) {
        if (event.which === 13 || event.keyCode === 13) {
            event.preventDefault();
            this.getAPI();
            return false;
        }
        return true;
    }

    renderAPI() {
        const { data } = this.state;

        return data.map(searchData => <ResultsBlock key={searchData.id} data={searchData} />);
    }

    showEmpty() {
        const { searchValue, showEmpty } = this.state;

        if (showEmpty) {
            return <p>{`No results found for ${searchValue}`}</p>;
        }
    }

    filterByPopularity() {
        const { data } = this.state;
        let sortedArray = [];

        sortedArray = Object.keys(data).reduce((a, b) => {
            return data.vote_average[a] > data.vote_average[b] ? a : b
        });

        console.log(sortedArray);
    }


    /**
     * Render giftlist
     */
    render() {
        return (
            <div>
                <h1 className="c-callToAction">Search for a film below</h1>
                <div className="c-header">
                    <input className="c-searchInput" type="text" onKeyDown={this.handleEnterSubmit} name="searchValue" value={this.state.searchValue} onChange={this.handleOnChange} />
                    <button className="c-searchInput__button" onClick={this.getAPI}>Search</button>
                </div>
                <div className="c-filterBlock">
                    <button className="c-filterBlock_button" onClick={this.filterByPopularity}>Popularity</button>
                </div>
                <div className="c-resultsBlock__container">
                    { this.renderAPI() }
                    { this.showEmpty() }
                </div>
            </div>
        );
    }
}
