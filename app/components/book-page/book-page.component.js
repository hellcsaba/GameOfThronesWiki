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
var book_service_1 = require("../../services/book.service");
var router_1 = require("@angular/router");
var character_service_1 = require("../../services/character.service");
var BookPageComponent = (function () {
    /**
     * Services that the component uses
     * @param bookService
     * @param characterService
     * @param route
     */
    function BookPageComponent(bookService, characterService, route) {
        this.bookService = bookService;
        this.characterService = characterService;
        this.route = route;
        this.pageSize = 15;
        this.maxPages = 1;
        this.currentPage = 1;
    }
    /**
     * Get the books on start, if there is an id in the url then get the specific book too
     */
    BookPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getBooks();
        this.route.params.subscribe(function (params) {
            var bookID = +params['id'];
            if (bookID) {
                _this.bookService.getBookById(bookID.toString())
                    .subscribe(function (data) { return _this.getSelectedBookDetail(data); }, function (err) { return console.error(err); });
            }
        });
    };
    /**
     * Subscribe to books data that was retrieved by BookService's GetBooks method
     * and observes it; load data into books
     */
    BookPageComponent.prototype.getBooks = function () {
        var _this = this;
        this.bookService.getBooks(this.currentPage, this.pageSize)
            .map(function (response) { return response.json(); })
            .subscribe(function (data) { return _this.books = rx_1.Observable.of(data); }, function (err) { return console.error(err); }, function () { return console.log("done loading books"); });
    };
    /**
     * Retreieve all the datas of the selected book by calling api functions
     * @param selectedBook
     */
    BookPageComponent.prototype.getSelectedBookDetail = function (selectedBook) {
        var _this = this;
        this.selectedBook = selectedBook;
        this.povCharacters = [];
        this.characters = [];
        this.selectedBook.povCharacters.forEach(function (pCharacter) {
            _this.characterService.getCharacterByUrl(pCharacter)
                .subscribe(function (data) { return _this.povCharacters.push(data); }, function (err) { return console.log(err); });
        });
        this.selectedBook.characters.forEach(function (character) {
            _this.characterService.getCharacterByUrl(character)
                .subscribe(function (data) { return _this.characters.push(data); }, function (err) { return console.log(err); });
        });
    };
    /**
     * Get the name of the character if it exists, else its alias
     * @param character
     * @returns
     */
    BookPageComponent.prototype.getNameOrAlias = function (character) {
        return this.characterService.getNameOrAlias(character);
    };
    /**
     * Get the book's id from the url
     * @param url
     * @returns
     */
    BookPageComponent.prototype.getIdFromUrl = function (url) {
        var splited = url.split('/', 6);
        return splited[splited.length - 1];
    };
    /**
     * Formats the date
     * @param date by the API
     * @returns date in yyyy-mm-dd format
     */
    BookPageComponent.prototype.formatDate = function (date) {
        return date.toString().split("T")[0] || null;
    };
    return BookPageComponent;
}());
BookPageComponent = __decorate([
    core_1.Component({
        selector: "book-page",
        templateUrl: "./book-page.component.html"
    }),
    __metadata("design:paramtypes", [book_service_1.BookService,
        character_service_1.CharacterService,
        router_1.ActivatedRoute])
], BookPageComponent);
exports.BookPageComponent = BookPageComponent;
//# sourceMappingURL=book-page.component.js.map