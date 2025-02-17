import { useState } from "react";
import SearchResults from "./SearchResults";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import TitleBar from "./TitleBar";


export default function HomePage({currency}){
  const [query,setQuery] = useState("");
  
  
  useEffect(()=>{
    // console.log(query)
  },[query])
  return(<div className=" w-[100%] min-h-screen bg-white dark:bg-gray-900">
    <SearchBar setQuery={setQuery}/>
    <SearchResults query={query} currency={currency}/>
  </div>)
}