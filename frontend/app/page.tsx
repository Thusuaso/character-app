'use client';


import {useCharactersQuery} from "./generated/graphql";
import {useQueryState} from 'nuqs';
import {useState} from 'react';


const statusStyle: Record<string,string>={
  ALIVE:'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
  DEAD:'bg-rose-500/20 text-rose-300 border-rose-400/30',
  UNKNOWN:'bg-slate-500/20 text-slate-300 border-slate-400/30'
}



export default function Home(){

  const [status,setStatus] = useQueryState('status');
  const [gender,setGender] = useQueryState('gender');
  const [search,setSearch] = useQueryState('search');

  const [searchInput,setSearchInput] = useState(search ?? '');




  const {data, isLoading, error} = useCharactersQuery({
    filter:{
      status:status || undefined,
      gender:gender || undefined,
      search:search || undefined,
    }
  });

  const applySearch = () => setSearch(searchInput || null);

  const characters = data?.characters ?? [];


  if(isLoading) return <p>loading.......</p>
  if(error)return <p>something went wrong</p>
  
  return(



    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

    <div className="relative mx-auto max-w-7xl px-6 py-10">
              <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Character Explorer
          </h1>
          <p className="mt-2 text-slate-400">
            Browse and filter characters across the multiverse.
          </p>
        </header>

            <div className="flex flex-wrap gap-3 mb-6">
      <select 
      value={status || ''}
      onChange={(e) => setStatus(e.target.value || null)}
      className="border rounded px-3 py-2"
      >
        <option value="">All statuses</option>
        <option value="ALIVE">Alive</option>
        <option value="DEAD">Dead</option>
        <option value="UNKNOWN">Unknown</option>
      </select>

      <select value={gender??''}
        onChange={(e) => setGender(e.target.value || null)}
        className="border rounded px-3 py-2"


      >

      <option value="">All genders</option>
      <option value="MALE">Male</option>
      <option value="FEMALE">Female</option>
      <option value="UNKNOWN">Unknown</option>




      </select>

      <input 
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) =>{if (e.key === 'Enter') applySearch()}}
        placeholder="Search by name or description"
        className="border rounded px-3 py-2 flex-1"
      />
      <button 
        onClick={applySearch} 
        className="border rounded px-4 py-2 bg-black text-white">
        Search
      </button>

    </div>


      {/*Boş Durumda */}
      {
        !isLoading && !error && characters.length === 0 && (
                    <div className="rounded-2xl border border-white/10 bg-white/5 py-20 text-center backdrop-blur-xl">
            <p className="text-lg font-medium">No characters found</p>
            <p className="mt-1 text-sm text-slate-400">
              Try adjusting your filters or search term.
            </p>
          </div>
        )
      }

      
        {/*Sonuçlar*/}



      {!isLoading && characters.length >0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.characters.map((character)=>(
        <div key={character.id} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10">
          <img src={character.image} alt={character.name} className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105" />
          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
                <h2 className="font-bold mt-2">{character.name}</h2>
                                    <span
                      className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium ${statusStyle[character.status]}`}
                    >
                      {character.status}
                    </span>

            </div>
                            <p className="mt-1 text-xs text-slate-400">{character.gender}</p>
                <p className="mt-2 line-clamp-2 text-sm text-slate-300">{character.description}</p>
          </div>




        </div>
      ))}

    </div>


      )}


    </div>
    {/*Filtreler*/}



    </div>






  )
}