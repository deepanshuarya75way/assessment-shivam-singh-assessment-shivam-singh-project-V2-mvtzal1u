import { Link } from "react-router-dom";

export const ManagePublishedBlogCard = ({ blog }) => {
    let { banner, blog_id, title, publishedAt, activity } = blog;

    return (
        <div className="flex gap-4 items-center justify-between py-2">
            <div className="flex gap-4 items-center">
                {banner && <img src={banner} className="w-16 h-16 object-cover rounded bg-grey" alt={title} />}
                <div>
                    <Link to={`/blog/${blog_id}`} className="font-semibold hover:underline line-clamp-1">
                        {title}
                    </Link>
                    <p className="text-xs text-dark-grey">
                        Published on {publishedAt ? new Date(publishedAt).toLocaleDateString() : "Recently"}
                    </p>
                </div>
            </div>
            <div className="flex gap-4 text-xs text-dark-grey items-center">
                <span> {activity?.total_reads || 0}</span>
                <span> {activity?.total_likes || 0}</span>
                <Link to={`/editor/${blog_id}`} className="underline text-black font-medium">Edit</Link>
            </div>
        </div>
    );
};

export const ManageDraftBlogPost = ({ blog }) => {
    let { blog_id, title, des, index } = blog;

    return (
        <div className="flex gap-4 items-center justify-between py-2">
            <div>
                <h1 className="font-semibold line-clamp-1">{title || "Untitled Draft"}</h1>
                <p className="text-xs text-dark-grey line-clamp-1">{des || "No description..."}</p>
            </div>
            <div className="flex gap-3 text-xs items-center">
                <span className="bg-grey px-2 py-1 rounded text-dark-grey">Draft</span>
                <Link to={`/editor/${blog_id}`} className="underline text-black font-medium">Edit</Link>
            </div>
        </div>
    );
};