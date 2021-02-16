import {FormEvent, useEffect, useState} from 'react';
import { confirmMovies, deleteMovie, getAdminMovies, IMovie, refreshToken } from '../api';
import {useHistory} from 'react-router-dom'
import Movie from '../components/Movie';

export default function Admin() {
    const history = useHistory()
    const [movies, setMovies] = useState<IMovie[]>([])

    const confirm = async(e:FormEvent, id:string) => {
        let {accessToken} = await refreshToken();
        await confirmMovies(id, accessToken)
        e.preventDefault()
    }

    const remove = async(e:FormEvent, id:string) => {
        let {accessToken} = await refreshToken();
        const newList = movies.filter((movie) => movie._id !== id);
        setMovies(newList);
        await deleteMovie(id, accessToken)
        e.preventDefault()
    }

    const helper = async() => {
        try {
            let {accessToken} = await refreshToken();
            let res = await getAdminMovies(accessToken)
            setMovies(res.movies)
        } catch(e) {
            history.push("/login")
            console.error(e)
        }
    }
    useEffect(() => {
        helper()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="wrapper">
            {movies.map((movie) => (
                        <div className="movie" key={movie._id}>
                            <Movie key={movie._id} movie={movie}/>
                            <br/>
                            <button onClick={e => confirm(e, movie._id)}>Confirm</button>
                            <br/>
                            <button onClick={e => remove(e, movie._id)} >Delete</button>
                        </div>
                    ))}
        </div>
    )
}
