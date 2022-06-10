import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { CollapseModule } from 'ng2-bootstrap'
import { BookPageComponent } from "./components/book-page/book-page.component";
import { BookService } from "./services/book.service";
import { CharacterPageComponent } from './components/character-page/character-page.component';
import { CharacterService } from './services/character.service';
import { GotAppComponent } from './components/got-app/got-app.component';
import { CommonModule } from '@angular/common';
import { HouseService } from './services/house.service';
import { HousePageComponent } from './components/house-page/house-page.component';


let routes: Route[] = [
    { path: "books", component: BookPageComponent },
    { path: "books/:id", component: BookPageComponent },
    { path: "characters", component: CharacterPageComponent },
    { path: "characters/:id", component: CharacterPageComponent },
    { path: "houses", component: HousePageComponent },
    { path: "houses/:id", component: HousePageComponent }
];

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule, HttpModule, CollapseModule.forRoot(), CommonModule],
    declarations: [GotAppComponent, BookPageComponent, CharacterPageComponent, HousePageComponent],
    exports: [],
    providers: [BookService, CharacterService, HouseService],
    bootstrap: [GotAppComponent]
})
export class GotAppModule { }
