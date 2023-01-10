import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

interface DatasForm {
  fullName: string
  email: string
  maritialStatus: string
  genre: string
}

function App() {
  const [data, setData] = useState<DatasForm>({
    fullName: '',
    email: '',
    maritialStatus: '',
    genre: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setData((prev) => {
      const newData: DatasForm = { ...prev, [name]: value }
      return newData
    })
  }

  const calculateProgress = () => {
    let value = 0
    let amountToAdd = 25

    if(data.fullName) {
      const explodeString = data.fullName.split(' ')
      if(explodeString[1]) {
        value += amountToAdd
      }
    }
    if(data.email) {
      let pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if(pattern.test(data.email)) {
        value += amountToAdd
      }
    }
    if(data.maritialStatus) {
      value += amountToAdd
    }
    if(data.genre) {
      value += amountToAdd
    }

    return value
  }

  calculateProgress()

  const handleClick = () => {
    alert('Formulário enviado com sucesso')
    setData({
      fullName: '',
      email: '',
      maritialStatus: '',
      genre: ''
    })
  }

  return (
    <div className='App'>
      <h3>desafio fernandev</h3>
      <h1>progresso do formulário</h1>

      <main>
        <div className="bar-container">
          <div className="bar" style={{ width: `${calculateProgress()}%` }}>

          </div>
        </div>
        <div className='form-group'>
          <label htmlFor=''>Nome Completo</label>
          <input name="fullName" value={data.fullName} onChange={(e) => handleChange(e)} />
        </div>
        <div className='form-group'>
          <label htmlFor=''>E-mail</label>
          <input name='email' value={data.email} onChange={(e) => handleChange(e)} />
        </div>
        <div className='form-group'>
          <label htmlFor=''>Estado Civil</label>
          <select name='maritialStatus' value={data.maritialStatus} onChange={(e) => handleChange(e)}>
            <option value=''>- Selecione...</option>
            <option value='solteiro'>Solteiro</option>
            <option value='casado'>Casado</option>
            <option value='divorciado'>Divorciado</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor=''>Gênero</label>
          <div className='radios-container'>
            <span>
              <input type='radio' name='genre' value='masculino' onChange={(e) => handleChange(e)} checked={data.genre === 'masculino'} /> Masculino
            </span>
            <span>
              <input type='radio' name='genre' value='feminino' onChange={(e) => handleChange(e)} checked={data.genre === 'feminino'} /> Feminino
            </span>
          </div>
        </div>
    
        <button onClick={handleClick} disabled={calculateProgress() !== 100}>Enviar Formulário</button>

      </main>
    </div>
  );
}

export default App
