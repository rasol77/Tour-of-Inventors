import { Component } from '@angular/core';

import { Hero } from '../heroes/hero';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent   {

    fields = ['Medicine', 'Fisic', 'Quimic', 'Mechanic', 'Electric'];

    model = new Hero(21, 'A. Graham Bell', 'Telephone',this.fields[3] );

    
    submitted = false;
    
    onSubmit() {this.submitted = true;}
    
    newInvent() {
    this.model = new Hero(33, '', '');
    }

  }


