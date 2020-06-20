import React, {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import { getHentaiSeries } from '../../redux';
import Spinner from '../layout/Spinner';
import { v1 as uuidv1 } from 'uuid';

const Hentaiseries = ({ series, seriesData, getHentaiSeries }) => {
    useEffect(() => {
        getHentaiSeries(series)
    }, []);

    let serrie = seriesData.series
    return seriesData.series === null ? <Spinner /> : 
    <Fragment>
      <div className="series">
            {serrie.map(serie => (
                <div key={uuidv1()}>
                    <a href={`/hentai/${serie.hentaiID}`}><p className="episodes">{serie.ep}</p></a>
                </div>
            ))}
            
      </div>
    </Fragment>

}

const mapStateToProps = state => {
    return{
        seriesData: state.hentai
    }
}

export default connect(mapStateToProps, { getHentaiSeries })(Hentaiseries)