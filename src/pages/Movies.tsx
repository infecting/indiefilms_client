import {useEffect, useState} from 'react'
import { getMovies } from '../api';

export default function Movies() {
    const movie = async() => {
        try {
            let res = await getMovies()
            setMovies(res.movies)
        } catch(e) {
            console.error(e)
        }
    }
    const [movies, setMovies] = useState<any[]>([]);
    useEffect(() => {
        movie()
    }, [])
    return (
        <div>
            {movies.map((movie) => (
                <div>{movie.title}</div>
            ))}
        </div>
    )
}
