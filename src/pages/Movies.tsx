import React, {useEffect, useState} from 'react'
import { deleteMovie, getMovies, IMovie, refreshToken} from '../api';
import Img from '../assets/home.jpg'
import Movie from '../components/Movie';
import '../index.css'



export default function Movies() {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [token, setToken] = useState("")
    const refresh_token = async() => {
        try {
            let res = await refreshToken()
            setToken(res.accessToken)
        } catch(e) {
            console.error(e)
        }
    }
    
    const movie = async() => {
        try {
            let res = await getMovies()
            setMovies(res.movies);
        } catch(e) {
            console.error(e)
        }
    }
    

    

    const onDelete = async (id: string) => {
        const newList = movies.filter((movie) => movie._id !== id);
        setMovies(newList);
        await deleteMovie(id, token)
    }
    
    useEffect(() => {
        movie()
        refresh_token()
    }, [])
    return (
        <React.Fragment>
            <img src={Img} className="movie-img" alt=""/>
            <div className="wrapper">
            <h4>Movies</h4>
                <div className="movies-wrapper">
                    {movies.map((movie) => (
                        <div className="movie" key={movie._id}>
                            <Movie key={movie._id} movie={movie}/>
                            <br/>
                            {localStorage.getItem("id") === movie.userId ? <button onClick={() => onDelete(movie._id)}>DELETE</button>: null}
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    )
}
