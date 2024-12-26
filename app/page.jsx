import { getServerSession } from "next-auth";
import { authOptions } from "./lib/nextAuth";
import Feed from "./../components/Feed";
const Home = async () => {
  const session = await getServerSession(authOptions);
  return (
    <section className="w-full flex-center flex-col ">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">
          {" "}
          {` `}AI-Powered Prompts
        </span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for the modern world to
        discover, create, and share creative prompts. Hello{" "}
      </p>

      <Feed />
    </section>
  );
};

export default Home;
