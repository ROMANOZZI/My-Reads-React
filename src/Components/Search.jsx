import React from "react";
import {Link} from 'react-router-dom';
import Book from "./Book";

export default function Search(props){
    const [txt,setTxt]=React.useState('');
    const [result,setResult]=React.useState([]);
   
    React.useEffect(()=>{
        const searchBook=async ()=>{
    
       try{ const res =await props.search(txt);
        
        if(Array.isArray(res)){
        
        setResult(res);}else setResult([])
        }catch(e){
            setResult([]);
        }
        
    
        
         }
         searchBook()}
    ,[txt] );
   
    
    let newarr=[];

    for(let i=0;i<result.length;i++){
        if(props.Books.includes(result[i].id)==true){
            
        newarr.push(props.allBooks[props.Books.indexOf(result[i].id)]);
        }
        else newarr.push(result[i]);
        
        
    }
    return(
        <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'className="close-search"
            onClick={()=>{props.setShowSearchpage(prev=>!prev)}}>
         
            Close
          
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              onChange={(e)=>{setTxt(e.target.value)}}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <Book allBooks={props.Books} Books={newarr} setBooks={props.setBooks} update={props.update}/>
          </ol>
        </div>
      </div>
    )
}