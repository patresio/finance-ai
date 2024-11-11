import {} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "./_components/navbar";

const Home = () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }
  return (
    <div className="flex h-full w-full">
      <Navbar />
    </div>
  );
};

export default Home;
