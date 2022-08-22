import React from "react";
import { update,getAll } from "../BooksAPI";
export default function Book(props){
 const [bookId,setBookId]=React.useState('');
 const [shelf,setshelf]=React.useState('')
 const changeShelf=(e,id)=>{
    if(e.target.value==='none'){
        
        setBookId(id);
        setshelf('none');
    }
    else props.setBooks(props.allBooks.map(x=>x.id===id?{...x,shelf:e.target.value}:x));
 }
 const AddBooK=(e,id)=>{
    
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
       console.log(e);
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
      `url(${x.imageLinks.thumbnail||''})`
  }}>
    <div className="book-shelf-changer">
    <select  defaultValue={x.shelf||'none'} onChange={x.shelf?(e)=>changeShelf(e,x.id):(e)=>AddBooK(e,x.id)}>
     <option value="none" disabled>
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
<div className="book-authors">{x.autors}</div>
 </div>  
 </li>))
 return (
    <ol className="books-grid">
        {elements}
    </ol>
 ) 


}

 