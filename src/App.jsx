import { useEffect, useState } from "react"

const API_ENDPOINT_CAT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const API_ENDPOINT_CAT_IMAGE = `https://cataas.com/cat/says/${firstword}?json=true`

export function App () {
    const [fact, setFact] = useState()

    useEffect(() => {
      fetch(API_ENDPOINT_CAT_RANDOM_FACT)
        .then(res => res.json())
        .then(data => {
            const { fact } = data
            setFact(fact)

            const threeeFirstWord = fact.split(' ', 3) // const firstWord = fact.split(' ').slice(0, 3.join(' '))
        })
    }, [])
    
    return (
        <main>
            <h1>App de gatitos</h1>
            {fact && <p>{fact}</p>}
        </main>
    
    )
}