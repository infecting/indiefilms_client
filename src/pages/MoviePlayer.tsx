import {RouteComponentProps} from 'react-router-dom'
type TParams = {id: string};

export default function MoviePlayer({ match }:RouteComponentProps<TParams>) {
    return (
        <div>
            <video controls width="750" height="500">
                <source src="https://indiefilm101.s3.us-east-2.amazonaws.com/1611343533685" type="video/mp4"/>
            </video>
        </div>
    )
}
