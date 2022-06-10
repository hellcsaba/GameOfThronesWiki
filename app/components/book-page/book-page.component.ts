import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Book } from "../../models/book.type";
import { BookService } from "../../services/book.service";
import { ActivatedRoute } from "@angular/router";
import * as _ from "lodash";
import { Character } from "../../models/character.type";
import { CharacterService } from "../../services/character.service";

@Component({
    selector: "book-page",
    templateUrl: "./book-page.component.html"
})
export class BookPageComponent implements OnInit {
    /**
     * Services that the component uses
     * @param bookService 
     * @param characterService 
     * @param route 
     */
    constructor(
        private bookService: BookService,
        private characterService: CharacterService,
        private route: ActivatedRoute) {}

    
    books: Observable<Book[]>;
    characters: Character[];
    povCharacters: Character[];
    selectedBook: Book;
    pageSize: number = 15;
    maxPages: number = 1;
    currentPage: number = 1;

    /**
     * Get the books on start, if there is an id in the url then get the specific book too
     */
    ngOnInit(): void {
        this.getBooks();
        this.route.params.subscribe(params => {
            let bookID = +params['id'];
            if(bookID){
                this.bookService.getBookById(bookID.toString())
                .subscribe(
                    data => this.getSelectedBookDetail(data),
                    err => console.error(err)
                )
            }
        });
    }

    
    /**
     * Subscribe to books data that was retrieved by BookService's GetBooks method
     * and observes it; load data into books 
     */
    getBooks(){
        this.bookService.getBooks(this.currentPage, this.pageSize)
            .map(response => response.json())
            .subscribe(
                data => this.books = Observable.of(data),
                err => console.error(err),
                () => console.log("done loading books")
            )
    }

    /**
     * Retreieve all the datas of the selected book by calling api functions
     * @param selectedBook
     */
    getSelectedBookDetail(selectedBook: Book){
        this.selectedBook = selectedBook;
        this.povCharacters=[];
        this.characters=[];

        this.selectedBook.povCharacters.forEach(pCharacter =>{
            this.characterService.getCharacterByUrl(pCharacter)
            .subscribe(
                data => this.povCharacters.push(data),
                err => console.log(err)
            )
        })

        this.selectedBook.characters.forEach(character =>{
            this.characterService.getCharacterByUrl(character)
            .subscribe(
                data => this.characters.push(data),
                err => console.log(err)
            )
        })
        
    
    }


    /**
     * Get the name of the character if it exists, else its alias
     * @param character 
     * @returns 
     */
    getNameOrAlias(character: Character){
        return this.characterService.getNameOrAlias(character)
    }

    /**
     * Get the book's id from the url
     * @param url 
     * @returns 
     */
     getIdFromUrl(url: string){
        let splited = url.split('/', 6)
        return splited[splited.length-1]
    }
   

    /**
     * Formats the date
     * @param date by the API 
     * @returns date in yyyy-mm-dd format
     */
     formatDate(date: Date): string{
        return date.toString().split("T")[0] || null;
    }
}