import { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, ListGroupItem, ListGroup, Button, Image,Card, AccordionCollapse } from 'react-bootstrap'
import RickMortyProps from '../RickMortyProps/RickMortyProps'
import styleInfo from '../../styles/styleInfo.css'


export default function RickMortyInfo() {

    const URL_BASE = 'https://rickandmortyapi.com/api/character/'
 


    const [data, setData] = useState([]) // para el mapeo del personaje 
    const [charId, setCharId] = useState(1) // counter para personajes
    const [error, setError] = useState(false) // tirar un error
    const [saveOutput,setSaveOutput] = useState([]) //guardar info y obtener el primer episodio del personaje
    

    const getURLEp = async (url) => {  //2. del url , obtener info del personaje (primer episodio)

        try {
            const guardainfo = await axios.get(url)
            console.log(guardainfo.data) 
            setSaveOutput([...saveOutput,guardainfo.data]) // !!<--- aqui es donde empieza a fallar ----->!!
            console.log(saveOutput)

        }
        catch (err) {
            console.log(err)
        }

    }

    const getRMInfo = async () => {  //1. obtengo la data
        

        try {
    
            const response = await axios.get(`${URL_BASE}`)

            setData(response.data)


            let i = 0
            while (i<5) {
                getURLEp(response.data.results[i].episode[0])
                //console.log(response.data.results[i].episode[0])
                i++
            }

            // setCharId(charId + 1)
            setError(false)
          
          


        }
        catch (err) {
            console.log(err)
            setError(true)
        }
    }




    //function, not function call
    const handleClick = () => {
    setCharId(charId + 1)
    }

    const handleBack = () => {
        setCharId(charId - 1)
    }

    const handleChange = (e) => {
        // e -> es de event
        // console.log(e.target.value)
        setCharId(e.target.value)
    }


    useEffect(() => {
        getRMInfo(charId)
    }, [charId])






    
    return (
         <>
              
           {/* <h5> {dataep.name}   </h5> */}

        {data.length === 0 ? null : data.results.map((character,index)=>{

        if(index <5){

            console.log(saveOutput.episode)
            return(
                <div className="epbox">
                <RickMortyProps class="creo"
                 key={index}
                 imgRM={character.image}
                />

                    <div className="details">
                        <RickMortyProps 
                            name={character.name}
                            lives={character.location.name}
                            />
                        <h3>{saveOutput.episode}</h3>
                        {/* <h5>{character.episode[0]}</h5> */}
                        
                </div>
                </div>
                
        )
    }
        
        
})}

            
            
{/* 
        <div class="botones">
        {charId > 1 ? <Button onClick={handleBack} >Regresar</Button> : null}
        {charId < 5 ? <Button onClick={handleClick}>Get Character</Button> : null}
        </div> */}


         

         </>



    )
}