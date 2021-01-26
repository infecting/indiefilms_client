import axios from 'axios';
import {FormEvent, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import { createMovie, refreshToken } from '../api';
import '../index.css'

export default function CreateMovie() {
    const history = useHistory()
    const [userId, setUserId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [url, setUrl] = useState("")
    const [coverPicture, setCoverPicture] = useState("")
    const [loading, setLoading] = useState(false)

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
    return (
        <div className="wrapper">
            <form className="login-form" onSubmit={(e) => submitHandle(e)}>
                <label htmlFor="title">Title:</label>
                <input id="title" type="text" placeholder="title" onChange={(e) => setTitle(e.target.value)}/>
                <br/>
                <label htmlFor="description">Description:</label>
                <input id="description" type="text" placeholder="description" onChange={(e) => setDescription(e.target.value)}/>
                <br/>
                <label htmlFor="file">Movie File:</label>
                {loading ? <p>Loading...</p>: <input type="file" id="file" placeholder="url" onChange={(e) => fileUpload(e)}/>}
                <br/>
                <label htmlFor="coverPicture">Cover Picture:</label>
                <input type="text" id="coverPicture" placeholder="cover picture" onChange={(e) => setCoverPicture(e.target.value)}/>
                <br/>
                <input type="submit"/>
            </form>
        </div>
    )
}
