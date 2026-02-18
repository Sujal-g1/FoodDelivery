import React, { useRef, useState, useEffect } from 'react';
import { Heart, MessageCircle, ShoppingBag, MoreHorizontal } from 'lucide-react';
import  axios from 'axios'
import { useNavigate , Link } from 'react-router-dom'


const FOOD_REELS = [
  {
    id: 1,
    url: "https://www.pexels.com/download/video/36066271/",
    storeName: "Zen Sushi Bar",
    description: "Experience the freshest Atlantic salmon and hand-rolled maki. Perfect for a Friday night treat! 🍣 #SushiLovers #FreshFood",
    price: "$24.99"
  },
  {
    id: 2,
    url: "https://www.pexels.com/download/video/16013244/",
    storeName: "The Pizza Oven",
    description: "Double cheese, extra pepperoni, and our signature spicy honey drizzle. Hot and ready for delivery. 🍕 #PizzaNight #Cheesy",
    price: "$18.50"
  },
  {
    id: 3,
    url: "https://www.pexels.com/download/video/326370 17/",
    storeName: "Burger Theory",
    description: "The 'Monster' Burger: Triple-stacked wagyu beef, caramelized onions, and our secret sauce. One bite isn't enough. 🍔 #BurgerHeaven",
    price: "$15.00"
  },
  {
    id: 4,
    url: "https://ik.imagekit.io/gptFoodDelivery/ac83072c-0476-4abc-a342-d7ec7545eab4_CWiu6kqnv",
    storeName: "Image-Kit",
    description: "The 'Monster' Burger: Triple-stacked wagyu beef, caramelized onions, and our secret sauce. One bite isn't enough. 🍔 #BurgerHeaven",
    price: "$20.00"
  }
];

const SingleReel = ({ video }) => {
  const [liked, setLiked] = useState(false);
  const videoRef = useRef(null);

  // Intersection Observer to play/pause video when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      },
      { threshold: 0.6 } // Play when 60% of the video is visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);


  useEffect(() => {
   
    axios.get("http://localhost:3000/api/food")
    .then( response =>{

    } )

  }, [])
  

  return (
    <div className="relative h-screen w-full snap-start snap-always overflow-hidden bg-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        src={video.url}
        className="absolute inset-0 h-full w-full object-cover"
        loop
        muted // Most browsers block autoplay with sound
        playsInline
      />

      {/* Side Actions */}
      <div className="absolute right-4 bottom-48 flex flex-col gap-6 items-center text-white z-20">
        <button onClick={() => setLiked(!liked)} className="flex flex-col items-center group">
          <Heart 
            size={32} 
            className={`transition-transform active:scale-125 ${liked ? "fill-red-500 stroke-red-500" : "fill-none"}`} 
          />
          <span className="text-xs font-bold mt-1">2.4k</span>
        </button>   
        <div className="flex flex-col items-center">
          <MessageCircle size={32} />
          <span className="text-xs font-bold mt-1">128</span>
        </div>
        <MoreHorizontal size={32} />
      </div>

      {/* Bottom Content Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-6 pb-12 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center font-bold border border-white/20">
            {video.storeName[0]}
          </div>
          <span className="font-bold text-lg">{video.storeName}</span>
        </div>

        {/* Truncated Description */}
        <p className="text-sm mb-6 line-clamp-2 leading-relaxed opacity-90 max-w-[85%]">
          {video.description}
        </p>

        {/* Action Button */}
        <button className="flex items-center justify-between w-full bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all text-white font-bold py-4 px-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} />
            <span>Order Now</span>
          </div>
          <span className="bg-black/20 px-3 py-1 rounded-lg text-sm">{video.price}</span>
        </button>
      </div>
    </div>
  );
};

// Main Export Component
const ReelFood = () => {
  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-black">
      {FOOD_REELS.map((v) => (
        <SingleReel key={v.id} video={v} />
      ))}
    </div>
  );
};

export default ReelFood;