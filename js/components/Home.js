import React, { Component } from 'react';
import api from '../utilities/api';
import ResultsBlock from './ResultsBlock';

export default class Home extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            allData: [],
            data: [],
            searchValue: '',
            searchInput: '',
            showEmpty: false,
            allPage: 1,
            queryPage: 1,
            showItems: false
        };

        this.renderAPI = this.renderAPI.bind(this);
        this.renderAllAPI = this.renderAllAPI.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.getAPI = this.getAPI.bind(this);
        this.handleEnterSubmit = this.handleEnterSubmit.bind(this);
        this.showEmpty = this.showEmpty.bind(this);
        this.filterByPopularity = this.filterByPopularity.bind(this);
        this.getPopular = this.getPopular.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.setRender = this.setRender.bind(this);
    }

    componentDidMount() {
        this.getPopular();
    }

    getPopular() {
        const { allPage } = this.state;

        api.getPopular(allPage)
            .then((data) => {
                this.setState({ allData: [...this.state.allData, ...data.results] });
            });

            this.renderAllAPI();
    }

    getAPI() {
        const { searchValue, queryPage } = this.state;

        api.getSearchAPI(searchValue, queryPage)
            .then((data) => {
                if (data.total_results > 0) {
                    this.setState({
                        data: [...this.state.data, ...data.results]
                    }, () => {
                        this.setRender();
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

    renderAllAPI() {
        const { allData } = this.state;

        if (allData.length) {
            return allData.map((searchData, index) => <ResultsBlock key={index} data={searchData} />);
        }
    }

    setRender() {
        this.setState({
            allData: [],
            showItems:true
        });
    }

    renderAPI() {
        const { data, showItems } = this.state;

        if (showItems) {
            return data.map((searchData, index) => <ResultsBlock key={index} data={searchData} />);
        }
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

        sortedArray = data.sort((a, b)=> {
            return b.popularity - a.popularity;
        });

        this.setState({
            data: sortedArray
        });

        this.renderAPI();
    }

    loadMore() {
        this.setState({
            allPage: this.state.allPage + 1
        }, () => {
            this.getPopular();
        });
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
                    <p>Filter by:</p>
                    <button className="c-filterBlock__button" onClick={this.filterByPopularity}>Popularity</button>
                </div>
                <div className="c-resultsBlock__container">
                    { this.renderAPI() }
                    { this.renderAllAPI() }
                    { this.showEmpty() }
                    <button className="c-filterBlock__button" onClick={this.loadMore}>Load more</button>
                </div>
            </div>
        );
    }
}
