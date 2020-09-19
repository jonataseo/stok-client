import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'clientFilter' })
export class ClientSearchPipe implements PipeTransform {
   /**
    * Transform
    *
    * @param {any[]} clients
    * @param {string} searchName
    * @returns {any[]}
    */
   transform(clients: any[], searchName: string): any[] {
     if(!clients){
       return [];
     }
     if(!searchName){
       return clients;
     }
     searchName = searchName.toLocaleLowerCase();

     return clients.filter(cl => {
       return cl.toLocateLowerCase().includes(searchName);
     })
   }
}
