import { useEffect, useState } from "react";
import { fetchTalksOnFrontend } from "../api/meet.api";
import NavBar from "./NavBar";
import Hero from "./home/Hero";
import Speaker from "./home/Speaker";
import UpcomingTalks from "./home/UpcomingTalks";
import PastHighlights from "./home/PastHighlights";
import StatsSection from "./home/StatsSection";
import Testimonials from "./home/Testimonials";
import Footer from "./home/Footer";
import WhyJoin from "./home/WhyJoin";

function Home() {
  const [meet, setMeet] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    let interval;

    const fetchMeet = async () => {
      try {
        const data = await fetchTalksOnFrontend('randomUpcomings');
        console.log(data)

        if (data) {
          setMeet(data.data[0]);
          console.log(data.data[0]);

          const target = new Date(data.data[0].time).getTime();

          interval = setInterval(() => {
            const now = Date.now();
            const diff = target - now;

            if (diff <= 0) {
              setTimeLeft("Started!");
              clearInterval(interval);
              return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);

            setTimeLeft(`${days}d ${hours}h ${minutes}m`);
          }, 2000);
        }
      } catch (err) {
        console.error("Error fetching meet:", err);
      }
    };

    fetchMeet();

    return () => clearInterval(interval);
  }, []);

  return (
   <>
  <NavBar />
  <Hero values={{ meet, timeLeft }} />
  <WhyJoin/>
  <Speaker/>
  <UpcomingTalks/>
  <PastHighlights/>
  <StatsSection/>
  <Testimonials/>
</>

  );
}

export default Home;
