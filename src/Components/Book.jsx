import React from "react";
import { update,getAll } from "../BooksAPI";
import placeholder from '../icons/No-Image-Placeholder.svg.png'
export default function Book(props){
 const [bookId,setBookId]=React.useState('');
 const [shelf,setshelf]=React.useState('')
 const changeShelf=(e,id)=>{console.log(props.allBooks);
    
        
        setBookId(id);
        setshelf(e.target.value);
    }
    
    
 React.useEffect(
    ()=>{
        const updateShelves= async ()=>{
        try{    
            
         const updated=await props.update({id:bookId},shelf)
         const BooksData= await getAll();
         props.setBooks( BooksData);
        }
    catch(e){
      console.log(e)
    } 
    
    }
    updateShelves()

    },[bookId,shelf]
 )
 
  const elements=props.Books.map(x=>(
 <li key={x.id}>
  <div className="book">
 <div className="book-top"
 style={{
    width: 128,
    height: 193,
    backgroundImage:
      `url(${x.imageLinks?x.imageLinks.thumbnail: placeholder})` ,
   backgroundSize : '100% 100%' 
  }}>
    <div className="book-shelf-changer">
    <select  defaultValue={x.shelf||"none"} onChange={(e)=>changeShelf(e,x.id)}>
     <option value=" " disabled>
     Move to...
     </option>
     <option value="currentlyReading">
     Currently Reading
     </option>
     <option value="wantToRead">Want to Read</option>
     <option value="read">Read</option>
     <option value="none">None</option>
     </select>
    </div>
 </div>
<div className="book-title">{x.title}</div>
<div className="book-authors">{x.authors}</div>
 </div>  
 </li>))

 return (
    <ol className="books-grid">
        {elements}
    </ol>
 ) 


}

 