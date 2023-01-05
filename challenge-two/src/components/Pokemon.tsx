import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Pokemon.css'

type Props = {
    url: string
}

interface DetailsPokemon {
    name: string
    image: string
    xp: string
}

const Pokemon = ({ url }: Props) => {

    const [detailsPokemon, setDetailsPokemon] = useState<DetailsPokemon>()

    useEffect(() => {
        axios.get(url)
            .then(resp => {
                setDetailsPokemon({ 
                    name: resp.data.name, 
                    image: resp.data.sprites.front_default, 
                    xp: resp.data.base_experience 
                })
            })
    }, [url])

  return (
    <div className='pokemon'>
        {detailsPokemon && (
            <div className='detailsPokemon'>
                <img src={detailsPokemon.image} alt="" />
                <p className='namePokemon'>{detailsPokemon.name}</p>
                <p>xp: {detailsPokemon.xp}</p>
            </div>
        )}
        
    </div>
  )
}

export default Pokemon