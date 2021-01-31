import {useEffect, useState} from 'react'
import { deleteMovie, getMovies, IMovie } from '../api';
import Movie from '../components/Movie';
import '../index.css'

export default function Movies() {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [bannerPicture, setBannerPicture] = useState("");

    const movie = async() => {
        try {
            let res = await getMovies()
            console.log(res.movies[0])
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
    
    useEffect(() => {
        movie()
        setBannerPicture("https://media1.fdncms.com/pittsburgh/imager/u/original/17488698/movie_theater_reopening.jpg")
    }, [movies])
    return (
        <div>
            <img src={bannerPicture} alt="banner" width="100%" height="300vh"/>
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
        </div>
    )
}
