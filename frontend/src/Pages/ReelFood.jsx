import React, { useRef, useState, useEffect } from 'react';
import { Heart, MessageCircle, ShoppingBag, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const SingleReel = ({ item, onLike, onSave }) => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          // Play when it enters the viewport
          videoRef.current.play().catch(() => {});
        } else if (videoRef.current) {
          // Pause when it leaves the viewport
          videoRef.current.pause();
          // RESET LOGIC: This ensures it starts from the first frame next time
          videoRef.current.currentTime = 0;
        }
      },
      { threshold: 0.6 } // Adjusted threshold for better snapping feel
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative h-screen w-full snap-start snap-always bg-black overflow-hidden">
      {/* CRITICAL FIX: Changed item.videoUrl to item.video 
         matching your backend: video: fileUploadResult.url 
      */}
      <video
        ref={videoRef}
        src={item.video} 
        className="absolute inset-0 h-full w-full object-cover"
        loop
        muted
        playsInline
      />

      {/* Side Actions Overlay */}
      <div className="absolute right-4 bottom-44 flex flex-col gap-6 items-center text-white z-20">
        <button onClick={() => { setIsLiked(!isLiked); onLike(item); }} className="flex flex-col items-center">
          <Heart size={32} className={isLiked ? "fill-red-500 stroke-red-500" : "fill-none"} />
          <span className="text-xs font-bold mt-1">{item.likeCount || 0}</span>
        </button>
        <MessageCircle size={32} />
        <MoreHorizontal size={32} />
      </div>

      {/* Bottom Content Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-6 pb-12 bg-gradient-to-t from-black/90 via-transparent to-transparent text-white z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center font-bold border border-white/20">
            {item.name ? item.name[0] : 'F'}
          </div>
          <span className="font-bold text-lg">{item.name}</span>
        </div>

        {/* Truncated Description (Max 2 lines) */}
        <p className="text-sm mb-6 line-clamp-2 leading-relaxed opacity-90 max-w-[85%]">
          {item.description}
        </p>

        {/* Visit Store Button */}
        <button 
      onClick={() => navigate(`/food-partner/${item.foodPartner}`)}
        className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all text-white font-bold py-4 px-6 rounded-2xl shadow-xl">
          <ShoppingBag size={20} />
          <span>Visit Store</span>
        </button>
      </div>
    </div>
  );
};

const ReelFeed = ({ items, onLike, onSave }) => {
  // If items is undefined, we show a loader instead of a black screen
  if (!items) return <div className="h-screen w-full bg-black flex items-center justify-center text-white">Connecting to server...</div>;
  
  if (items.length === 0) return <div className="h-screen w-full bg-black flex items-center justify-center text-white">No food videos yet!</div>;

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-black">
      {items.map((item) => (
        <SingleReel key={item._id} item={item} onLike={onLike} onSave={onSave} />
      ))}
    </div>
  );
};

export default ReelFeed;