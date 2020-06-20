import React, {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../redux'
import Spinner from '../layout/Spinner';
import { getHentaiById } from '../../redux';
import Hentaiseries from './Hentaiseries'



const Hentai = ({getHentaiById, hentaiData, match, loadUser, error}) => {
    useEffect(() => {
        getHentaiById(match.params.id)
        loadUser()
    }, []);

    if(error){
        alert(error)
    }

    return hentaiData.hentai === null ? <Spinner /> : <Fragment>
        <div className="single-vod">
        <div>
            <h1>{hentaiData.hentai.title}</h1>
            <h2>By: {hentaiData.hentai.creator}</h2>
            <h2>Series: {hentaiData.hentai.series}</h2>
            <p>{hentaiData.hentai.description}</p>
        </div>
        <div>
            <h1>Episode:</h1>
            <h1>{hentaiData.hentai.ep}</h1>
        </div>
        <div>
        <Hentaiseries  series={hentaiData.hentai.series} />
        </div>
        <div className="vod-center">
            <img className="vod-img" src={hentaiData.hentai.thumbnail} alt="thumbnail" />
        </div>
        <div className="vod">
            <video controls>
                <source src={hentaiData.hentai.path} type="video/mp4" />
            </video>
        </div>
        </div>


        <div className="single-vod-mobile">
        <div>
            <h1>{hentaiData.hentai.title}</h1>
            <h2>By: {hentaiData.hentai.creator}</h2>
            <h2>Series: {hentaiData.hentai.series}</h2>
            <br />
            <p>{hentaiData.hentai.desc}</p>
        </div>
        <br />
        <div>
            <h1>Episode:</h1>
            <h1>{hentaiData.hentai.ep}</h1>
        </div>
        <br />
        <div>
        <Hentaiseries  series={hentaiData.hentai.series} />
        </div>
        <div>
            <video controls>
                <source src={hentaiData.hentai.path} type="video/mp4" />
            </video>
        </div>
        </div>








    </Fragment>
}

const mapStateToProps = state => {
    return{
        hentaiData: state.hentai,
        error: state.hentai.error
    }
}



export default connect(mapStateToProps, {getHentaiById, loadUser})(Hentai)