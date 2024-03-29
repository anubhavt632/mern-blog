import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Spinner} from 'flowbite-react';

export default function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/backend/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                if(!res.ok){
                    setError(true);
                    setLoading(false);
                    return;
                }
                if (res.ok) {
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }

        } 
        fetchPost();
    }, [postSlug]);
    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <Spinner size='xl'/>
        </div>
    );
  return <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
    <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl
    mx-auto lg:text-4xl">{post && post.title}</h1>
  </main>;

}
