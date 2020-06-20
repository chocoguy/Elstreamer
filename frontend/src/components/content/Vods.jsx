import React, {Fragment, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getVods, loadUser } from '../../redux';
import { searchVods } from '../../redux';

const Vods = ({ getVods, searchVods, vodData: { vods, loading }, loadUser, error }) => {
    useEffect(() => {
        getVods()
        loadUser()
    }, [])

    if(error){
        alert(error)
    }

    const [textData, setTextData] = useState({
        text: ''
    })
    const {text} = textData;

    const onChange = e => setTextData({...textData, [e.target.name]: e.target.value})

    const onSubmit = async e => {
        e.preventDefault();
        searchVods(text);
    }
 
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <input type="text" placeholder="Search for a vod..." name="text" value={text} onChange={e => onChange(e)} />
                <input type="submit" className="btn btn-primary" value="Search" />
            </div>
            </form>
            <div className="vods">
                {vods.map(vod => (
                    <div key={vod.streamerID} className="vod-item">
                    <a href={`/vods/${vod.streamerID}`}>
                    <img src={vod.thumbnail} alt="thumbnail" />
                    <p>{vod.year} | {vod.type} </p>
                    <p>{vod.title}</p>
                    </a>
                    </div>
                ))}
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return{
        vodData: state.vods,
        error: state.vods.error
    }
}


export default connect(mapStateToProps, {getVods, searchVods, loadUser})(Vods)