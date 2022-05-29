import { ApolloClient, createHttpLink, from, InMemoryCache } from "@apollo/client";
import { NextPage } from "next";

export const withApollo = (Component: NextPage) => {
  return function Provider(Props: any){
    const httpLink = createHttpLink({
      uri: 'http://localhost:3332/graphql',
      fetch
    })
    
    const cache = new InMemoryCache()
    
    export const apolloClient = new ApolloClient({
      link: from([httpLink]),
      cache,
    })
  }
}