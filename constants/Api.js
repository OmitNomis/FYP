// const BaseUrl = "http://100.64.239.14:3000/";
const BaseUrl = "http://192.168.1.65:3000/"; //home

//login
const Login = BaseUrl + "api/login";
//register
const Register = BaseUrl + "api/register";
//users
const GetAllUsers = BaseUrl + "api/users";
const GetUserById = BaseUrl + "api/users";
const UpdateUser = BaseUrl + "api/users/updateuser";
const DeleteUser = BaseUrl + "api/users/deleteuser";
const ChangePassword = BaseUrl + "api/users/changePassword";
//book
const AddPost = BaseUrl + "api/book/add";
const DeletePost = BaseUrl + "api/book/deletePost";
const SoldPost = BaseUrl + "api/book/sold";
const BookmarkPost = BaseUrl + "api/book/bookmarkPost";
const DeleteBookmark = BaseUrl + "api/book/deleteBookmark";
const GetBookmarks = BaseUrl + "api/book/getBookmarks";
const PostById = BaseUrl + "api/book/getPostById";
const GetSoldPosts = BaseUrl + "api/book/getSoldPosts";
const GetAllPosts = BaseUrl + "api/book/getPosts";
const GetGenres = BaseUrl + "api/book/getGenres";
const GetPostGenre = BaseUrl + "api/book/getPostGenre";
const GetPostsByUser = BaseUrl + "api/book/getPostsByUser";
const GetChat = BaseUrl + "api/chat/get";
const GetChatList = BaseUrl + "api/chat/existingChat";
const AddComment = BaseUrl + "api/book/addComment";
const GetPostComments = BaseUrl + "api/book/getPostComments";

export default {
  Login,
  Register,
  AddComment,
  GetAllUsers,
  GetUserById,
  UpdateUser,
  DeleteUser,
  AddPost,
  DeletePost,
  SoldPost,
  BookmarkPost,
  DeleteBookmark,
  GetBookmarks,
  PostById,
  GetSoldPosts,
  GetAllPosts,
  GetGenres,
  GetPostGenre,
  BaseUrl,
  GetChat,
  ChangePassword,
  GetChatList,
  GetPostComments,
  GetPostsByUser,
};
