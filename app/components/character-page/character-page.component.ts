import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Character } from "../../models/character.type";
import { CharacterService } from "../../services/character.service";
import { ActivatedRoute } from "@angular/router";
import * as _ from "lodash";
import { BookService } from "../../services/book.service";
import { Book } from "../../models/book.type";
import { HouseService } from "../../services/house.service";
import { House } from "../../models/house.type";

@Component({
    selector: "character-page",
    templateUrl: "./character-page.component.html"
})
export class CharacterPageComponent implements OnInit {
    /**
     * Services that the component uses
     * @param characterService 
     * @param bookService 
     * @param houseService
     * @param route 
     */
    constructor(
        private characterService: CharacterService,
        private bookService: BookService,
        private houseService: HouseService,
        private route: ActivatedRoute) {}


    pageSize: number = 15;
    maxPages: number = 144;
    currentPage: number = 1;
    selectedCharacter: Character;
    characters: Observable<Character[]>;
    books: Book[];
    povBooks: Book[];
    allegiances: House[];
    father: Character;
    mother: Character;
    spouse: Character;

    /**
     * Get the characters on start, if there is an id in the url then get the specific character too
     */
    ngOnInit(): void {
        this.getCharacters();
        this.route.params.subscribe(params => {
            let characterID = +params['id'];
            if(characterID){
                this.characterService.getCharacterById(characterID.toString())
                .subscribe(
                    data => this.getSelectedCharacterInformation(data),
                    err => console.error(err)
                )
            }
        });
    }

     /**
     * Retreieve all the datas of the selected character by calling api functions
     * @param selectedCharacter
     */
    getSelectedCharacterInformation(selectedCharacter: Character){
        this.selectedCharacter = selectedCharacter;
        this.povBooks = [];
        this.books = [];
        this.allegiances = [];
        this.father = null;
        this.mother = null;
        this.spouse = null;

        this.selectedCharacter.povBooks.forEach( pbook =>{
            this.bookService.getBookByUrl(pbook)
            .subscribe(
                data => this.povBooks.push(data),
                err => console.error(err)
            )
        })

        this.selectedCharacter.books.forEach( book =>{
            this.bookService.getBookByUrl(book)
            .subscribe(
                data => this.books.push(data),
                err => console.error(err)
                )
            }
        )

        this.selectedCharacter.allegiances.forEach( allegiance =>{
            this.houseService.getHouseByUrl(allegiance)
            .subscribe(
                data => this.allegiances.push(data),
                err => console.error(err)
                )
            }
        )

        if(this.selectedCharacter.father !== null && this.selectedCharacter.father !== '' ){
            this.characterService.getCharacterByUrl(this.selectedCharacter.father)
            .subscribe(
                data => this.father = data,
                err => console.error(err)
            )
        }

        if(this.selectedCharacter.mother !== null && this.selectedCharacter.mother !== '' ){
            this.characterService.getCharacterByUrl(this.selectedCharacter.mother)
            .subscribe(
                data => this.mother = data,
                err => console.error(err)
            )
        }

        if(this.selectedCharacter.spouse !== null && this.selectedCharacter.spouse !== '' ){
            this.characterService.getCharacterByUrl(this.selectedCharacter.spouse)
            .subscribe(
                data => this.spouse = data,
                err => console.error(err)
            )
        }
        
    }


   /**
     * Load http response's data into characters
     * Subscribe to characters data that was retrieved by CharacterService's GetCharacters method
     * and observes it 
     */
    getCharacters(){
        console.log("CharacterPage getCharacters")
        this.characterService.getCharacters(this.currentPage, this.pageSize)
            .subscribe(
                data => this.characters = Observable.of(data),
                err => console.error(err),
                () => console.log("done loading characters")
            )
    }

    /**
     * Get the character's id from the url
     * @param url 
     * @returns 
     */
    getIdFromUrl(url: string){
        let splited = url.split('/', 6)
        return splited[splited.length-1]
    }

    /**
     * Get the name of the character if it exists, else its alias
     * @param character 
     * @returns 
     */
     getNameOrAlias(character:Character){
        return this.characterService.getNameOrAlias(character)
    }
   
}