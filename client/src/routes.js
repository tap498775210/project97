// import LoginForm from "./components/LoginForm";
// import Register from "./components/Register";
// import Question from "./components/Question";
import User from "./components/userProfile";
import Search from "./components/Search";
// import App from "./App";


/* This file is for all of the routes needed for main views and sidebar navigation.
Any changes made here will affect all places reliant on the following routes array.
To include routes array, import routes from "./routes" (path to this file may change)
 */

const routes = [
    // {
    //   path: "/",                        // The redirection path when clicking the link in the sidebar
    //   exact: true,                      // Match the exact path
    //   sidebar: () => <div>home!</div>,  // fixed issue where it would not display message, typo found in <Switch> below   // Thanks a lot!
    //   main: () => <LoginForm setUsername={this.setUsername}/>         // What shown on the main section when on that path
    // },
//<<<<<<< HEAD
//    {
//      path: "/register",
//      sidebar: () => <div>Register your account!</div>,
//      main: () => <Register />
//    },
// =======
    // {
    //   path: "/register",
    //   sidebar: () => <div>reg!</div>,
    //   main: () => <Register />
    // },
// >>>>>>> 7f4c94d0a85a6b06897a3cd215257da2dfa011b7
    // {
    //   path: "/questionAPI",
    //   sidebar: () => <div>posts!</div>,
    //   main: () => <Question />
    // },
    {
      path: "/search",
      sidebar: () => <div>Search for post using keyword!</div>,
      main: () => <Search />
    },
    // {
    //     path: "/user/:name",
    //     sidebar: () => <div>Show and update your profile!</div>,
    //     main: () => <User userId={this.state.userId}/>
    // }
    // {  // TODO? user profile
    //   path: "/profile",
    //   sidebar: () => <div>user profile</div>,
    //   main: () => <TBA />
    // }
  ];

export default routes;