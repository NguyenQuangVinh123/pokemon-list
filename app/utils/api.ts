async function callApi(url: string, searchQuery?: string, method = "GET", needCache: RequestCache = "force-cache") {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}?${searchQuery}`, {
        method,
        cache: needCache
    });
    if (!res.ok) {
        return {
            error: "Something went wrong!"
        }
    }
    return res.json();

}

export default callApi