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
}
