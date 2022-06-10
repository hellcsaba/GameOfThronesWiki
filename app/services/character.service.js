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
var http_1 = require("@angular/http");
var CharacterService = (function () {
    /**
     * To communicate with the API
     * @param http
     */
    function CharacterService(http) {
        this.http = http;
        this.charactersUrl = 'https://www.anapioficeandfire.com/api/characters/';
    }
    /** GET characters from the server
     * @param the number of the page (can be seen in html)
     * @param number of records per page
    */
    CharacterService.prototype.getCharacters = function (page, pageSize) {
        if (page !== undefined)
            return this.http.get(this.charactersUrl + '?page=' + (page || 1) + '&pageSize=' + (pageSize || 15)).map(function (res) { return res.json(); });
    };
    /**
     * GET character from the server by url
     * @param url
     * @returns a http response of the searched character that can be observed
     */
    CharacterService.prototype.getCharacterByUrl = function (url) {
        if (url !== undefined || url !== '')
            return this.http.get(url).map(function (res) { return res.json(); });
    };
    /**
     * GET character from the server by id
     * @param url
     * @returns a http response of the searched character that can be observed
     */
    CharacterService.prototype.getCharacterById = function (id) {
        if (id !== undefined || id !== '')
            return this.http.get(this.charactersUrl + id).map(function (res) { return res.json(); });
    };
    /**
     * Get the name of the character if it exists, else its alias
     * @param character
     * @returns
     */
    CharacterService.prototype.getNameOrAlias = function (character) {
        if (character.name == "")
            return character.aliases[0];
        else
            return character.name;
    };
    return CharacterService;
}());
CharacterService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CharacterService);
exports.CharacterService = CharacterService;
//# sourceMappingURL=character.service.js.map