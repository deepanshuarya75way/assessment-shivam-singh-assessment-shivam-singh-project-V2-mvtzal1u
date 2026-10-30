import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { useSearchParams } from "react-router-dom";
import Loader from "../components/loader.component";
import NoDataMessage from "../components/nodata.component";
import { ManagePublishedBlogCard, ManageDraftBlogPost } from "../components/manage-blogcard.component";
import toast, { Toaster } from "react-hot-toast";


const ManageBlogs = () => {
    const { userAuth: { access_token, username } } = useContext(UserContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const [status, setStatus] = useState(searchParams.get("status") || "all");
    const [query, setQuery] = useState(searchParams.get("query") || "");
    const [sortBy, setSortBy] = useState(searchParams.get("sort") || "date");
    const [order, setOrder] = useState(searchParams.get("order") || "desc");
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

    const [blogs, setBlogs] = useState(null);
    const [totalDocs, setTotalDocs] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const storageKey = `views_${username || "user"}`;
    const [savedViews, setSavedViews] = useState(() => JSON.parse(localStorage.getItem(storageKey) || "[]"));
    const [viewName, setViewName] = useState("");

    const statusParam =searchParams.get("status") || "all";
    const queryParam =searchParams.get("query") || "";
    const sortParam =searchParams.get("sort") || "date";
    const orderParam =searchParams.get("order") || "desc";
    const pageParam =parseInt(searchParams.get("page")) || 1;

    const updateParams = (newParams) => {
        const params = new URLSearchParams(searchParams);
        Object.keys(newParams).forEach(k =>{
            if(newParams[k] !== undefined && newParams[k] !=="") params.set(k,newParams[k]);
            else params.delete(k);
         });
        setSearchParams(params);
    };

    const fetchBlogs = () => {
        if (!access_token) return;
        setLoading(true);
        const draft = status === "draft" ? true : status === "published" ? false : "all";

        axios.post((import.meta.env.VITE_SERVER_DOMAIN || "http://localhost:3000") + "/user-written-blogs", 
            { page, draft, query, sortBy, order, limit: 5 },
            { headers: { Authorization: `Bearer ${access_token}` } }
        )
        .then(({ data }) => {
            setBlogs(data.blogs);
            setTotalDocs(data.totalDocs || data.blogs.length);
            setTotalPages(data.totalPages || Math.ceil((data.totalDocs || data.blogs.length) / 5) || 1);
            setLoading(false);
        })
        .catch(err => {
            toast.error(err.response?.data?.error || "Error loading blogs");
            setLoading(false);
        });
    };

    useEffect(() => { fetchBlogs(); }, [page, status, sortBy, order, access_token]);

    const changeFilter = (type, val) => {
        setPage(1);
        if (type === "status") { setStatus(val); updateParams({ status: val, page: 1 }); }
        if (type === "sort") { setSortBy(val); updateParams({ sort: val, page: 1 }); }
        if (type === "order") { setOrder(val); updateParams({ order: val, page: 1 }); }
    };

    const saveView = () => {
        if (!viewName.trim()) return toast.error("Enter view name");
        const updated = [...savedViews.filter(v => v.name !== viewName), { name: viewName, status, query, sortBy, order }];
        setSavedViews(updated);
        localStorage.setItem(storageKey, JSON.stringify(updated));
        setViewName("");
        toast.success("View saved!");
    };

    const applyView = (v) => {
        setStatus(v.status);
        setQuery(v.query || "");
        setSortBy(v.sortBy);
        setOrder(v.order);
        setPage(1);
        updateParams({ status: v.status, query: v.query, sort: v.sortBy, order: v.order, page: 1 });
    };

    return (
        <div className="max-w-[1000px] mx-auto p-4">
            <Toaster />
            <h1 className="text-xl font-bold mb-4">Content Dashboard</h1>

            <div className="flex flex-wrap gap-2 mb-4 bg-grey/30 p-3 rounded-lg items-center">
                <input 
                    type="search" 
                    placeholder="Search title..." 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => { if(e.key === 'Enter') { setPage(1); updateParams({ query, page: 1 }); fetchBlogs(); } }}
                    className="p-2 border rounded text-sm flex-1"
                />
                <select value={status} onChange={(e) => changeFilter("status", e.target.value)} className="p-2 border rounded text-sm">
                    <option value="all">All</option>
                    <option value="published">Published</option>
                    <option value="draft">Drafts</option>
                </select>
                <select value={sortBy} onChange={(e) => changeFilter("sort", e.target.value)} className="p-2 border rounded text-sm">
                    <option value="date">Date</option>
                    <option value="views">Reads</option>
                    <option value="likes">Likes</option>
                </select>
                <button type="button" onClick={() => changeFilter("order", order === "desc" ? "asc" : "desc")} className="p-2 border rounded text-sm">
                    {order === "desc" ? "↓ Desc" : "↑ Asc"}
                </button>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-2 mb-4 text-sm">
                <div className="flex gap-1 items-center flex-wrap">
                    <span className="font-semibold mr-1">Views:</span>
                    {savedViews.map(v => (
                        <span key={v.name} className="bg-grey px-2 py-1 rounded flex gap-1 items-center">
                            <button onClick={() => applyView(v)} className="font-medium">{v.name}</button>
                            <button onClick={() => {
                                const up = savedViews.filter(x => x.name !== v.name);
                                setSavedViews(up);
                                localStorage.setItem(storageKey, JSON.stringify(up));
                            }} className="text-red font-bold">×</button>
                        </span>
                    ))}
                </div>
                <div className="flex gap-1">
                    <input type="text" placeholder="View name" value={viewName} onChange={e => setViewName(e.target.value)} className="p-1 border rounded text-xs" />
                    <button onClick={saveView} className="bg-black text-white px-2 py-1 rounded text-xs">Save</button>
                </div>
            </div>

            <p className="text-xs text-dark-grey mb-3">Showing {blogs?.length || 0} of {totalDocs} (Page {page} of {totalPages})</p>

            {loading ? <Loader /> : blogs && blogs.length > 0 ? (
                <div>
                    {blogs.map((b, i) => (
                        <div key={b.blog_id || i} className="border-b py-2">
                            {b.draft ? <ManageDraftBlogPost blog={{ ...b, index: i }} /> : <ManagePublishedBlogCard blog={{ ...b, index: i }} />}
                        </div>
                    ))}
                    <div className="flex justify-center gap-4 mt-4">
                        <button disabled={page <= 1} onClick={() => { setPage(p => p - 1); updateParams({ page: page - 1 }); }} className="border px-3 py-1 rounded text-sm disabled:opacity-30">Prev</button>
                        <span className="text-sm">Page {page} of {totalPages}</span>
                        <button disabled={page >= totalPages} onClick={() => { setPage(p => p + 1); updateParams({ page: page + 1 }); }} className="border px-3 py-1 rounded text-sm disabled:opacity-30">Next</button>
                    </div>
                </div>
            ) : <NoDataMessage message="No blogs found." />}
        </div>
    );
};

export default ManageBlogs;



