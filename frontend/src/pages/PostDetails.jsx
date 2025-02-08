import Advertise from "@/components/shared/Advertise"
import CommentSection from "@/components/shared/CommentSection"
import PostCard from "@/components/shared/PostCard"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const PostDetails = () => {
  const { postSlug } = useParams()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [post, setPost] = useState(null)
  const [recentArticles, setRecentArticles] = useState(null)

  console.log(recentArticles)

  // console.log(post)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)

        const res = await fetch(`/api/post/getposts?slug=${postSlug}`)

        const data = await res.json()

        if (!res.ok) {
          setError(true)
          setLoading(false)

          return
        }

        if (res.ok) {
          setPost(data.posts[0])
          setLoading(false)
          setError(true)
        }
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }

    fetchPost()
  }, [postSlug])

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`)

        const data = await res.json()

        if (res.ok) {
          setRecentArticles(data.posts)
        }
      }

      fetchRecentPosts()
    } catch (error) {
      console.log(error.message)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <img
          src="https://cdn-icons-png.flaticon.com/128/39/39979.png"
          alt="loading"
          className="w-20 animate-spin"
        />
      </div>
    )
  }

  return (
    <main className="flex flex-col max-w-6xl min-h-screen p-3 mx-auto">
      <h1 className="max-w-3xl p-3 mx-auto mt-10 text-3xl font-bold text-center underline lg:text-4xl text-slate-700">
        {post && post.title}
      </h1>

      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button variant="outline" className="border border-slate-500">
          {post && post.category}
        </Button>
      </Link>

      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[500px] w-full object-cover"
      />

      <div className="flex justify-between w-full max-w-2xl p-3 mx-auto text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>

        <span className="italic">
          {post && (post.content.length / 100).toFixed(0)} mins read
        </span>
      </div>

      <Separator className="bg-slate-500" />

      <div
        className="w-full max-w-3xl p-3 mx-auto post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>

      <div className="w-full max-w-4xl mx-auto">
        <Advertise />
      </div>

      <CommentSection postId={post._id} />

      <div className="flex flex-col items-center justify-center mb-5">
        <h1 className="mt-5 text-xl font-semibold text-slate-700">
          Recently published articles
        </h1>

        <div className="flex flex-wrap justify-center gap-5 my-5">
          {recentArticles &&
            recentArticles.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
        </div>
      </div>
    </main>
  )
}

export default PostDetails
