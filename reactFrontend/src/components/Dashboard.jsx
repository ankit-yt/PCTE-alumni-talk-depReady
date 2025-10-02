import React from "react";
import { useSelector } from "react-redux";
import { feedbackPagination } from "../api/feedback.api";
import { useInfiniteQuery } from "@tanstack/react-query";
function Dashboard() {
  const alumni = useSelector((state) => state.alumni);
  const meet = useSelector((state) => state.meet);
  const completedMeet = meet.filter((meet) => meet.status === "Completed");
  const nextTalk = meet
    .filter((meet) => meet.status === "Upcoming")
    .sort((a, b) => new Date(b.time) - new Date(a.time));
  console.log(meet);
  let diffDay = 0;
  if (meet.length > 0) {
    const diff = new Date(nextTalk[0].time) - new Date();
    diffDay = Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
  const pastTalks = meet
    .filter((meet) => meet.status === "Completed")
    .sort((a, b) => new Date(b.time) - new Date(a.time));

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["feedbacks"],
      queryFn: ({ pageParam = 1 }) => feedbackPagination(pageParam, 5),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.data.hasMore ? allPages.length + 1 : undefined;
      },
      staleTime: 1000 * 60 * 5,
    });
  console.log(data);

  const feedbacks = data?.pages.flatMap((p) => p.data.feedbacks) || [];

  return (
    <div className="h-screen w-full py-5 px-4 sm:px-6 lg:px-10">
      {/* Top Bar */}
      <div className="w-full px-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="font-semibold text-gray-400">DASHBOARD</h1>

        <div className="flex gap-3 items-center">
          <h1 className="text-xl sm:text-2xl font-semibold text-red-600 tracking-wide text-center sm:text-left">
            Welcome back,{" "}
            <span className="font-extrabold text-red-700">Admin</span>
          </h1>

          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full relative bg-red-500 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=600&auto=format&fit=crop&q=60"
              alt=""
            />
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="w-full flex flex-col lg:flex-row justify-between gap-6 px-5 py-4 bg-[#f5f6fa] mt-4 rounded-lg">
        <div className="flex-1 p-6 bg-white border border-red-100 rounded-2xl shadow-lg">
          <h1 className="text-sm text-red-600 font-semibold tracking-wide uppercase mb-2">
            🎓 Total Alumni
          </h1>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
            {alumni.length}
          </h2>
          <p className="text-xs text-gray-500 mt-2">Updated just now</p>
        </div>

        <div className="flex-1 p-6 bg-white border border-red-100 rounded-2xl shadow-lg">
          <h1 className="text-sm text-red-600 font-semibold tracking-wide uppercase mb-2">
            📅 Total Talks
          </h1>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
            {completedMeet.length}
          </h2>
          <p className="text-xs text-gray-500 mt-2">Updated just now</p>
        </div>

        <div className="flex-1 p-6 bg-white border border-red-100 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-sm text-red-600 font-semibold tracking-wide uppercase">
              ⏳ Upcoming Meet
            </h1>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-red-400">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=600&auto=format&fit=crop&q=60"
                alt=""
              />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-700">
            <p>📍 {nextTalk[0]?.location}</p>
            <p>
              🗓️{" "}
              {meet.length > 0
                ? new Date(nextTalk[0].time).toLocaleDateString("en-us", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  })
                : "loading..."}
            </p>
          </div>
          <div className="mt-2 text-sm font-semibold text-red-500 tracking-wide">
            ⌛ Countdown: <span className="text-gray-700">{diffDay} days</span>
          </div>
        </div>
      </div>

      {/* Bottom Graph/Boxes */}
      {/* Bottom Section */}
      <div className="w-full flex flex-col lg:flex-row gap-6 mt-5 py-5  px-5">
        {/* PAST TALKS */}
        <div className="w-full lg:w-2/5 bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-800">
              Past Talks
            </h2>
            <span className="text-xs text-gray-400">Recent sessions</span>
          </div>

          <ul className="space-y-3 overflow-y-auto h-64 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {pastTalks.map((talk, index) => (
              <li
                key={index}
                className="flex justify-between items-start border-b border-gray-100 pb-3 last:border-none hover:bg-red-50/40 rounded-lg px-2 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {talk.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    by {talk.alumni[0].name}
                  </p>
                </div>
                <div className="text-right">
                  <span className="block text-xs text-gray-600">
                    {new Date(talk.time).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-[11px] text-red-600">
                    {talk.location}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* FEEDBACK */}
        <div className="w-full lg:w-3/5 bg-white border  border-gray-200 rounded-xl shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between  mb-4">
            <h2 className="text-base font-semibold text-gray-800">
              Client Feedback
            </h2>
            <span className="text-xs text-gray-400">Updated just now</span>
          </div>

          <ul className="space-y-3 overflow-y-auto md:h-64 h-96 no-scrollbar">
            {feedbacks.map((f, i) => (
              <li
                key={i}
                className="border flex justify-between border-gray-100 rounded-lg p-4  transition-colors"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-medium">
                      {f.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {f.name}
                      </p>
                      <p className="text-xs text-gray-500">Shared a review</p>
                    </div>
                  </div>
                  <p className="text-gray-700  text-sm leading-snug">
                    “{f.comment}”
                  </p>
                </div>
                {new Date(f.createdAt).toLocaleDateString() ===
                new Date().toLocaleDateString() ? (
                  <div className="inline-block bg-green-100 h-fit text-green-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                    New
                  </div>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>

          <div className="flex justify-center pt-4">
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              className="px-6 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition disabled:opacity-50"
            >
              {isFetchingNextPage
                ? "Loading..."
                : hasNextPage
                ? "Load More"
                : "No More Feedbacks"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
