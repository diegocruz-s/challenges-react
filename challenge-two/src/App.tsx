import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'
import Pokemon from './components/Pokemon'
import { v4 as uuidv4 } from 'uuid'

interface Pokemon {
  name: string
  url: string
}

function App() {
  const [listPokemon, setListPokemon] = useState<Pokemon[]>([])
  const [skip, setSkip] = useState<number>(0)
  const limit: number = 9
  const [qtdPages, setQtdPages] = useState<number | null>(null)
  const [count, setCount] = useState<number>(1)

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${skip}&limit=${limit}`)
      .then(resp => { 
        setQtdPages(Math.ceil(resp.data.count / limit))
        setListPokemon(resp.data.results) 
      })
  }, [skip, limit])

  const morePokemons = () => {
    if((qtdPages && count < qtdPages)){
      setCount(prevState => prevState + 1)
      skip < 10 ? setSkip(10) : setSkip(skip + limit)
    }
  }

  const lessPokemons = () => {
    if(count > 1){
      setCount(prevState => prevState - 1)
      skip > 10 ? setSkip(skip - limit) : setSkip(0)
    }
  }

  return (
    <div className="App">
      <h1>Challenge react</h1>
      <div className='allPokemons'>
        {(listPokemon && listPokemon.length > 0) ? (
            <>
              {listPokemon.map(pokemon => (
                <Pokemon url={pokemon.url}  key={uuidv4()} />
              ))}
            </>
        ) : (
          <p className='noPokemons'>Nenhum pokemón encontrado</p>
        )}
      </div>
      
      <div className="paginationOptions">
        <button onClick={lessPokemons}>-</button>
        <p className='count'>{count}</p>
        <button onClick={morePokemons}>+</button>
      </div>
    </div>
  )
}

export default App
