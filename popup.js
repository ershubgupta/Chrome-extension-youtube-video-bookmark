const videoUrlContainer = document.getElementById("yt-video-list");
const childNode = (ele) => {
  const newNode = document.createElement("div");
  newNode.classList.add("yt-video-url");
  newNode.innerHTML = `<a href="${ele.url}">${ele.title}</a>`;
  newNode.addEventListener("click", openUrl);
  videoUrlContainer.appendChild(newNode);
};

const openUrl = (e) => {
  e.preventDefault();
  const targetUrl = e.target.href;
  chrome.tabs.update({ url: targetUrl });
};

chrome.storage.local.get(["bookmarkedVideos"], (result) => {
  const videoList = result.bookmarkedVideos;
  videoList?.map((item) => {
    childNode(item);
  });
});

const bookmarkVideo = () => {
  console.log("button hit")
  chrome.runtime.sendMessage({ action: "bookmark" }, (resposne) => {
    console.log("message recieved");
    childNode(resposne);
  });
};

const bookmarkBtn = document.getElementById("yt-save-btn");
bookmarkBtn.addEventListener("click", bookmarkVideo);