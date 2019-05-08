import { Category } from './../Models/Category';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryList: Array<Category> = [];
  private categoryListUpdated = new Subject<Category[]>();
  constructor(private http: HttpClient) { }

  /* Display the list for category dropdown  */
  getCategories() {
    this.http.get<{message: string, categories: Category[]}>('http://localhost:3000/api/category')
    .subscribe(res => {
      this.categoryList = res.categories;
      this.categoryListUpdated.next([...this.categoryList]);
     });
  }
  getCategoryUpdateListener() {
    return this.categoryListUpdated.asObservable();
  }
  getCategory(id) {
    for (let i = 0; i < this.categoryList.length; i++) {
      if (this.categoryList[i].cat_id == id) {
        return this.categoryList[i];
      }
    }
  }
  addCategory(cat) {
    this.http.post<{message: string, category: Category}>('http://localhost:3000/api/category', cat)
    .subscribe(res => {
      console.log(res);
      this.categoryList.push(res.category);
      this.categoryListUpdated.next([...this.categoryList]);
    });
  }
}
