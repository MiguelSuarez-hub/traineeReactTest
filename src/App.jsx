import { useEffect, useState } from "react"
import './App.css'

const API_ENDPOINT_CAT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const API_ENDPOINT_CAT_IMAGE = `https://cataas.com/cat/says/${threeFirstWords}?json=true`
const CAT_PREFIX_URL = 'https://cataas.com'

export function App () {
    const [fact, setFact] = useState()
    const [imageUrl, setImageUrl] = useState()
    // Obtener Fact cada vez que cargamos la pagina
    useEffect(() => {
      fetch(API_ENDPOINT_CAT_RANDOM_FACT)
        .then(res => {
            if (!res.ok) throw new Error('Error fetching fact')
            return res.json()
        })
        .then(data => {
            const { fact } = data
            setFact(fact)
        })
        .catch((err) => {
            //tanto si hay error con la respuesta como con la petición
            console.error(err)
        })
    }, [])
    // Obtener imagen cada vez que cambia de fact
    useEffect(() =>{
        if(!fact) return
        const threeFirstWords = fact.split(' ', 3).join(' ') // const firstWord = fact.split(' ').slice(0, 3.join(' '))
        fetch(`https://cataas.com/cat/says/${threeFirstWords}?json=true`)
            .then(res => res.json())
            .then(response => {
                const { url } = response
                setImageUrl( url )
            })
    }, [fact])
    
    return (
        <main>
            <h1>App de gatitos</h1>
            {fact && <p>{fact}</p>}
            {imageUrl && <img src={`${CAT_PREFIX_URL}${imageUrl}`} alt={`This image show an random image with the first letter of the ${fact}`} />}
        </main>
    
    )
}