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
        <div>
            <form onSubmit={(e) => submitHandle(e)}>
                <input type="email" onChange={(e) => setEmail(e.target.value)}/>
                <input type="text" onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                <input type="submit"/>
            </form>
        </div>
    )
}
