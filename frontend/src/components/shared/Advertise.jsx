import React from "react"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"

const Advertise = () => {
  return (
    <div className="flex flex-col items-center justify-center p-3 text-center border border-teal-600 md:flex-row rounded-tl-3xl rounded-br-3xl">
      <div className="flex flex-col justify-center flex-1 w-full p-3 md:w-3/5">
        <h2 className="text-2xl font-semibold text-wrap">
          Want to know more about today's{" "}
          <span className="text-red-600">TOP 10</span> news?
        </h2>

        <p className="my-2 text-gray-500">Checkout these top news articles!</p>

        <Button className="mt-2 bg-blue-500 text-md h-min">
          <Link
            to={"https://google.com"}
            target="_blank"
            rel="noopener norefferer"
            className="text-wrap"
          >
            Stay Updated with Daily News: Your Go-To Resources
          </Link>
        </Button>
      </div>

      <div className="w-full p-7 md:w-2/5">
        <img
          src="https://images.pexels.com/photos/723072/pexels-photo-723072.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          className="w-full"
        />
      </div>
    </div>
  )
}

export default Advertise
