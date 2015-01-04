var posts = [
  {
    status: "This is a status",
    likes: 5,
    likedByMe: false,
    id: 0,
    comments: [{
      comment: "hello world",
      id: 0
    }]
  },
  {
    status: "This is another status",
    likes: 8,
    likedByMe: true,
    id: 1,
    comments: []
  }
];

var onLoad = function() {
  displayAllPosts();
};

var createPost = function(post) {
  postObj = {
    status: post,
    likes: 0,
    likedByMe: false,
    id: posts.length,
    comments: []
  };
  posts.push(postObj);
  refreshPosts();
};

var likePost = function(postId) {
  if (posts[postId].likedByMe){
    posts[postId].likedByMe = false;
    posts[postId].likes--;
  }
  else{
    posts[postId].likedByMe = true;
    posts[postId].likes++;
  }
  refreshPosts();
};

var addComment = function(postId, comment) {
  console.log(postId, comment);
  posts[postId].comments.push(comment);
  comment = {
    comment: comment
  }
  displayComment(postId,comment);
};

var shortText = false;

var toggleShortText = function() {
  if (shortText)
    shortText = false;
  else
    shortText = true;
  refreshPosts();
};

var refreshPosts = function(){
  clearPosts();
  displayAllPosts();
}

var displayAllPosts = function () {
  for (var x=posts.length-1; x >= 0; x--) {
    var post = posts[x];
    if (shortText && post.status.length > 50)
      post.status = post.status.substr(0,46) + "...";
    displayPost(post);
    for (var y=0; y < post.comments.length; y++){
      displayComment(post.id, post.comments[y]);
    }
  }
}