import Logo from '../logo.png'
import {useHistory} from 'react-router-dom'


export default function Nav() {
    const history = useHistory()
    const redirect = () => {
        history.push("/login")
    }
    return (
        <header>
            <div className="wrapper bg table">
                <nav>
                <a href="/movies"><img className="logo" alt="Indiefilms" src={Logo} height="50%" width="50%"/></a>
                    <ul>
                        <li className="items"><a href="/movies">Movies</a></li>
                        <li className="items"><a href="/movies/new">Post Movie</a></li>
                        <li className="btn-item"><button className="btn-primary" onClick={() => redirect()}>Sign in</button></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
