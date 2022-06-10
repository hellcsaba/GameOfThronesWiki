import { Injectable } from "@angular/core";
import { Character } from "../models/character.type";
import { Http, Response} from '@angular/http';
import * as _ from "lodash";

@Injectable()
export class CharacterService {
    /**
     * To communicate with the API
     * @param http 
     */
    constructor(private http: Http) {}

    private charactersUrl = 'https://www.anapioficeandfire.com/api/characters/'

    /** GET characters from the server 
     * @param the number of the page (can be seen in html) 
     * @param number of records per page
    */
    getCharacters(page: number, pageSize?: number){
        if(page !== undefined)
        return this.http.get(this.charactersUrl+'?page='+ (page || 1)+'&pageSize='+(pageSize || 15)).map((res: Response) => res.json())
    }

    /**
     * GET character from the server by url
     * @param url 
     * @returns a http response of the searched character that can be observed
     */
    getCharacterByUrl(url: string){
        if(url !== undefined || url !== '')
        return this.http.get(url).map((res: Response) => res.json())
    }

    /**
     * GET character from the server by id
     * @param url 
     * @returns a http response of the searched character that can be observed
     */
    getCharacterById(id: string){
        if(id !== undefined || id !== '')
        return this.http.get(this.charactersUrl + id).map((res: Response) => res.json())
    }


    /**
     * Get the name of the character if it exists, else its alias
     * @param character 
     * @returns 
     */
     getNameOrAlias(character:Character){
        if(character.name == "")
            return character.aliases[0]
        else
            return character.name
    }
}