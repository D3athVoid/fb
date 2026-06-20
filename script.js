// ============================================================
// Data
// ============================================================
const STORIES = [
  { name: "Mara Llamas",   av: "ML", color: "#7C5CFF", g1: "#D8CCFF", g2: "#7C5CFF" },
  { name: "Jon Reyes",     av: "JR", color: "#FF6B4A", g1: "#FFD7C2", g2: "#FF6B4A" },
  { name: "Tina Cruz",     av: "TC", color: "#2EBFA5", g1: "#C6F2E8", g2: "#2EBFA5" },
  { name: "Paolo Diaz",    av: "PD", color: "#F7B928", g1: "#FFEFC2", g2: "#F7B928" },
  { name: "Liz Santos",    av: "LS", color: "#F02849", g1: "#FFD2D9", g2: "#F02849" },
  { name: "Ren Aquino",    av: "RA", color: "#1877F2", g1: "#C2DBFF", g2: "#1877F2" },
];

const CONTACTS = [
  { name: "Mara Llamas", av: "ML", color: "#7C5CFF", online: true },
  { name: "Jon Reyes",   av: "JR", color: "#FF6B4A", online: true },
  { name: "Tina Cruz",   av: "TC", color: "#2EBFA5", online: false },
  { name: "Paolo Diaz",  av: "PD", color: "#F7B928", online: true },
  { name: "Liz Santos",  av: "LS", color: "#F02849", online: false },
  { name: "Ren Aquino",  av: "RA", color: "#1877F2", online: true },
  { name: "Kai Bautista",av: "KB", color: "#45BD62", online: false },
];

let posts = [
  {
    id: 4,
    author: "Tina Cruz", av: "TC", color: "#2EBFA5",
    time: "5h", audience: "🌐",
    text: "Three coffees deep and finally untangled that merge conflict. Anyone else's Saturday looking like this? ☕",
    image: null,
    liked: false, likeCount: 12,
    comments: [
      { author: "Jon Reyes", text: "Felt this in my soul" }
    ]
  },
  {
    id: 3,
    author: "Paolo Diaz", av: "PD", color: "#F7B928",
    time: "8h", audience: "👥",
    text: "Caught the sunrise at the ridge this morning. Worth the early alarm.",
    image: { g1: "#FFEFC2", g2: "#F59E0B" },
    liked: true, likeCount: 38,
    comments: [
      { author: "Liz Santos", text: "This is gorgeous!!" },
      { author: "Ren Aquino", text: "Where is this exactly?" }
    ]
  },
  {
    id: 2,
    author: "Liz Santos", av: "LS", color: "#F02849",
    time: "1d", audience: "🌐",
    text: "Finished the half marathon in 1:52! Knees are filing a formal complaint but I'd do it again.",
    image: { g1: "#FFD2D9", g2: "#F02849" },
    liked: false, likeCount: 64,
    comments: []
  },
  {
    id: 1,
    author: "Ren Aquino", av: "RA", color: "#1877F2",
    time: "2d", audience: "👥",
    text: "Reminder that \"it works on my machine\" is not a deployment strategy.",
    image: null,
    liked: false, likeCount: 21,
    comments: [
      { author: "Tina Cruz", text: "screenshotting this for the team channel" }
    ]
  },
];
let nextPostId = 5;

// ============================================================
// Rendering
// ============================================================
function renderStories() {
  const row = document.getElementById("storiesRow");
  const addCard = `
    <div class="story-card is-add">
      <div class="story-add-icon">+</div>
      <p class="story-add-label">Create story</p>
    </div>`;
  const cards = STORIES.map(s => `
    <div class="story-card" style="--g1:${s.g1};--g2:${s.g2}">
      <span class="story-avatar" style="--av:${s.color}">${s.av}</span>
      <span class="story-name">${s.name}</span>
    </div>`).join("");
  row.innerHTML = addCard + cards;
}

function renderContacts() {
  const list = document.getElementById("contactsList");
  list.innerHTML = CONTACTS.map(c => `
    <div class="contact-item">
      <span class="contact-avatar-wrap">
        <span class="avatar avatar-sm" style="--av:${c.color}">${c.av}</span>
        <span class="status-dot ${c.online ? "" : "is-offline"}"></span>
      </span>
      <span>${c.name}</span>
    </div>`).join("");
}

function likeIcon(filled) {
  return filled
    ? `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.6-10-9.3C.4 8.4 2 5 5.4 5 7.6 5 9.2 6.1 12 9c2.8-2.9 4.4-4 6.6-4C22 5 23.6 8.4 22 11.7 19.5 16.4 12 21 12 21z"/></svg>`
    : `<svg viewBox="0 0 24 24" fill="none"><path d="M12 21s-7.5-4.6-10-9.3C.4 8.4 2 5 5.4 5 7.6 5 9.2 6.1 12 9c2.8-2.9 4.4-4 6.6-4C22 5 23.6 8.4 22 11.7 19.5 16.4 12 21 12 21z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`;
}

