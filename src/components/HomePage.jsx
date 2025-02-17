import { useContext, useState } from "react";
import SearchResults from "./SearchResults";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import TitleBar from "./TitleBar";
import { CurrencyContext } from "../App";


export default function HomePage(){
  const [query,setQuery] = useState("");
  const {currency} = useContext(CurrencyContext)
  
  useEffect(()=>{
    // console.log(query)
  },[query])
  return(<>
  <TitleBar/>
  <div className=" w-[100%] min-h-screen bg-white dark:bg-gray-900">
    <SearchBar setQuery={setQuery}/>
    <SearchResults query={query} currency={currency}/>
  </div>
  </>)
}