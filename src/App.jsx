import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState({ name: "", bday: "" })
  const [DBData, setDBData] = useState([])

  // ! ***************************************
  // !TODO - ADICIONAR NOVO STATE COM INFO DA DB???
  // ! ***************************************


  const handleNameChange = (e) => {                                              
    setInputValue(prevState => ({ name: e.target.value, bday: prevState.bday })) 

  }                                                                               

  const handleDateChange = (e) => {                                               
    setInputValue(prevState => ({ name: prevState.name, bday: e.target.value }))  
    
  }                                                                           




  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch('api/animal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputValue)
    });

    const result = await res.json()


    setInputValue({ name: "", bday: "" })
    getData()


  }


  const getData = async () => {
    const res = await fetch('api/animal')
    const data = await res.json()
    setDBData(data)

  }

  // !TODO - PERGUNTAR AO RAFA O PORQUE DAS DEPENDENCIAS ESTAREM A SER MENTIROSAS COMIGO E COM O MEU AMIGO CUNHA !

  useEffect(() => {
    getData()

  }, [])


  const showMoreInfo = (i) => {

    setDBData(prevState => prevState.map((ele, idx) => idx === i ? { ...ele, show: !ele.show } : ele))
    console.log()
  }


  const deleteItem = async (i) => {

    const res = await fetch(`api/animal/${i}`, {
      method: 'DELETE',
      "Content-Type": "application/json",
    })


    getData()
  }



  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="animalName">Nome do bichano: </label>
          <input name="animalName" autoComplete="off" onChange={(e) => handleNameChange(e)} value={inputValue.name} type='text'></input>
        </div>
        <br />
        <div>
          <label htmlFor="animalBday">Data de nascimento do canideo: </label>
          <input name="animalBday" type='date' onChange={(e) => handleDateChange(e)}></input>
        </div>

        <br />
        <button>Submit</button>
      </form>
      <div>
        <ul>
          {DBData && DBData.map((el, idx) =>
            <li>
              <button onClick={() => showMoreInfo(idx)}>SHOW MORE    </button>
              <span>-------------{idx + 1}---------------</span>
              <button onClick={() => deleteItem(idx)}>Delete</button>
              {el.show &&
                <div>
                  <p>{el.name}</p>
                  <p>{el.birthday}</p>
                </div>}



            </li>)}
        </ul>
      </div>


    </>
  )
}

export default App
