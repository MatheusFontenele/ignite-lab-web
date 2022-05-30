import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getServerPage, ssr, useMe } from "../../graphql/generated/page";
import { withApollo } from "../../lib/withApollo";

function Home(props) {
  const { user } = useUser();
  const {data: me} = useMe()
  console.log(me);
  
  return (
    <div>
      <h1>hello world</h1>
      ok: <pre>{JSON.stringify(me, null, 2)}</pre>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    return {
      props: {}
    }
  }
})

export default withApollo(
  ssr.withPage()(Home)
)