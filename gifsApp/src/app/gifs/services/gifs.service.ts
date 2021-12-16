import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse } from '../interface/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  constructor(private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem("historial")!) || [];
    this.resultados = JSON.parse(localStorage.getItem("resultados")!) || [];

  }

  private _historial: string[] = [];

  private api_key    : string = 'vVFqVGYz87KNYxfb6lNe6H13sx6TING5';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';


  get historial() {
    return [...this._historial]
  }

  public resultados: any[] = [];




  buscarGifs(query: string) {

    query = query.trim().toLocaleLowerCase()

    if (!this._historial.includes(query)) {
      this._historial.unshift(query)
    }

    this._historial = this._historial.splice(0, 10)

    localStorage.setItem("historial", JSON.stringify(this._historial))

    const params = new HttpParams()
    .set('api_key', this.api_key)
    .set('q', query)
    .set('limit',20)

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
      .subscribe((resp) => {
        this.resultados = resp.data;
        localStorage.setItem("resultados",JSON.stringify( this.resultados )) 
        console.log(resp.data)
      })
  }



}
