import "./App.css";
import React, { useState } from "react";
import {getAll,update,search} from "./BooksAPI"
import Book from "./Components/Book"
import Search  from "./Components/Search";
import{Route,Routes} from 'react-router';
import {Link} from 'react-router-dom';
import Shelf from "./Components/shelf";
/**
 * 
 *
 */

function App() {
  
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books,setBooks]=useState([]);

  
  React.useEffect(()=>{
    
    const fetchBooks =async ()=>{

     try{ 
     const BooksData= await getAll();
     setBooks( BooksData);}
     catch(e){}
    }
    
    
    
  fetchBooks()},[]);
 
  let shelves=["currentlyReading","wantToRead","read"]
  let lists=shelves.map(shelf=>(<Shelf key={shelf} name={shelf} allBooks={books} Books={books.filter(x=>x.shelf==`${shelf}`)}setBooks={setBooks} update={update}></Shelf>));
 
  return (
    <Routes>
      
        <Route exact path='/search'
        element={<Search allBooks={books} Books={books.map(x=>x.id)}setBooks={setBooks} search={search} update={update} setShowSearchpage={setShowSearchpage}/>}
        />
       <Route exact path='/'
        element={<div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
            {lists}
              
            </div>
          </div>
          <div className="open-search">
            <Link to='/search' >Add a book</Link>
          </div>
        </div>
        }>
          
        </Route>
      
    </Routes>
  );
}

export default App;
