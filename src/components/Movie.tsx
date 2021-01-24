import { IMovie } from "../api"
import {Link} from 'react-router-dom'

type MovieProps = {
    movie: IMovie
}

export default function Movie({movie}: MovieProps) {
    return (
        <div className="movie">
            <Link to={`/movies/${movie._id}`}><img height="150" width="100" src={movie.coverPicture} alt={movie.title}/></Link>
            <h1>{movie.title}</h1>
            <p>{movie.description}</p>
        </div>
    )
}
