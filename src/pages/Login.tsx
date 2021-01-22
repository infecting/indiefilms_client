import {FormEvent, useState} from 'react'
import { login } from '../api'
import {useHistory} from 'react-router-dom';

export default function Login() {
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const submitHandle = async (e: FormEvent) => {
        e.preventDefault()
        try {
            let res = await login(email, password)
            if (res.accessToken) {
                history.push("/movies")
            }
        } catch(e) {
            console.error(e)
        }
        
    }
    return (
        <div>
            <form onSubmit={(e) => submitHandle(e)}>
                <input type="email" onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                <input type="submit" />
            </form>
        </div>
    )
}
