import axios from 'axios';
import {FormEvent, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import { createMovie, refreshToken } from '../api';

export default function CreateMovie() {
    const history = useHistory()
    const [userId, setUserId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [url, setUrl] = useState("")
    const [coverPicture, setCoverPicture] = useState("")

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
            const data:FormData = new FormData();
            data.append('file', e.target.files[0])
            const res = await axios.post(`${process.env.REACT_APP_URI}/api/v1/movies/upload`, data)
            setUrl(res.data.data.downloadUri)
        } catch(e) {
            alert(e)
        }
    }
    return (
        <div>
            <form onSubmit={(e) => submitHandle(e)}>
                <input type="text" placeholder="title" onChange={(e) => setTitle(e.target.value)}/>
                <input type="text" placeholder="description" onChange={(e) => setDescription(e.target.value)}/>
                <input type="file" placeholder="url" onChange={(e) => fileUpload(e)}/>
                <input type="text" placeholder="cover picture" onChange={(e) => setCoverPicture(e.target.value)}/>
                <input type="submit"/>
            </form>
        </div>
    )
}
