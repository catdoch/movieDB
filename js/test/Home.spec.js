import { assert } from 'chai';
import sinon from 'sinon';
import React from 'react';
import { mount, shallow } from 'enzyme';
import API from '../utilities/api';
import Home from '../components/Home';

describe('<Home />', () => {
    // Check render of main
    // react component and if
    // mount is successful
    it('it renders the <Home /> component', () => {
        // Arrange
        const mockResponse = { results: [{
            0: {
                adult: false,
                id: 1234,
                popularity: 889.294591,
                title: 'test',
                vote_average: 6.4
            },
            total_results: 1
        } ]};
        const getDataStub = sinon.stub(API, 'getPopular').resolves(mockResponse);

        // Act
        sinon.spy(Home.prototype, 'componentDidMount');
        const wrapper = mount(<Home />);
        const component = wrapper.find('.c-header');

        // Assert
        assert.equal(component.length, 1);

        // Cleanup
        getDataStub.restore();
        Home.prototype.componentDidMount.restore();
    });


    // Check if correct text is shown
    // if no results and showEmpty
    // is true
    it('shows empty', () => {
        // Arrange
        const mockResponse = { results: [{
            total_results: 0
        } ]};

        const getDataStub = sinon.stub(API, 'getSearchAPI').resolves(mockResponse);

        // Act
        const wrapper = shallow(<Home />);
        wrapper.setState({ showEmpty: true });
        wrapper.instance().getAPI();

        // Assert
        assert.equal(wrapper.find('.emptyWording').length, 1);

    });
});

