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

  inspectItemQuery(search: string) {
    // Function to escape quotes within the search string
    const escapeQuotes = (str: string) => {
      return str.replace(/"/g, '\\"');
    };

    // Escape quotes within the search string
    const sanitizedSearch = escapeQuotes(search);

    return this.apollo.watchQuery({
      query: gql`{
        items(name: "${sanitizedSearch}") {
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
          buyFor {
            vendor {
              name
            }
            currency
            price
          }
          sellFor {
            vendor {
              name
            }
            currency
            price
          }
        }
      }`
    });
  }



}
