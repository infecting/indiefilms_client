import {RouteComponentProps} from 'react-router-dom'
import {useEffect, useState} from 'react';
import { getMovie, IMovie } from '../api';

type TParams = {id: string};


 
export default function MoviePlayer({ match }:RouteComponentProps<TParams>) {
    const [movie, setMovie] = useState<IMovie>({
        _id: "",
        userId: "",
        title: "",
        description: "",
        url: "",
        coverPicture: "",
        score: 0
    })
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        getMovie(match.params.id).then((data) => setMovie(data.movie)).catch((e) => console.error(e))
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="wrapper">
            <video controls preload="auto" width="100%" height="auto">
                <source key={movie._id} src={`${movie.url}#t=0.5`} type="video/mp4"/>
    </video>
            
            <h1>{movie.title}</h1>
            <p>{movie.description}</p>
            <p>Posted by: {movie._id}</p>
        </div>
    )
}
