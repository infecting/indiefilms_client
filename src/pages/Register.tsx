import {FormEvent, useState} from 'react';
import { register } from '../api';
import {useHistory} from 'react-router-dom';

export default function Register() {
    const history = useHistory()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const submitHandle = async (e:FormEvent) => {
        e.preventDefault()
        try {
            await register(email, username, password);
            history.push("/login")
        } catch(e) {
            console.error(e)
        }
    }
    return (
        <div className="wrapper">
            <form onSubmit={(e) => submitHandle(e)}>
                <label htmlFor="email">Email</label>
                <br/>
                <input type="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                <br/>
                <label htmlFor="username">Username</label>
                <br/>
                <input type="text" id="username" onChange={(e) => setUsername(e.target.value)}/>
                <br/>
                <label htmlFor="password">Password</label>
                <br/>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                <br/>
                <input type="submit" className="btn-primary"/>
            </form>
        </div>
    )
}
