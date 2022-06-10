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
var HouseService = (function () {
    function HouseService(http) {
        this.http = http;
        this.housesUrl = 'https://www.anapioficeandfire.com/api/houses/';
    }
    /** GET houses from the server
     * @param the number of the page (can be seen in the related html)
     * @param number of records per page
    */
    HouseService.prototype.getHouses = function (page, pageSize) {
        if (page !== undefined)
            return this.http.get(this.housesUrl + '?page=' + (page || 1) + '&pageSize=' + (pageSize || 15)).map(function (response) { return response.json(); });
    };
    /**
    * GET house from the server by id
    * @param id
    * @returns a http response of the searched character that can be observed
    */
    HouseService.prototype.getHouseById = function (id) {
        if (id !== undefined || id !== '')
            return this.http.get(this.housesUrl + id).map(function (res) { return res.json(); });
    };
    /**
     * GET house from the server by url
     * @param url
     * @returns a http response of the searched house that can be observed
     */
    HouseService.prototype.getHouseByUrl = function (url) {
        if (url !== undefined || url !== '')
            return this.http.get(url).map(function (res) { return res.json(); });
    };
    return HouseService;
}());
HouseService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], HouseService);
exports.HouseService = HouseService;
//# sourceMappingURL=house.service.js.map