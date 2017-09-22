import React from 'react';
import moment from 'moment';

/**
 * Renders the voucher summary
 * for each voucher added
 */
const ResultsBlock = ({ data }) => (
    <div className="c-resultsBlock__card">
        <div className="c-resultsBlock__cardContainer">
            <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${data.poster_path}`} alt="film poster" />
            <p>{ data.title }</p>
            <p>{ moment(data.release_date).format('DD/MM/YYYY') }</p>
        </div>
    </div>
);


export default ResultsBlock;
