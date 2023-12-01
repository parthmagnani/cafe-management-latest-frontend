import { Injectable } from '@angular/core';
import { ApiEndPointUrl } from '../utils/systemEnum';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _configuration = {
    API_ENDPOINT: ApiEndPointUrl
};

  constructor(private _dataService: DataService,) { }

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
}
