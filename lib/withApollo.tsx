import { ApolloClient, ApolloProvider, createHttpLink, from, InMemoryCache, NormalizedCache, NormalizedCacheObject } from "@apollo/client";
import { GetServerSidePropsContext, NextPage } from "next";

export type ApolloClientContext = GetServerSidePropsContext

export const withApollo = (Component: NextPage) => {
  return function Provider(props: any){
    return(
      <ApolloProvider client={getApolloClient(undefined, props.apolloState)}>
        <Component {...props} />;
      </ApolloProvider>    
    )
  }
}

export function getApolloClient(ctx?: ApolloClientContext,serverSideRenderingCache?: NormalizedCacheObject){
  const httpLink = createHttpLink({
    uri: 'http://localhost:3000/api',
    fetch
  })
  
  const cache = new InMemoryCache().restore(serverSideRenderingCache ?? {})
  
  return new ApolloClient({
    link: from([httpLink]),
    cache,
  })
}