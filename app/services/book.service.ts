import { Injectable } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Book } from "../models/book.type";
import * as _ from "lodash";
import { Http } from '@angular/http';
import { Response } from '@angular/http';

@Injectable()
export class BookService {
    constructor(
        private http: Http
    ) {}

    private booksUrl = 'https://www.anapioficeandfire.com/api/books/'

    /** GET books from the server 
     * @param page the number of the page (can be seen in the related html) 
     * @param pageSize number of records per page, default: 15
    */
    getBooks(page: number, pageSize?: number){
        if(page !== undefined)
            return this.http.get(this.booksUrl+'?page='+ (page || 1)+'&pageSize='+(pageSize || 15))
    }

    /**
     * GET book from the server by url
     * @param url 
     * @returns a http response of the searched book that can be observed
     */
    getBookByUrl(url?: string){
        if(url !== undefined || url !== '')
            return this.http.get(url).map((res: Response) => res.json())
    }

    /**
     * GET book from the server by Id
     * @param id 
     * @returns a http response of the searched book that can be observed
     */
    getBookById(id: string){
        if(id !== undefined || id !== '')
            return this.http.get(this.booksUrl + id).map((res: Response) => res.json())
    }

}