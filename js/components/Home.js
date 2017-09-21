import React, { Component } from 'react';
import api from '../utilities/api';
import ResultsBlock from './ResultsBlock';

export default class Home extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            allData: [],
            queryData: [],
            searchValue: '',
            searchInput: '',
            showEmpty: false,
            allPage: 1,
            queryPage: 1,
            showItems: false,
            allDataShow: false,
            queryShow: false
        };

        this.filterByPopularity = this.filterByPopularity.bind(this);
        this.getAPI = this.getAPI.bind(this);
        this.getPopular = this.getPopular.bind(this);
        this.handleEnterSubmit = this.handleEnterSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.loadMoreQuery = this.loadMoreQuery.bind(this);
        this.renderAllAPI = this.renderAllAPI.bind(this);
        this.renderAPI = this.renderAPI.bind(this);
        this.setRender = this.setRender.bind(this);
        this.showEmpty = this.showEmpty.bind(this);
    }


    /**
     * On mount set off
     * most popular API
     */
    componentDidMount() {
        this.getPopular();
    }


    /**
     * Get most popular
     * and call render all
     * @return render of API
     */
    getPopular() {
        const { allPage } = this.state;

        api.getPopular(allPage)
            .then((data) => {
                this.setState({
                    allData: [...this.state.allData, ...data.results],
                    allDataShow: true,
                    queryShow: false
                });
            });

            this.renderAllAPI();
    }


    /**
     * getAPI with searchQuery
     * @return set state to render
     * HTML
     */
    getAPI() {
        const { searchValue, queryPage } = this.state;

        api.getSearchAPI(searchValue, queryPage)
            .then((data) => {
                if (data.total_results > 0) {
                    this.setState({
                        queryData: [...this.state.queryData, ...data.results],
                        queryShow: true,
                        allDataShow: false
                    }, () => {
                        this.setRender();
                    });
                } else {
                    this.setState({
                        showEmpty: true,
                        allData: []
                    });
                }
            });
    }


    /**
     * Handle on input change
     * @param  {obj} event
     * @return setState onf input
     * value
     */
    handleOnChange(event) {
        const prop = event.target.name;

        this.setState({
            [prop]: event.target.value,
            showEmpty: false
        });
    }


    /**
     * Handle submit of enter
     * button
     * @param  {obj} event
     * @return call to API
     */
    handleEnterSubmit(event) {
        if (event.which === 13 || event.keyCode === 13) {
            event.preventDefault();
            this.getAPI();
            return false;
        }
        return true;
    }


    /**
     * Render all most popular
     * results
     * @return map of data to ResultsBlock
     */
    renderAllAPI() {
        const { allData } = this.state;

        if (allData.length) {
            return allData.map((searchData, index) => <ResultsBlock key={index} data={searchData} />);
        }
    }


    /**
     * Set state of
     * show Items to true
     * whilst clearing all
     * data array
     */
    setRender() {
        this.setState({
            allData: [],
            showItems:true
        });
    }


    /**
     * Render API for search
     * query
     * @return map of data to ResultsBlock
     */
    renderAPI() {
        const { queryData, showItems } = this.state;

        if (showItems) {
            return queryData.map((searchData, index) => <ResultsBlock key={index} data={searchData} />);
        }
    }


    /**
     * Show text if no results
     * are returned from the
     * API
     * @return HTML
     */
    showEmpty() {
        const { searchValue, showEmpty } = this.state;

        if (showEmpty) {
            return <p className="emptyWording">{`No results found for ${searchValue}`}</p>;
        }
    }

    /**
     * filter search query by
     * popularity asc to sec
     * @return set state and render
     */
    filterByPopularity() {
        const { queryData } = this.state;
        let sortedArray = [];

        sortedArray = queryData.sort((a, b)=> {
            return b.popularity - a.popularity;
        });

        this.setState({
            queryData: sortedArray
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
     * Load more button
     * change page number
     * and call API
     * @return call to render
     */
    loadMore() {
        this.setState({
            allPage: this.state.allPage + 1
        }, () => {
            this.getPopular();
        });
    }


    /**
     * Load more button
     * change page number
     * and call API
     * @return call to render
     */
    loadMoreQuery() {
        this.setState({
            queryPage: this.state.queryPage + 1
        }, () => {
            this.getAPI();
        });
    }


    /**
     * Render component
     */
    render() {
        const { showEmpty, queryShow, allDataShow } = this.state;
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
                    { !showEmpty && allDataShow ?
                        <button className="c-filterBlock__button loadMore" onClick={this.loadMore}>Load more</button> :
                        <button className="c-filterBlock__button loadMore" onClick={this.loadMoreQuery}>Load more</button>
                    }
                </div>
            </div>
        );
    }
}
