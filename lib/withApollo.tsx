import { ApolloClient, ApolloProvider, createHttpLink, from, InMemoryCache, NormalizedCache, NormalizedCacheObject } from "@apollo/client";
import { NextPage } from "next";

export const withApollo = (Component: NextPage) => {
  return function Provider(props: any){
    return(
      <ApolloProvider client={getApolloClient(props.apolloState)}>
        <Component {...props} />;
      </ApolloProvider>    
    )
  }
}

function getApolloClient(serverSideRenderingCache?: NormalizedCacheObject){
  const httpLink = createHttpLink({
    uri: 'http://localhost:3332/graphql',
    fetch
  })
  
  const cache = new InMemoryCache().restore(serverSideRenderingCache ?? {})
  
  return new ApolloClient({
    link: from([httpLink]),
    cache,
  })
}