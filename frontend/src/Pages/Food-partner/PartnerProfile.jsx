import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { MapPin, Utensils, Users, Play } from 'lucide-react'

// Helper Component for Grid Videos to handle hover-play
const GridVideo = ({ src }) => {
    const videoRef = useRef(null);

    return (
        <div 
            className="relative aspect-[9/16] bg-zinc-900 rounded-lg overflow-hidden group cursor-pointer"
            onMouseEnter={() => videoRef.current?.play()}
            onMouseLeave={() => {
                videoRef.current?.pause();
                videoRef.current.currentTime = 0;
            }}
        >
            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src={src}
                muted
                loop
                playsInline
            />
            {/* Play Icon Overlay (Visible when not hovering) */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:opacity-0 transition-opacity">
                <Play className="text-white fill-white opacity-70" size={32} />
            </div>
        </div>
    );
};

const Profile = () => {
    const { id } = useParams()
    const [profile, setProfile] = useState(null)
    const [videos, setVideos] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/food/food-partner/${id}`, { withCredentials: true })
            .then(response => {
                setProfile(response.data.foodPartner)
                setVideos(response.data.foodPartner.foodItems || [])
            })
            .catch(err => console.error("Error fetching profile:", err))
    }, [id])

    if (!profile) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div>
        </div>
    );

    return (
        <main className="min-h-screen bg-black text-white pb-10">
            {/* Profile Header Container */}
            <section className="max-w-4xl mx-auto px-4 pt-10 pb-8">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="w-28 h-28 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-orange-500 to-yellow-400">
                            <img 
                                className="w-full h-full rounded-full object-cover border-4 border-black" 
                                src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60" 
                                alt={profile?.fullName}
                            />
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <h1 className="text-2xl font-bold tracking-tight uppercase">
                                {profile?.fullName}
                            </h1>
                            <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold py-1.5 px-6 rounded-lg transition-colors">
                                Order Now
                            </button>
                        </div>

                        <div className="flex justify-center md:justify-start gap-6 text-sm">
                            <div className="flex items-center gap-1.5">
                                <Utensils size={16} className="text-orange-500" />
                                <span><strong className="text-white">{profile.totalMeals || 0}</strong> meals</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Users size={16} className="text-orange-500" />
                                <span><strong className="text-white">{profile.customersServed || 0}</strong> served</span>
                            </div>
                        </div>

                        <div className="flex items-start justify-center md:justify-start gap-2 text-zinc-400">
                            <MapPin size={18} className="shrink-0 text-zinc-500" />
                            <p className="text-sm italic">{profile.address || "Location not provided"}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Separator */}
            <div className="max-w-4xl mx-auto px-4">
                <hr className="border-zinc-800" />
                <div className="flex justify-center -mt-[1px]">
                    <div className="border-t border-white py-3 px-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white">
                        <Play size={14} /> Reels
                    </div>
                </div>
            </div>

            {/* Video Grid */}
            <section className="max-w-4xl mx-auto px-1 md:px-4 grid grid-cols-3 gap-1 md:gap-4 mt-4">
                {videos.length > 0 ? (
                    videos.map((v) => (
                        <GridVideo key={v._id || v.id} src={v.video} />
                    ))
                ) : (
                    <div className="col-span-3 py-20 text-center text-zinc-500">
                        No reels shared yet.
                    </div>
                )}
            </section>
        </main>
    )
}

export default Profile