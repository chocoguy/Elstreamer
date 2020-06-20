import React, {useState} from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux'
import  Quote  from './Quote';
import logo from './ElStreamerLogo.png'
import izzy from './izzy.png'
import pika from './pika.png'
import miku from './miku.png'

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {

    


   
    if(isAuthenticated === false){
        return(
            <div>
            <nav className="navbar">
            <div className="nav2">
                <a href="/"><img src={logo} alt="Elstreamer logo" className="resize-nav-logo"></img></a>
            </div>
            <div className="nav2">
                <Quote />
            </div>
            <div className="nav-flex">
                <a href="/editors-picks"><img src={miku} alt="miku" className="navbar-image" /></a>
            </div>
            <div className="nav-flex">
                 <a href="/hentai"><img src={izzy} alt="izzy" className="navbar-image" /></a>
             </div>
             <div className="nav-flex">
                 <a href="/vods"><img src={pika} alt="pika" className="navbar-image" /></a>
             </div>
             <div>
                 <a href="/register"><button>Register</button></a> 
             </div>
             <div>
             <a href="/editors-picks" className="nav-flex"><p>Editors pick</p></a>  
             </div> 
             <div>
             <a href="/hentai" className="nav-flex"><p>Hentai</p></a>
             </div>
             <div>
             <a href="/vods" className="nav-flex"><p>Vods</p></a> 
             </div>
             <div>
                 <a href="/login"><button>Login</button></a>
             </div> 
        </nav>



        <nav className="mobile-nav">
        <div className="topnav">
        <a href="/"><img src={logo} alt="Elstreamer logo" className="resize-nav-logo-mobile"></img></a>
        <input type="checkbox" className="toggler" />
        <div className="hamburger"><div></div></div>
        <Quote />
        <div id="myLinks">
        <a href="/editors-picks"><p>Editors pick</p></a>
        <a href="/hentai"><p>Hentai</p></a>
        <a href="/vods"><p>Vods</p></a>
        <a href="/login"><button>Login</button></a>
        <a href="/register"><button>Register</button></a>
        </div>
        </div>
        </nav>
        <hr />
        </div>
        )
    }else{
        return(
            <div>
            <nav className="navbar">
            <div className="nav2">
                <a href="/"><img src={logo} alt="Elstreamer logo" className="resize-nav-logo"></img></a>
            </div>
            <div className="nav2">
                <Quote />
            </div>
            <div className="nav-flex">
                <a href="/editors-picks"><img src={miku} alt="miku" className="navbar-image" /></a>
            </div>
            <div className="nav-flex">
                 <a href="/hentai"><img src={izzy} alt="izzy" className="navbar-image" /></a>
             </div>
             <div className="nav-flex">
                 <a href="/vods"><img src={pika} alt="pika" className="navbar-image" /></a>
             </div>
             <div>
                 <a onClick={logout}><button>Logout</button></a> 
             </div>
             <div>
             <a href="/editors-picks" className="nav-flex"><p>Editors pick</p></a>  
             </div> 
             <div>
             <a href="/hentai" className="nav-flex"><p>Hentai</p></a>
             </div>
             <div>
             <a href="/vods" className="nav-flex"><p>Vods</p></a> 
             </div>
             <div>
            <p>Welcome: {user}</p>
             </div> 
        </nav>
        <nav className="mobile-nav">
        <div className="topnav">
        <a href="/"><img src={logo} alt="Elstreamer logo" className="resize-nav-logo-mobile"></img></a>
        <input type="checkbox" className="toggler" />
        <div className="hamburger"><div></div></div>
        <Quote />
        <div id="myLinks">
        <a href="/editors-picks"><p>Editors pick</p></a>
        <a href="/hentai"><p>Hentai</p></a>
        <a href="/vods"><p>Vods</p></a>
        <p>Welcome: {user}</p>
        <a onClick={logout}><button>Logout</button></a>
        </div>
        </div>
        </nav>
        <hr />
        </div>
        )
    }

}
//<a onClick={logout}><button>Logout</button></a>
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);
