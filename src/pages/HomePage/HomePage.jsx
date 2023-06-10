import React, { useEffect } from 'react'
import { useState } from 'react'
import{ MovieCard } from '../../components/MovieCard/MovieCard'
import { fetchMovies } from '../../utils/movie-api'

export function HomePage() {
  const [movie, setMovie] = useState([])

  const getMovies = async () =>{
    const {data} = await fetchMovies()

    console.log(data);
  }

  useEffect(()=>{
    getMovies()
  }, [])

  return (
    <div>

    <h1>HomePage</h1>
    
    </div>
    
  )
}
