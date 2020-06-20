import React, {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { loadUser } from '../../redux';
import { getVodById } from '../../redux';
import Vodseries from './Vodseries';


const Vod = ({getVodById, vodData, match, error, loadUser }) => {
    useEffect(() => {
        getVodById(match.params.id)
        loadUser()
    }, []);
    
    if(error){
        alert(error)
    }

    return vodData.vod === null ? <Spinner /> : 
    <Fragment>


        <div className="single-vod">
        <div>
            <h1>{vodData.vod.title}</h1>
            <h2>By: {vodData.vod.creator}</h2>
            <h2>Series: {vodData.vod.series}</h2>
            <p>{vodData.vod.desc}</p>
        </div>
        <div>
            <h1>Episode:</h1>
            <h1>{vodData.vod.ep}</h1>
        </div>
        <div>
        <Vodseries  series={vodData.vod.series} />
        </div>
        <div className="vod-center">
            <img className="vod-img" src={vodData.vod.thumbnail} alt="thumbnail" />
        </div>
        <div className="vod">
            <video controls>
                <source src={vodData.vod.path} type="video/mp4" />
            </video>
        </div>
        </div>



        <div className="single-vod-mobile">
        <div>
            <h1>{vodData.vod.title}</h1>
            <h2>By: {vodData.vod.creator}</h2>
            <h2>Series: {vodData.vod.series}</h2>
            <br />
            <p>{vodData.vod.desc}</p>
        </div>
        <br />
        <div>
            <h1>Episode:</h1>
            <h1>{vodData.vod.ep}</h1>
        </div>
        <br />
        <div>
        <Vodseries  series={vodData.vod.series} />
        </div>
        <div>
            <video controls>
                <source src={vodData.vod.path} type="video/mp4" />
            </video>
        </div>
        </div>



    </Fragment>

}

const mapStateToProps = state => {
    return{
        vodData: state.vods,
        error: state.vods.error
    }
}


export default connect(mapStateToProps, {getVodById, loadUser})(Vod)

