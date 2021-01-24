import {useEffect, useState} from 'react'
import { deleteMovie, getMovies, IMovie } from '../api';
import Movie from '../components/Movie';
import '../index.css'

export default function Movies() {
    const movie = async() => {
        try {
            let res = await getMovies()
            setMovies(res.movies)
        } catch(e) {
            console.error(e)
        }
    }

    const onDelete = async (id: string) => {
        const newList = movies.filter((movie) => movie._id !== id);
        setMovies(newList);
        await deleteMovie(id)
    }
    const [movies, setMovies] = useState<IMovie[]>([]);
    useEffect(() => {
        movie()
    }, [])
    return (
            <div className="wrapper">
                <div className="movies-wrapper">
                    {movies.map((movie) => (
                        <div key={movie._id}>
                            <Movie key={movie._id} movie={movie}/>
                            {localStorage.getItem("id") === movie.userId ? <button onClick={() => onDelete(movie._id)}>DELETE</button>: null}
                        </div>
                    ))}
                </div>
            </div>
    )
}
