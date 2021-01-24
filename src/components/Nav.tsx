export default function Nav() {
    return (
        <div className="wrapper bg">
            <header>
                <nav>
                    <h1>Indiefilms</h1>
                    <ul>
                        <li><a href="/movies">Home</a></li>
                        <li><a href="/movies/new">Post Movie</a></li>
                        <li><a href="/profile">Profile</a></li>
                    </ul>
                </nav>
            </header>
        </div>
        
    )
}
