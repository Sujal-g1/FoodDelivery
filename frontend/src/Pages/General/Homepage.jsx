import { useEffect, useState } from 'react' // 1. Import useState
import axios from 'axios'
import ReelFood from '../../Pages/ReelFood'

const Homepage = () => {
    // 2. Initialize the state for videos
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/food", { withCredentials: true })
            .then(response => {
                console.log("Data fetched:", response.data.foodItems);
                // 3. This will now work because setVideos is defined
                setVideos(response.data.foodItems);
            })
            .catch(err => console.error("Error fetching food:", err));
    }, []);

    return (
        <div className='h-screen w-full bg-black'>
            {/* 4. Pass the videos state to your ReelFood component */}
            <ReelFood items={videos} />
        </div>
    )
}

export default Homepage