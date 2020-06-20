import React, {Fragment, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getHentai, loadUser } from '../../redux';
import { searchHentai } from '../../redux';


const Hentais = ({ getHentai, searchHentai, hentaiData: { hentais, loading }, loadUser, error }) => {
    
    useEffect(() => {
        getHentai()
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
        searchHentai(text);
    }


   
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Search for hentai..." name="text" value={text} onChange={e => onChange(e)} />
                    <input type="submit" className="btn" value="Search!" />
                </div>
            </form>


            <div className="vods">
                {hentais.map(hentai => (
                  <div key={hentai.hentaiID} className="vod-item">
                  <a href={`/hentai/${hentai.hentaiID}`}>
                  <img src={hentai.thumbnail} alt="thumbnail" />
                  <p>{hentai.year} | {hentai.type} </p>
                  <p>{hentai.title}</p>
                  </a>
                  </div>
                ))}
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return{
        hentaiData: state.hentai,
        error: state.hentai.error
    }
}



export default connect(mapStateToProps, {getHentai, loadUser, searchHentai})(Hentais)