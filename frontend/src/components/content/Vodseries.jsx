import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getVodSeries } from '../../redux';
import Spinner from '../layout/Spinner';
import { v1 as uuidv1 } from 'uuid';

const VodSeries = ({ series, seriesData, getVodSeries }) => {
    useEffect(() => {
        getVodSeries(series)
    }, []);
    
    let serrie = seriesData.series
    return seriesData.series === null ? <Spinner /> : 
    <Fragment>
      <div className="series">
          <h1>Episodes:</h1>
            {serrie.map(serie => (
                <div key={uuidv1()}>
                    <a href={`/vods/${serie.streamerID}`}><p className="episodes">{serie.ep}</p></a>
                </div>
            ))}
            
      </div>
    </Fragment>
}
const mapStateToProps = state => {
    return{
        seriesData: state.vods
    }
}


export default connect(mapStateToProps, {getVodSeries})(VodSeries)