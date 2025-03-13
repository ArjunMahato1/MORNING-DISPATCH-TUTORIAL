import Advertise from "@/components/shared/Advertise";
import PostCard from "@/components/shared/PostCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  // console.log(posts)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts?limit=6");

      const data = await res.json();

      if (res.ok) {
        setPosts(data.posts);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <div className="flex flex-col max-w-6xl gap-6 mx-auto p-28">
        <h1 className="text-4xl font-bold text-blue-800">
          Welcome to <span className="text-red-600"> DailyNewzz</span>
        </h1>

        <p className="mt-3 text-lg text-gray-600">
          Your trusted source for the latest headlines, in-depth analysis, and
          breaking news every morning.
        </p>

        <p className="mt-1 italic text-gray-500">Stay informed, stay ahead.</p>

        <Link to={"/search"}>
          <Button className="flex items-center gap-2 px-6 py-3 font-semibold text-black bg-yellow-400 rounded-full shadow-lg hover:bg-yellow-600 w-fit">
            View all posts <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      <section className="pb-16 bg-white">
        <div className="mx-auto text-center max-w-7xl">
          <h2 className="mb-8 text-4xl font-bold text-gray-800">
            Why You'll Love DailyNewzz
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard
              title={"Diverse Content"}
              description={
                "Explore news on a variety of topics, from technology to lifestyle."
              }
              icon="📚"
            />

            <FeatureCard
              title={"Community Driven"}
              description={
                "Connect with writers and readers who share your interests."
              }
              icon="🌐"
            />

            <FeatureCard
              title={"Easy to Use"}
              description={
                "A seamless platform for sharing and discovering great content."
              }
              icon="🚀"
            />
          </div>
        </div>
      </section>

      <div className="p-3 bg-white">
        <Advertise />
      </div>

      <div className="flex flex-col max-w-6xl gap-8 p-3 mx-auto py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-slate-700">Recent Posts</h2>

            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            <Link
              to={"/search"}
              className="text-lg font-semibold text-center hover:underline"
            >
              View all news
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="p-6 text-center transition-shadow duration-300 bg-gray-100 rounded-lg shadow-md hover:shadow-lg">
      <div className="mb-4 text-5xl">{icon}</div>
      <h3 className="mb-2 text-2xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;
