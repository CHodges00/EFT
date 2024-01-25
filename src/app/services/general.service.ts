import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private apollo: Apollo) { }

  mapLimitQuery(){
    return this.apollo.watchQuery({
      query: gql`{
        maps {
          name
          players
        }
      }`
    });
  }

  statusQuery(){
    return this.apollo.watchQuery({
      query: gql`{
        status {
          currentStatuses {
            name
            message
            status
          }
          messages {
            time
            type
            content
            solveTime
          }
        }
      }`
    });
  }

  // Have take in text from search bar
  itemsListSearch(search:string){
    return this.apollo.watchQuery({
      query: gql`{
        itemsByName(name: "${search}"){
          name
          image512pxLink
        }
      }`
    });
  }

  inspectItemQuery(search:string){
    return this.apollo.watchQuery({
      query: gql`{
        items(name: "${search}") {
          name
          inspectImageLink
          usedInTasks {
            name
            trader {
              name
            }
            minPlayerLevel
          }
          avg24hPrice
          updated
          changeLast48h
          sellFor {
            vendor {
              name
            }
            currency
            price
          }
        }
      }`
    })
  }


}
