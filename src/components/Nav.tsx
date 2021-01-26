export default function Nav() {
    return (
        <div className="wrapper bg">
            <header>
                <nav>
                    <h1><a href="/movies">IndieFilms</a></h1>
                    <ul>
                        <li><a href="/movies">Home</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/movies/new">Post Movie</a></li>
                        <li><a href="/profile">Profile</a></li>
                    </ul>
                </nav>
            </header>
        </div>
        
    )
}
