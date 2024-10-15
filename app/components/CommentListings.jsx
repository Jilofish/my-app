import { fetchComments } from "@/actions/actions"
import { comment } from "postcss";
import CommentItem from "./CommentItem";


export const CommentListings = async ({ blogId }) => {

    const comments = await fetchComments (blogId)
    console.log('comments', comments);

    return (  
        <div>
        <h2 className='font-semibold text-center text-gray-200 my-2 mx-2 px-2 py-2'>All Comments ({comments?.length}) </h2>

        {
            comments?.length > 0 ? comments?.map((comment) => {
                return <CommentItem key={comment?.id} comment={comment} />
            }) : <p>There is no comments left....</p>
        }
        </div>
    )
}

