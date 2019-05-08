import { Category } from './../Models/Category';
import { CategoryService } from './../Services/category.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  category:Category;
  catForm: FormGroup;
  focus:boolean;
 constructor(
    private service:CategoryService,
    private router:Router,
  ) { 
    this.category= new Category;
    this.category.cat_name="";
  }
  ngOnInit() {
    this.catForm = new FormGroup({
      cat_name:new FormControl(null,[Validators.required,this.blankSpaces])
    })
  }
  blankSpaces(control: FormControl): {[s: string]: boolean}{
    if (control.value != null && control.value.trim().length === 0){
      return {'blankSpaces': true};
    }
    return null;
  }

  AddCate(category:Category){
    category.cat_name=this.catForm.get("cat_name").value;
    this.service.addCategory(category);
    this.router.navigate(['/todos']);
  }
}
