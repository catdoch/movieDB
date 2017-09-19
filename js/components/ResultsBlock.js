import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders the voucher summary 
 * for each voucher added
 */
const ResultsBlock = ({ data }) => (
    <div className="c-resultsBlock__card">
        <p>{ data.title }</p>
        <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${data.backdrop_path}`} />
    </div>
);


export default ResultsBlock;
