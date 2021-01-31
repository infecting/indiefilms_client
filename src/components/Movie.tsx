import { IMovie } from "../api"
import {Link} from 'react-router-dom'

type MovieProps = {
    movie: IMovie
}

export default function Movie({movie}: MovieProps) {
    return (
        <div className="movie">
            <Link to={`/movies/${movie._id}`}><img height="250" width="166" src={movie.coverPicture} alt={movie.title}/></Link>
        </div>
    )
}
