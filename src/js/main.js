import dotenv from "dotenv";
dotenv.config();

const read_token = process.env.READ_API_TOKEN;

const blogContainer = document.querySelector('.blogpost-container');

const fetchBlog = async () => {
    try {
        const res = await fetch(`https://api.buttercms.com/v2/posts?auth_token=${read_token}`);
        const data = await res.json();
        let blogs = data.data;

        console.log(blogs);

        {blogs.map((blog) => {
        const blogMarkup = `<!--blogpost-container-->
            <div class="blogpost-box" key={${blog.title}}>
                <!--img-->
                <div class="blogpost-img">
                    <img src="${blog.featured_image}" alt="Blog">
                </div>

                <!--blogpost text-->
                <div class="blogpost-text">
                    <span>${blog.tags[0].name}</span>
                    <a href="#" class="blogpost-title">${blog.title}</a>
                    <p>${blog.summary}</p>
                </div>

                <div class="blogpost-footer">
                    <div>
                        <img src="${blog.author.profile_image}" alt="avatar">
                        <p>${blog.author.first_name+" "+blog.author.last_name}</p>
                    </div>
                    <a class="blogpost-link" href="/blog/${blog.slug}">→</a>
                </div>
            </div>`
            console.log(blogMarkup);
    blogContainer.insertAdjacentHTML('afterbegin', blogMarkup);
    })}
    
    } catch (error) {
        alert(error)
    }
   
}

fetchBlog()