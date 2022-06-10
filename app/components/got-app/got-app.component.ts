import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as _ from 'lodash';
import { Observable } from "rxjs/rx";

@Component({
    selector: 'got-app',
    templateUrl: './got-app.component.html'
})
export class GotAppComponent implements OnInit {
    constructor(private router: Router) { }
    /**
     * Add three menu item
     */
    ngOnInit() {
        this.currentPageTitle = this.router.events
            .filter(e => e instanceof NavigationEnd)
            .map((() => _.find(["Books", "Characters, Houses"], t => this.router.isActive('/' + t.toLowerCase(), false))).bind(this))
    }
    
    title = "Game of Thrones";
    isNavbarCollapsed = true;
    currentPageTitle: Observable<string>;

    /**
     * Checks if the user is on the main site
     */
    isMainSite(){
        return (window.location.pathname == '/');
    }
}