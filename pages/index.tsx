import Head from "next/head";
import { trpc } from "../utils/trpc";

export default function Home() {
  const hello = trpc.hello.useQuery({ text: "test" });
  if (!hello.data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Which Episode?</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <>{hello.data.greeting}</>
    </>
  );
}
