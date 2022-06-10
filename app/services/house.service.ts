import { Injectable } from "@angular/core";
import { Observable } from "rxjs/rx";
import { House } from "../models/house.type";
import { Http, Response } from '@angular/http';
import * as _ from "lodash";

@Injectable()
export class HouseService {
    constructor(
        private http: Http
    ) {}

    private housesUrl = 'https://www.anapioficeandfire.com/api/houses/'

    /** GET houses from the server 
     * @param the number of the page (can be seen in the related html) 
     * @param number of records per page
    */
    getHouses(page: number, pageSize?: number){
        if(page !== undefined)
            return this.http.get(this.housesUrl+'?page='+ (page || 1)+'&pageSize='+(pageSize || 15)).map(response => response.json())
    }

    /**
    * GET house from the server by id
    * @param id 
    * @returns a http response of the searched character that can be observed
    */
    getHouseById(id: string){
        if(id !== undefined || id !== '')
            return this.http.get(this.housesUrl + id).map((res: Response) => res.json())
    }

   /**
    * GET house from the server by url
    * @param url
    * @returns a http response of the searched house that can be observed
    */
    getHouseByUrl(url: string){
        if(url !== undefined || url !== '')
            return this.http.get(url).map((res: Response) => res.json())
    }

}