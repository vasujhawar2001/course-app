import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { isUserLoading } from '@/store/selectors/isUserLoading';
import { userEmailState } from '@/store/selectors/userEmail';
import { Button, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil';

type ConnectionStatus = {
  isConnected: boolean
}

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const userEmail = useRecoilValue(userEmailState);
  const userLoading = useRecoilValue(isUserLoading);

  return <div>
        {isConnected ? (
          <h4 className="subtitle">You are connected to MongoDB</h4>
        ) : (
          <h4 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h4>
        )}
      <Grid container style={{padding: "5vw"}}>
          <Grid item xs={12} md={6} lg={6}>
              <div style={{marginTop: 100}}>
                  <Typography variant={"h2"}>
                      Coursera Admin
                  </Typography>
                  <Typography variant={"h5"}>
                      A place to learn, earn and grow
                  </Typography>
                  {!userLoading && !userEmail && <div style={{display: "flex", marginTop: 20}}>
                      <div style={{marginRight: 10}}>
                          <Button
                              size={"large"}
                              variant={"contained"}
                              onClick={() => {
                                router.push("/signup")
                              }}
                          >Signup</Button>
                      </div>
                      <div>
                          <Button
                              size={"large"}
                              variant={"contained"}
                              onClick={() => {
                                router.push("/signin")
                              }}
                          >Signin</Button>
                      </div>
                  </div>}
              </div>
              <div>
              </div>
          </Grid>
          <Grid item xs={12} md={6} lg={6}  style={{marginTop: 20}}>
              <img src={"https://img.freepik.com/free-vector/empty-classroom-interior-with-chalkboard_1308-65378.jpg"} width={500} height={400} alt={"course-image"}/>
          </Grid>
      </Grid>
  </div>
}
