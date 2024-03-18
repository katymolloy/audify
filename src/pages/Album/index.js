import { useParams } from "react-router-dom"


export default function AlbumPage(){
    const params = useParams();

    return(
        
        <>
        <h1>{params.albumName}</h1></>
    )
}