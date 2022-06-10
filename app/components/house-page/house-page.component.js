"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rx_1 = require("rxjs/rx");
var house_service_1 = require("../../services/house.service");
var router_1 = require("@angular/router");
var character_service_1 = require("../../services/character.service");
var HousePageComponent = (function () {
    /**
     * Services that the component uses
     * @param houseService
     * @param characterService
     * @param route
     */
    function HousePageComponent(houseService, characterService, route) {
        this.houseService = houseService;
        this.characterService = characterService;
        this.route = route;
        this.pageSize = 15;
        this.maxPages = 31;
        this.currentPage = 1;
        console.log("HousePage ctor");
    }
    /**
     * Get the houses on start, if there is an id in the url then get the specific house too
     */
    HousePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getHouses();
        this.route.params.subscribe(function (params) {
            var houseID = +params['id'];
            if (houseID) {
                _this.houseService.getHouseById(houseID.toString())
                    .subscribe(function (data) { return _this.getSelectedHouseDetail(data); }, function (err) { return console.error(err); });
            }
        });
    };
    /**
     * Load http response's data into houses
     * Subscribe to houses data that was retrieved by HouseService's GetHouses method
     * and observes it
    */
    HousePageComponent.prototype.getHouses = function () {
        var _this = this;
        this.houseService.getHouses(this.currentPage, this.pageSize)
            .subscribe(function (data) { return _this.houses = rx_1.Observable.of(data); }, function (err) { return console.error(err); }, function () { return console.log("done loading houses"); });
    };
    /**
     * Retreieve all the datas of the selected house by calling api functions
     * @param selectedHouse
     */
    HousePageComponent.prototype.getSelectedHouseDetail = function (selectedHouse) {
        var _this = this;
        this.selectedHouse = selectedHouse;
        this.cadetBranches = [];
        this.swornMembers = [];
        this.currentLord = null;
        this.heir = null;
        this.overlord = null;
        this.founder = null;
        this.selectedHouse.cadetBranches.forEach(function (cBranch) {
            _this.houseService.getHouseByUrl(cBranch)
                .subscribe(function (data) { return _this.cadetBranches.push(data); }, function (err) { return console.error(err); });
        });
        this.selectedHouse.swornMembers.forEach(function (member) {
            _this.characterService.getCharacterByUrl(member)
                .subscribe(function (data) { return _this.swornMembers.push(data); }, function (err) { return console.error(err); });
        });
        if (this.selectedHouse.currentLord !== null && this.selectedHouse.currentLord !== '') {
            this.characterService.getCharacterByUrl(this.selectedHouse.currentLord)
                .subscribe(function (data) { return _this.currentLord = data; }, function (err) { return console.error(err); });
        }
        if (this.selectedHouse.heir !== null && this.selectedHouse.heir !== '') {
            this.characterService.getCharacterByUrl(this.selectedHouse.heir)
                .subscribe(function (data) { return _this.heir = data; }, function (err) { return console.error(err); });
        }
        if (this.selectedHouse.overlord !== null && this.selectedHouse.overlord !== '') {
            this.characterService.getCharacterByUrl(this.selectedHouse.overlord)
                .subscribe(function (data) { return _this.overlord = data; }, function (err) { return console.error(err); });
        }
        if (this.selectedHouse.founder !== null && this.selectedHouse.founder !== '') {
            this.characterService.getCharacterByUrl(this.selectedHouse.founder)
                .subscribe(function (data) { return _this.founder = data; }, function (err) { return console.error(err); });
        }
    };
    /**
     * Get the name of the character if it exists, else its alias
     * @param character
     * @returns
     */
    HousePageComponent.prototype.getNameOrAlias = function (character) {
        return this.characterService.getNameOrAlias(character);
    };
    /**
     * Get the house's id from the url
     * @param url
     * @returns
     */
    HousePageComponent.prototype.getIdFromUrl = function (url) {
        var splited = url.split('/', 6);
        return splited[splited.length - 1];
    };
    return HousePageComponent;
}());
HousePageComponent = __decorate([
    core_1.Component({
        selector: "house-page",
        templateUrl: "./house-page.component.html"
    }),
    __metadata("design:paramtypes", [house_service_1.HouseService,
        character_service_1.CharacterService,
        router_1.ActivatedRoute])
], HousePageComponent);
exports.HousePageComponent = HousePageComponent;
//# sourceMappingURL=house-page.component.js.map