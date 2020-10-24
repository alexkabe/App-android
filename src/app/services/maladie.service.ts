import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class CovidDesease implements Resolve<any> {

    myUrl = 'https://coronavirus-19-api.herokuapp.com/countries';

    constructor(private http: HttpClient,
                private loadingController: LoadingController) {}

    resolve()
    {
        let loading: HTMLIonLoadingElement;

        this.loadingController.create({message: "Patienter"}).then(res => {
            loading = res;
            loading.present();
        });

        return this.http.get(this.myUrl)
        .pipe(
            tap(() =>
            {
                this.loadingController.dismiss();
            }), catchError((err) =>
                {
                    console.log(loading);
                    this.loadingController.dismiss();
                    return throwError(err);
                })
        );
    }

}