import axios from 'axios';
import {FormEvent, FormEventHandler, useState} from 'react';
import {useHistory} from 'react-router-dom'
import { createMovie } from '../api';

export default function CreateMovie() {
    const history = useHistory()
    const [userId, setUserId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [url, setUrl] = useState("")
    const [coverPicture, setCoverPicture] = useState("")

    const submitHandle = async (e: FormEvent) => {
        e.preventDefault()
        await createMovie(userId, title, description, url, coverPicture)
        history.push("/movies")
    }

    const fileUpload = async(e: any) => {
        try {
            const data = new FormData();
            data.append('file', e.target.files[0])
            axios.post(`${process.env.REACT_APP_URI}/api/v1/movies/upload`, data)
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
