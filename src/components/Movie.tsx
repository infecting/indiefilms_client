import { IMovie } from "../api"
import {Link} from 'react-router-dom'

type MovieProps = {
    movie: IMovie
}

export default function Movie({movie}: MovieProps) {
    return (
        <>
            <Link to={`/movies/${movie._id}`}><img height="200px" width="133px" className="poster" src={movie.coverPicture} alt={movie.title}/></Link>
        </>
    )
}
