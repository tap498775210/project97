import Search from "./components/Search"

/* This file is for all of the routes needed for main views and sidebar navigation.
Any changes made here will affect all places reliant on the following routes array.
To include routes array, import routes from "./routes" (path to this file may change)
 */

const routes = [
    {
      path: "/search",
      sidebar: () => <div>search!</div>,
      main: () => <Search />
    },

  ];

export default routes;