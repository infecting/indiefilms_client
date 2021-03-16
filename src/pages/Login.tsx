import {FormEvent, useState} from 'react'
import { login } from '../api'
import {Link, useHistory} from 'react-router-dom';
import '../index.css'

export default function Login() {
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const submitHandle = async (e: FormEvent) => {
        e.preventDefault()
        try {
            let res = await login(email, password)
            if (res.accessToken) {
                localStorage.setItem("id", res.user._id)
                history.push("/movies")
            }
        } catch(e) {
            console.error(e)
        }
        
    }
    return (
        <div className="wrapper">
            <form onSubmit={(e) => submitHandle(e)}>
                <label htmlFor="email">Email</label>
                <br/>
                <input id="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
                <br/>
                <label htmlFor="password">Password</label>
                <br/>
                <input id="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                <br/>
                <Link to="/register">Need an account? Click here.</Link>
                <br/>
                <input type="submit" className="btn-primary" />
            </form>
        </div>
    )
}
