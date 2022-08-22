import "./App.css";
import React, { useState } from "react";
import {getAll,update,search} from "./BooksAPI"
import Book from "./Components/Book"
import Search  from "./Components/Search";
import{Route,Routes} from 'react-router';
import {Link} from 'react-router-dom';
/**
 * 
 *
 */

function App() {
  
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books,setBooks]=useState([]);

  
  React.useEffect(()=>{
    
    const fetchBooks =async ()=>{
     const BooksData= await getAll();
     setBooks( BooksData);
    }
    
    
    
  fetchBooks()},[]);
 


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
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <Book allBooks={books} Books={books.filter(x=>x.shelf=="currentlyReading")}setBooks={setBooks} update={update}  />
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                <Book allBooks={books} Books={books.filter(x=>x.shelf=="wantToRead")} setBooks={setBooks} update={update} />
               
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                <Book  allBooks={books} Books={books.filter(x=>x.shelf=="read")} setBooks={setBooks} update={update} />
                </div>
              </div>
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
