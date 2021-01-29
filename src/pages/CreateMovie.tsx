import axios from 'axios';
import {FormEvent, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import { createMovie, ITmdb, refreshToken, searchMovies } from '../api';
import '../index.css'

export default function CreateMovie() {
    const history = useHistory()
    const [userId, setUserId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [url, setUrl] = useState("")
    const [coverPicture, setCoverPicture] = useState("")
    const [loading, setLoading] = useState(false)
    const [movies, setMovies] = useState<ITmdb[]>([])

    useEffect(() => {
        refreshToken().then((data) => {setUserId(data.user._id)}).catch(e => {history.push("/login")})
    }, [userId, history])

    const submitHandle = async (e: FormEvent) => {
        e.preventDefault()
        await createMovie(userId, title, description, url, coverPicture)
        history.push("/movies")
    }

    const fileUpload = async(e: any) => {
        try {
            setLoading(true)
            const data:FormData = new FormData();
            data.append('file', e.target.files[0])
            const res = await axios.post(`${process.env.REACT_APP_URI}/api/v1/movies/upload`, data)
            setLoading(false)
            setUrl(res.data.data.downloadUri)
        } catch(e) {
            alert(e)
        }
    }

    const onTitleChange = async(e: any) => {
        try {
                setTitle(e.target.value)
                let movies:Array<ITmdb>|undefined = await searchMovies(e.target.value)
                setMovies(movies!)
        } catch(e) {
            console.error(e)
        }
    }

    const movieClick = (e:any, movie: ITmdb) => {
        e.preventDefault()
        console.log(movie)
        setTitle(movie.title)
        setDescription(movie.overview)
        setCoverPicture(`https://www.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`)
        setMovies([])
    }

    return (
        <div className="wrapper">
            <form className="login-form" onSubmit={(e) => submitHandle(e)}>
                <label htmlFor="title">Title:</label>
                <input id="title" autoComplete="off" type="text" value={title} placeholder="title" onChange={(e) => onTitleChange(e)}/>
                <br/>
                {movies? movies.map((movie) => (
                    <button key={movie.id} onClick={(e) => movieClick(e, movie)}>{movie.title}</button>
                )): null}
                <label htmlFor="description">Description:</label>
                <input id="description" type="text" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                <br/>
                <label htmlFor="file">Movie File:</label>
                {loading ? <p>Loading...</p>: <input type="file" id="file" placeholder="url" onChange={(e) => fileUpload(e)}/>}
                <br/>
                <input type="submit"/>
            </form>
        </div>
    )
}
