const RickMortyProps = ({id,name,imgRM,lives,episodenum}) => {

    return (
        <>

            <img src={imgRM} alt={imgRM} />
            <h2>{id}</h2>
            <h1>{name}</h1>
             <h2>{episodenum}</h2>
            {/* <h2>{epname}</h2>  */}
            <h3>{lives}</h3>
            

        </>
    )
}

export default RickMortyProps