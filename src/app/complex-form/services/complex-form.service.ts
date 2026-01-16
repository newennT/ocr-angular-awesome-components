import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, delay, Observable } from "rxjs";
import { mapTo, of } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class ComplexFormService {
    constructor(private http: HttpClient) {}

    saveUserInfo(formValue: ComplexFormService): Observable<boolean> {
        return this.http.post(`${environment.apiUrl}/users`, formValue).pipe(
            mapTo(true),
            delay(1000),
            catchError(() => of(false).pipe(
                delay(1000)
            ))
        );
    }
}