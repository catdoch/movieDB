import React, { Component } from 'react';
import api from './api';
import ResultsBlock from './ResultsBlock';

export default class Home extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            data: [],
            searchValue: '',
            searchInput: ''
        };

        this.renderAPI = this.renderAPI.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.getAPI = this.getAPI.bind(this);
    }

    getAPI() {
        const { searchValue } = this.state;

        api.getSearchAPI(searchValue)
        .then((data) => {
            this.setState({
                data: data.results
            });
        });
    }

    renderAPI() {
        const { data } = this.state;

        return data.map(searchData => <ResultsBlock key={searchData.id} data={searchData} />);
    }


    handleOnChange(event) {
        const prop = event.target.name;

        this.setState({
            [prop]: event.target.value
        });

        this.getAPI();
    }


    /**
     * Render giftlist
     */
    render() {
        return (
            <div>
                <input type="text" name="searchValue" value={this.state.searchValue} onChange={this.handleOnChange} />
                { this.renderAPI() }
            </div>
        );
    }
}
