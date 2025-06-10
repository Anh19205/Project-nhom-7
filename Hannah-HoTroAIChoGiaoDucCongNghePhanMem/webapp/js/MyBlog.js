let page = 1;
let size = 3;
let isLoading = false;
let totalPage = 0;

function getMyBlogs(){
    isLoading = true;
    const token = localStorage.getItem('token');
    const urlMyPosts = `http://localhost:9999/api/post/myPosts?page=${page}&size=${size}`;
    fetch(urlMyPosts, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    })
    .then((response) => response.json())
    .then((data) => {
        totalPage = data.result.totalPage;

        console.log('page: ', page);

        const blogContainer = document.getElementById("blog-container");
        data.result.data.forEach(post => {
            const article = document.createElement("article");
            article.className = "mb-8 p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow";

            article.innerHTML = `
                <div class="flex items-center mb-3 space-x-3">
                    <div class="rounded-full w-10 h-10 flex items-center justify-center font-semibold text-indigo-600 bg-indigo-100">
                        avt
                    </div>
                    <span class="font-semibold text-gray-900 text-lg select-text">${post.fullName}</span>
                    <span class="text-xs text-gray-500">${post.createdTime}</span>
                </div>
                <div class="border border-gray-200 rounded-md p-3 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50">
                    ${post.content}
                </div>
            `;
            blogContainer.appendChild(article);
        });

        page++;
        isLoading = false;
    })
    .catch((err) => {
        console.log("error when get my posts: ", err);
        isLoading = false;
    });
}

window.addEventListener("DOMContentLoaded", () => {
    getMyBlogs();
});

window.addEventListener("scroll", () => {
    if (
        !isLoading &&
        page <= totalPage &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300
    ) {
        getMyBlogs();
    }
});
