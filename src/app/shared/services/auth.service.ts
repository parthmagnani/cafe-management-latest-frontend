import { Injectable } from '@angular/core';
import { ApiEndPointUrl } from '../utils/systemEnum';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _configuration = {
    API_ENDPOINT: ApiEndPointUrl
};

  constructor(
    private _dataService: DataService,
    private http: HttpClient
  ) { }

  // signin
  public signUp(body: any) {
    return this._dataService.postDataWithoutHeader(
        this._configuration.API_ENDPOINT + 'user/signup', body

    );
  }

  public login(body: any) {
    return this._dataService.postDataWithoutHeader(
        this._configuration.API_ENDPOINT + 'user/login', body

    );
  }

  // details of dashboard

  public dashboardDetails(){
    return this._dataService.getDataWithHeader(
      this._configuration.API_ENDPOINT + 'dashboard/details'

    );
  }

  // category
  addCategory(body: any){
    return this._dataService.postDataWithHeader(
      this._configuration.API_ENDPOINT + 'category/add', body

    );
  }

  getCategory(){
    return this._dataService.getDataWithHeader(
      this._configuration.API_ENDPOINT + 'category/get'

    );
  }

  deleteCategory(body: any){
    return this._dataService.postDataWithHeader(
      this._configuration.API_ENDPOINT + 'category/delete', body

    );
  }

  editCategory(body: any){
    return this._dataService.postDataWithHeader(
      this._configuration.API_ENDPOINT + 'category/update', body

    );
  }


  // Users
  getusers(){
    return this._dataService.getDataWithHeader(
      this._configuration.API_ENDPOINT + 'user/get'

    );
  }

  changeUserStatus(body: any){
    return this._dataService.postDataWithHeader(
      this._configuration.API_ENDPOINT + 'user/update', body

    );
  }

  // product
  getProduct(){
    return this._dataService.getDataWithHeader(
      this._configuration.API_ENDPOINT + 'product/get'

    );
  }

  addProduct(body: any){
    return this._dataService.postDataWithHeader(
      this._configuration.API_ENDPOINT + 'product/add', body

    );
  }

  editProduct(body: any){
    return this._dataService.postDataWithHeader(
      this._configuration.API_ENDPOINT + 'product/update', body

    );
  }

  deleteProduct(body: any){
    return this._dataService.postDataWithHeader(
      this._configuration.API_ENDPOINT + 'product/delete', body

    );
  }

  updateProductStatus(body: any){
    return this._dataService.postDataWithHeader(
      this._configuration.API_ENDPOINT + 'product/updateStatus', body

    );
  }

  getproductByCategoryId(body: any){
    return this._dataService.postDataWithHeader(
      this._configuration.API_ENDPOINT + 'product/getByCategory', body

    );
  }

  // pdf

  generatePdf(body: any){
    return this._dataService.postDataWithHeader(
      this._configuration.API_ENDPOINT + 'bill/generateReport', body

    );
  }

  // getPdf(body: any){
  //   return this._dataService.postDataWithHeader(
  //     this._configuration.API_ENDPOINT + 'bill/getpdf', body

  //   );
  // }

  getPdf(orderDetails: any): Observable<HttpResponse<Blob>> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('userToken') ?? ''
      }),
      observe: 'response' as 'response',
      responseType: 'blob' as 'json',
    };

    return this.http.post<Blob>(`${this._configuration.API_ENDPOINT}bill/getpdf`, orderDetails, options);
  }
}
