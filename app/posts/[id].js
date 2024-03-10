import { useRouter } from 'next/navigation'

function Posts() {
    const router = useRouter()

    // Check if the router query is defined
    if (!router.query) {
        return 'Loading...';
    }

    const { id } = router.query;

    return (
        <div>
            <h1>Post {id}</h1>
            {/* Display post data here... */}
        </div>
    )
}

export default Posts