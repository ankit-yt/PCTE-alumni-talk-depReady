import { useEffect, useRef, useState } from "react";
import { FaPlay, FaVideoSlash } from "react-icons/fa";
import { talkPagination } from "../api/meet.api";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setScreenWidth } from "../redux/slices/uiSlice";
import { IoMdArrowRoundBack } from "react-icons/io";

function Talks() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(-1);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const { isMobile} = useSelector((state) => state.ui);

  const dispatch = useDispatch();
  useEffect(() => {
    const handleResize = () => {
      dispatch(setScreenWidth(window.innerWidth));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["talks"],
      queryFn: ({ pageParam = 1 }) => talkPagination(pageParam, 3),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.data.hasMore ? allPages.length + 1 : undefined;
      },
      staleTime: 1000 * 60 * 5,
    });
            
  const talksArray = data?.pages.flatMap((p) => p.data.talks) || [];

  return (
    <section className="relative talks z-10 w-full py-12 bg-gray-50  overflow-hidden">
      
      
      <div className="absolute w-72 h-72 z-1 bg-red-500/30 rounded-full blur-3xl bottom-30 right-10"></div>
      <div className="absolute w-72 h-72 bg-blue-500/30 z-1 rounded-full blur-3xl top-30 left-10"></div>

      <div className="max-w-7xl  mx-auto  sm:px-6 lg:px-8">
        <div className="text-center px-5 relative mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
            Alumni <span className="md:bg-gradient-to-r from-red-600 via-pink-500 to-orange-400 bg-red-600 bg-clip-text text-transparent">Talks</span>
          </h2>
          <p className="text-gray-600 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            Watch inspiring sessions from alumni across industries. Learn from
            their journeys, mistakes, and successes.
          </p>
           <button
                      onClick={() => navigate('/')}
                      className=" text-black hidden  text-2xl absolute top-1/2 right-0 hover:text-red-500 transition"
                    >
                      <IoMdArrowRoundBack />
          
                    </button>
        </div>

        
        <div className="grid grid-cols-1 relative z-20 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {talksArray.map((talk, i) => (
            <div
              key={talk._id}
              className="bg-white md:rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition"
            >
              <div className="relative w-full h-52 sm:h-56 md:h-60 lg:h-56">
                <img
                  className="w-full h-full object-cover"
                  src={talk.media.images[0].image}
                  alt={talk.title}
                />

                {index === i && isPlaying && (
                  <>
                    {talk.media.videoLink ? (
                      <video
                        ref={videoRef}
                        controls
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        src={talk.media.videoLink}
                      />
                    ) : (
                      <div className="w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center bg-gradient-to-r from-red-100 to-blue-100 text-gray-700">
                        <FaVideoSlash className="text-4xl text-red-500 mb-2" />
                        <span className="text-sm font-medium">
                          No Video Available
                        </span>
                      </div>
                    )}
                  </>
                )}

                {index !== i && (
                  <button
                    onClick={() => {
                      setIsPlaying(true);
                      setIndex(i);
                      setTimeout(() => {
                        videoRef.current?.play();
                      }, 100);
                    }}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition"
                  >
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-110 transition">
                      <FaPlay className="text-red-600 ml-1" />
                    </div>
                  </button>
                )}
              </div>

                
              <div
                onClick={() => navigate("/talkInsight", { state: { talk } })}
                className="p-5 sm:p-6 space-y-3 cursor-pointer"
              >
                <div className="flex gap-4 items-center">
                    <img
                      src={talk.alumni[0].profilePic}
                      alt={talk.alumni[0].name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-red-500 shrink-0"
                    />

                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
                        {talk.title}
                      </h3>

                      <div className="text-sm text-gray-700">
                        <span className="font-medium">
                          {talk.alumni[0].name}
                        </span>{" "}
                        • {talk.alumni[0].currentCompany} • {" "}
                        {new Date(talk.time).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center z-99 mt-12">
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            {isFetchingNextPage
              ? "Loading..."
              : hasNextPage
              ? "Load More"
              : "No More Talks"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Talks;
