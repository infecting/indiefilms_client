import Img from '../assets/home.jpg';
import '../index.css'
import {useEffect} from 'react';

export default function Home() {
    useEffect(() => {
        var header = document.getElementById("h")
        header?.classList.add("none")
    }, [])
    return (
            <>
            <img className="home-img" src={Img} alt=""/>
            <div className="home-wrapper"> 
                <div className="wrapper center">
                    <h1>IndieFilms</h1>
                    <p>Revolutionizing content consumption for indie filmmakers</p>
                    <a href="/movies" className="btn-primary">Go to Movies</a>
                </div>
            </div>
            </>
        
    )
}
