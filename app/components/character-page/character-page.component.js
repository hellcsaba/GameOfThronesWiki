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
var character_service_1 = require("../../services/character.service");
var router_1 = require("@angular/router");
var book_service_1 = require("../../services/book.service");
var house_service_1 = require("../../services/house.service");
var CharacterPageComponent = (function () {
    /**
     * Services that the component uses
     * @param characterService
     * @param bookService
     * @param houseService
     * @param route
     */
    function CharacterPageComponent(characterService, bookService, houseService, route) {
        this.characterService = characterService;
        this.bookService = bookService;
        this.houseService = houseService;
        this.route = route;
        this.pageSize = 15;
        this.maxPages = 144;
        this.currentPage = 1;
    }
    /**
     * Get the characters on start, if there is an id in the url then get the specific character too
     */
    CharacterPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getCharacters();
        this.route.params.subscribe(function (params) {
            var characterID = +params['id'];
            if (characterID) {
                _this.characterService.getCharacterById(characterID.toString())
                    .subscribe(function (data) { return _this.getSelectedCharacterInformation(data); }, function (err) { return console.error(err); });
            }
        });
    };
    /**
    * Retreieve all the datas of the selected character by calling api functions
    * @param selectedCharacter
    */
    CharacterPageComponent.prototype.getSelectedCharacterInformation = function (selectedCharacter) {
        var _this = this;
        this.selectedCharacter = selectedCharacter;
        this.povBooks = [];
        this.books = [];
        this.allegiances = [];
        this.father = null;
        this.mother = null;
        this.spouse = null;
        this.selectedCharacter.povBooks.forEach(function (pbook) {
            _this.bookService.getBookByUrl(pbook)
                .subscribe(function (data) { return _this.povBooks.push(data); }, function (err) { return console.error(err); });
        });
        this.selectedCharacter.books.forEach(function (book) {
            _this.bookService.getBookByUrl(book)
                .subscribe(function (data) { return _this.books.push(data); }, function (err) { return console.error(err); });
        });
        this.selectedCharacter.allegiances.forEach(function (allegiance) {
            _this.houseService.getHouseByUrl(allegiance)
                .subscribe(function (data) { return _this.allegiances.push(data); }, function (err) { return console.error(err); });
        });
        if (this.selectedCharacter.father !== null && this.selectedCharacter.father !== '') {
            this.characterService.getCharacterByUrl(this.selectedCharacter.father)
                .subscribe(function (data) { return _this.father = data; }, function (err) { return console.error(err); });
        }
        if (this.selectedCharacter.mother !== null && this.selectedCharacter.mother !== '') {
            this.characterService.getCharacterByUrl(this.selectedCharacter.mother)
                .subscribe(function (data) { return _this.mother = data; }, function (err) { return console.error(err); });
        }
        if (this.selectedCharacter.spouse !== null && this.selectedCharacter.spouse !== '') {
            this.characterService.getCharacterByUrl(this.selectedCharacter.spouse)
                .subscribe(function (data) { return _this.spouse = data; }, function (err) { return console.error(err); });
        }
    };
    /**
      * Load http response's data into characters
      * Subscribe to characters data that was retrieved by CharacterService's GetCharacters method
      * and observes it
      */
    CharacterPageComponent.prototype.getCharacters = function () {
        var _this = this;
        console.log("CharacterPage getCharacters");
        this.characterService.getCharacters(this.currentPage, this.pageSize)
            .subscribe(function (data) { return _this.characters = rx_1.Observable.of(data); }, function (err) { return console.error(err); }, function () { return console.log("done loading characters"); });
    };
    /**
     * Get the character's id from the url
     * @param url
     * @returns
     */
    CharacterPageComponent.prototype.getIdFromUrl = function (url) {
        var splited = url.split('/', 6);
        return splited[splited.length - 1];
    };
    /**
     * Get the name of the character if it exists, else its alias
     * @param character
     * @returns
     */
    CharacterPageComponent.prototype.getNameOrAlias = function (character) {
        return this.characterService.getNameOrAlias(character);
    };
    return CharacterPageComponent;
}());
CharacterPageComponent = __decorate([
    core_1.Component({
        selector: "character-page",
        templateUrl: "./character-page.component.html"
    }),
    __metadata("design:paramtypes", [character_service_1.CharacterService,
        book_service_1.BookService,
        house_service_1.HouseService,
        router_1.ActivatedRoute])
], CharacterPageComponent);
exports.CharacterPageComponent = CharacterPageComponent;
//# sourceMappingURL=character-page.component.js.map