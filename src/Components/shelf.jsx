
import Book from "./Book";
export default function Shelf(props){
    return(
              <div className="bookshelf">
                <h2 className="bookshelf-title">{props.name}</h2>
                <div className="bookshelf-books">
                <Book 
                allBooks={props.allBooks} 
                Books={props.Books}
                setBooks={props.setBooks} 
                update={props.update}  />
                </div>
              </div>)
}