'use client';


import {useCharactersQuery} from "./generated/graphql";
export default function Home(){
  const {data, isLoading, error} = useCharactersQuery();
  if(isLoading) return <p>loading.......</p>
  if(error)return <p>something went wrong</p>
  
  return(
    <div className="grid grid-cols-1 sm:grip-cols-2 md:grip lg:grid-cols-3 gap-4 p-6">
      {data?.characters.map((character)=>(
        <div key={character.id} className="border rounded-lg p-4 shadow-md">
          <img src={character.image} alt={character.name} className="w-full h-48 object-cover rounded-md" />
          <h2 className="font-bold mt-2">{character.name}</h2>
          <p className="text-sm">{character.status} - {character.gender}</p>
          <p className="text-sm text-gray-500 font-semibold">${character.description}</p>



        </div>
      ))}

    </div>
  )
}