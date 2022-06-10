import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/rx";
import { House } from "../../models/house.type";
import { HouseService } from "../../services/house.service";
import { ActivatedRoute } from "@angular/router";
import * as _ from "lodash";
import { Character } from "../../models/character.type";
import { CharacterService } from "../../services/character.service";

@Component({
    selector: "house-page",
    templateUrl: "./house-page.component.html"
})
export class HousePageComponent implements OnInit {
    /**
     * Services that the component uses
     * @param houseService 
     * @param characterService 
     * @param route 
     */
    constructor(
        private houseService: HouseService,
        private characterService: CharacterService,
        private route: ActivatedRoute) { console.log("HousePage ctor")}

    /**
     * Get the houses on start, if there is an id in the url then get the specific house too
     */
    ngOnInit(): void {
        this.getHouses();
        this.route.params.subscribe(params => {
            let houseID = +params['id'];
            if(houseID){
                this.houseService.getHouseById(houseID.toString())
                .subscribe(
                    data => this.getSelectedHouseDetail(data),
                    err => console.error(err)
                )
            }
        });
    }    

    pageSize: number = 15;
    maxPages: number = 31;
    currentPage: number = 1;
    selectedHouse: House;
    houses: Observable<House[]>
    cadetBranches: House[];
    swornMembers: Character[];
    currentLord: Character;
    heir: Character;
    overlord: Character;
    founder: Character;

    /**
     * Load http response's data into houses
     * Subscribe to houses data that was retrieved by HouseService's GetHouses method
     * and observes it 
    */
    getHouses(){
        this.houseService.getHouses(this.currentPage, this.pageSize)
            .subscribe(
                data => this.houses = Observable.of(data),
                err => console.error(err),
                () => console.log("done loading houses")
            )
    }

    /**
     * Retreieve all the datas of the selected house by calling api functions
     * @param selectedHouse
     */
    getSelectedHouseDetail(selectedHouse: House){
        this.selectedHouse = selectedHouse;
        this.cadetBranches=[];
        this.swornMembers=[];
        this.currentLord = null;
        this.heir = null;
        this.overlord = null;
        this.founder = null;


        this.selectedHouse.cadetBranches.forEach( cBranch =>{
            this.houseService.getHouseByUrl(cBranch)
                .subscribe(
                    data => this.cadetBranches.push(data),
                    err => console.error(err)
                )
            }
        )

        this.selectedHouse.swornMembers.forEach( member => {
            this.characterService.getCharacterByUrl(member)
            .subscribe(
                data => this.swornMembers.push(data),
                err => console.error(err)
            )
        })

        if(this.selectedHouse.currentLord !== null && this.selectedHouse.currentLord !== '' ){
            this.characterService.getCharacterByUrl(this.selectedHouse.currentLord)
            .subscribe(
                data => this.currentLord = data,
                err => console.error(err)
            )
        }

        if(this.selectedHouse.heir !== null && this.selectedHouse.heir !== '' ){
            this.characterService.getCharacterByUrl(this.selectedHouse.heir)
            .subscribe(
                data => this.heir = data,
                err => console.error(err)
            )
        }

        if(this.selectedHouse.overlord !== null && this.selectedHouse.overlord !== '' ){
            this.characterService.getCharacterByUrl(this.selectedHouse.overlord)
            .subscribe(
                data => this.overlord = data,
                err => console.error(err)
            )
        }

        if(this.selectedHouse.founder !== null && this.selectedHouse.founder !== '' ){
            this.characterService.getCharacterByUrl(this.selectedHouse.founder)
            .subscribe(
                data => this.founder = data,
                err => console.error(err)
            )
        }

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
     * Get the house's id from the url
     * @param url 
     * @returns 
     */
     getIdFromUrl(url: string){
        let splited = url.split('/', 6)
        return splited[splited.length-1]
    }

}