const BaseUrl = "http://192.168.1.65:3000/";
const Login = BaseUrl + "api/login";

const Register = BaseUrl + "api/register";

const GetAllUsers = BaseUrl + "api/users";
const GetUserById = BaseUrl + "api/users/:id";
const UpdateUser = BaseUrl + "api/users/updateuser";
const DeleteUser = BaseUrl + "api/users/deleteuser";

const AddPost = BaseUrl + "api/book/add";
const DeletePost = BaseUrl + "api/book/delete";
const SoldPost = BaseUrl + "api/book/sold";
const BookmarkPost = BaseUrl + "api/book/bookmarkPost";
const DeleteBookmark = BaseUrl + "api/book/deleteBookmark";
const GetBookmarks = BaseUrl + "api/book/getBookmarks/:id";
const PostById = BaseUrl + "api/book/getPostById/:id";
const GetSoldPosts = BaseUrl + "api/book/getSoldPosts/:id";
const GetAllPosts = BaseUrl + "api/book/getPosts";
const GetGenres = BaseUrl + "api/book/getGenres";

export default {
  Login,
  Register,
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
};
