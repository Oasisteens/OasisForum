'use client';
import "../../src/post.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Page({params: {id}}) {
    const [post, setPost] = useState(null);
    const fetchPost = async () => {
        try{
            const res = await axios.get(`/api/fetchPost?id=${id}`);
            setPost(res.data.post);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchPost();
    }, []);
    return (
        <div>
            {post && (
                <div>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                </div>
            )}
        </div>
    )
}

export default Page;