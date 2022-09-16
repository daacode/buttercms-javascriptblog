import { getAllBlogs } from "./api";

const blogContainer = document.querySelector(".blogpost-container");

const fetchMainBlogPage = async () => {
  try {
    const headerMarkup = ` <div class="blog-heading">
    <h3>My Blog</h3>
    <span>Here is my space where I writes different developer focused article</span>
</div>
`
const headContainer = document.querySelector(".blog-container");
headContainer.insertAdjacentHTML("afterbegin", headerMarkup);


    const blogs = await getAllBlogs();
    blogs.map((blog) => {
      const blogMarkup = `<!--blogpost-container-->
            <div class="blogpost-box" key={${blog.title}}>
                <!--img-->
                <div class="blogpost-img">
                    <img src="${blog.featured_image}" alt="Blog">
                </div>

                <!--blogpost text-->
                <div class="blogpost-text">
                    <span class="blogpost-tag">${blog.tags[0].name}</span>
                    <a href="/blog/${blog.slug}" class="blogpost-title">${blog.title}</a>
                    <p>${blog.summary}</p>
                </div>

                <div class="blogpost-footer">
                    <div>
                        <img src="${blog.author.profile_image}" alt="avatar">
                        <p class="blogpost-name">${
                          blog.author.first_name + " " + blog.author.last_name
                        }</p>
                    </div>
                    <a class="blogpost-link" href="/blog/${blog.slug}">→</a>
                </div>
            </div>`;
      blogContainer.insertAdjacentHTML("afterbegin", blogMarkup);
    });
  } catch (error) {
    alert(error);
  }
};


const fetchABlogPage = async () => {
  try {
    const url = window.location.pathname;

    const blogs = await getAllBlogs();

    const blog = blogs.find((blog) => {
      const parts = url.split("/");
      return blog.slug === parts[parts.length - 1];
    });

    const blogMarkup = `<div class="blog-container">
        <span class="blog-goBack"><a href="/">Go back</a></span>
    <div class="blog-wrap">
        <header>
            <p class="blog-date">Published ${blog.created}</p>
            <h1>${blog.title}</h1>
            <div class="blog-tag">
                <div>${blog.tags[0].name}</div>
            </div>
        </header>
        <img src=${blog.featured_image} alt="cover" />
        <div class="blog-content" dangerouslySetInnerHTML={{__html:${blog.body}}}></div>
    </div>
</div>`;

blogContainer.insertAdjacentHTML("afterbegin", blogMarkup);
  } catch (error) {
    alert(error);
  }
};

// This is a custom routing system.
const url = window.location.pathname;
const slugs = url.split("/");
if (slugs.includes("blog")) {
  fetchABlogPage();
} else {
  // localhost:1234
  fetchMainBlogPage();
}