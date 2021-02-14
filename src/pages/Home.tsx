import {Link} from 'react-router-dom'
import Img from '../assets/home.jpg';
import '../index.css'

export default function Home() {
    return (
            <>
            <img className="home-img" src={Img} alt=""/>
            <div className="home-wrapper"> 
                <div className="wrapper center">
                    <h1>IndieFilms</h1>
                    <p>Revolutionizing content consumption for indie filmmakers</p>
                    <Link to="/movies" className="btn-primary black-text">Go to Movies</Link>
                </div>
            </div>
            </>
        
    )
}