function renderPost(post) {
  const commentsHtml = post.comments.map(c => `
    <div class="comment">
      <span class="avatar avatar-sm" style="--av:#9AA0A6;width:32px;height:32px;font-size:12px">${c.author.split(" ").map(w=>w[0]).join("")}</span>
      <div class="comment-bubble"><span class="comment-author">${c.author}</span>${c.text}</div>
    </div>`).join("");

  return `
    <article class="post" data-id="${post.id}">
      <div class="post-head">
        <span class="avatar avatar-md" style="--av:${post.color}">${post.av}</span>
        <div class="post-head-text">
          <p class="post-author">${post.author}</p>
          <p class="post-meta"><span>${post.time}</span><span>·</span><span>${post.audience}</span></p>
        </div>
        <button class="post-more">⋯</button>
      </div>

      <p class="post-text">${post.text}</p>
      ${post.image ? `<div class="post-image" style="--g1:${post.image.g1};--g2:${post.image.g2}"></div>` : ""}

      <div class="post-stats">
        <span class="post-likes">
          <span class="like-dot">👍</span>
          <span class="like-count">${post.likeCount}</span>
        </span>
        <span class="comment-count">${post.comments.length} comment${post.comments.length === 1 ? "" : "s"}</span>
      </div>

      <div class="post-actions">
        <button class="post-action like-btn ${post.liked ? "is-liked" : ""}">
          ${likeIcon(post.liked)} <span>Like</span>
        </button>
        <button class="post-action comment-toggle">
          <svg viewBox="0 0 24 24" fill="none"><path d="M21 12c0 4.4-4 8-9 8-1.2 0-2.4-.2-3.4-.6L3 21l1.7-4.6C3.6 15 3 13.6 3 12c0-4.4 4-8 9-8s9 3.6 9 8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>
          <span>Comment</span>
        </button>
        <button class="post-action">
          <svg viewBox="0 0 24 24" fill="none"><path d="M4 12l8-8v4c6 0 9 3 9 9-2-2.5-5-3.5-9-3.5V17z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>
          <span>Share</span>
        </button>
      </div>

      <div class="comments">${commentsHtml}</div>

      <div class="comment-input-row">
        <span class="avatar avatar-sm" style="--av:#7C5CFF;width:32px;height:32px;font-size:12px">YO</span>
        <input type="text" placeholder="Write a comment..." class="comment-input">
      </div>
    </article>`;
}

function renderPosts() {
  const container = document.getElementById("postsContainer");
  const feedEnd = document.getElementById("feedEnd");
  const q = (document.getElementById("searchInput").value || "").trim().toLowerCase();

  const filtered = q
    ? posts.filter(p => p.text.toLowerCase().includes(q) || p.author.toLowerCase().includes(q))
    : posts;

  if (filtered.length === 0) {
    container.innerHTML = "";
    feedEnd.hidden = false;
  } else {
    feedEnd.hidden = true;
    container.innerHTML = filtered.map(renderPost).join("");
  }
}

// ============================================================
// Interactions — delegated on the posts container
// ============================================================
function setupPostInteractions() {
  const container = document.getElementById("postsContainer");

  container.addEventListener("click", (e) => {
    const postEl = e.target.closest(".post");
    if (!postEl) return;
    const id = Number(postEl.dataset.id);
    const post = posts.find(p => p.id === id);

    if (e.target.closest(".like-btn")) {
      post.liked = !post.liked;
      post.likeCount += post.liked ? 1 : -1;
      renderPosts();
    } else if (e.target.closest(".comment-toggle")) {
      postEl.querySelector(".comment-input")?.focus();
    }
  });

  container.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const input = e.target.closest(".comment-input");
    if (!input || !input.value.trim()) return;
    const postEl = e.target.closest(".post");
    const id = Number(postEl.dataset.id);
    const post = posts.find(p => p.id === id);
    post.comments.push({ author: "You", text: input.value.trim() });
    renderPosts();
  });
}

// ============================================================
// Composer — create a new post
// ============================================================
function setupComposer() {
  const input = document.getElementById("composerInput");
  const postBtn = document.getElementById("postBtn");

  input.addEventListener("input", () => {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 120) + "px";
  });

  postBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;
    posts.unshift({
      id: nextPostId++,
      author: "You", av: "YO", color: "#7C5CFF",
      time: "Just now", audience: "🌐",
      text, image: null,
      liked: false, likeCount: 0,
      comments: []
    });
    input.value = "";
    input.style.height = "auto";
    renderPosts();
  });
}

// ============================================================
// Top nav active state
// ============================================================
function setupTopNav() {
  const nav = document.getElementById("topNav");
  nav.addEventListener("click", (e) => {
    const btn = e.target.closest(".nav-icon");
    if (!btn) return;
    nav.querySelectorAll(".nav-icon").forEach(b => b.classList.toggle("is-active", b === btn));
  });
}

// ============================================================
// Search
// ============================================================
function setupSearch() {
  document.getElementById("searchInput").addEventListener("input", renderPosts);
}

// ============================================================
// Notification badge — clears on click
// ============================================================
function setupBadges() {
  document.getElementById("notifBtn").addEventListener("click", () => {
    document.getElementById("notifBadge").style.display = "none";
  });
}

// ============================================================
// Init
// ============================================================
renderStories();
renderContacts();
renderPosts();
setupPostInteractions();
setupComposer();
setupTopNav();
setupSearch();
setupBadges();
