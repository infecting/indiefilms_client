import {Link} from 'react-router-dom'

export default function Home() {
    return (
        <div className="header-wrapper">
            <div className="wrapper">
                <h1>IndieFilms</h1>
                <p>Revolutionizing content consumption for indie filmmakers</p>
                <Link to="/movies">Movies</Link>
            </div>
        </div>
    )
}
