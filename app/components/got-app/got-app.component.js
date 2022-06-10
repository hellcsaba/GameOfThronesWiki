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
var router_1 = require("@angular/router");
var _ = require("lodash");
var GotAppComponent = (function () {
    function GotAppComponent(router) {
        this.router = router;
        this.title = "Game of Thrones";
        this.isNavbarCollapsed = true;
    }
    /**
     * Add three menu item
     */
    GotAppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentPageTitle = this.router.events
            .filter(function (e) { return e instanceof router_1.NavigationEnd; })
            .map((function () { return _.find(["Books", "Characters, Houses"], function (t) { return _this.router.isActive('/' + t.toLowerCase(), false); }); }).bind(this));
    };
    /**
     * Checks if the user is on the main site
     */
    GotAppComponent.prototype.isMainSite = function () {
        return (window.location.pathname == '/');
    };
    return GotAppComponent;
}());
GotAppComponent = __decorate([
    core_1.Component({
        selector: 'got-app',
        templateUrl: './got-app.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router])
], GotAppComponent);
exports.GotAppComponent = GotAppComponent;
//# sourceMappingURL=got-app.component.js.map