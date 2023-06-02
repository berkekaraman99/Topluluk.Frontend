import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("@/views/LoginView/LoginView.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/HomeView/HomeView.vue"),
    },
    {
      path: "/communities",
      name: "communities",
      component: () => import("@/views/CommunityView/CommunitiesView.vue"),
    },
    {
      path: "/community/:id/:name",
      name: "communitydetails",
      component: () =>
        import("@/views/CommunityDetailsView/CommunityDetailsView.vue"),
      props: true,
    },
    {
      path: "/event/:id",
      name: "eventdetails",
      component: () => import("@/views/EventDetailsView/EventDetailsView.vue"),
      props: true,
    },
    {
      path: "/post/:id",
      name: "postcomments",
      component: () => import("@/views/PostCommentsView/PostCommentsView.vue"),
      props: true,
    },
    {
      path: "/profile/:id",
      name: "userprofile",
      component: () => import("@/views/UserProfileView/UserProfile.vue"),
      props: true,
    },
    {
      path: "/events",
      name: "events",
      component: () => import("@/views/EventsView/EventsView.vue"),
    },

    {
      path: "/signup",
      name: "signup",
      component: () => import("@/views/SignUpView/SignUpView.vue"),
    },
    {
      path: "/search",
      name: "search",
      component: () => import("@/views/SearchView/SearchView.vue"),
    },
    {
      path: "/createcommunity",
      name: "createCommunity",
      component: () =>
        import("@/views/CreateCommunityView/CreateCommunityView.vue"),
    },
    {
      path: "/create-event",
      name: "createEvent",
      component: () => import("@/views/CreateEventView/CreateEvent.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/ProfileView/ProfileView.vue"),
    },
    {
      path: "/profile-settings",
      name: "profileSettings",
      component: () => import("@/views/SettingsView/SettingsView.vue"),
    },
    {
      path: "/createpost",
      name: "createPost",
      component: () => import("@/views/CreatePostView/CreatePostView.vue"),
    },
    {
      path: "/chat",
      name: "chat",
      component: () => import("@/views/ChatView/ChatVue.vue"),
    },
    {
      path: "/forget-password",
      name: "forgetpassword",
      component: () =>
        import("@/views/ResetPasswordView/ResetPasswordView.vue"),
    },
    //catch all 404
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: () => import("@/views/PageNotFound/NotFound.vue"),
    },
    //Test
    {
      path: "/test",
      name: "test",
      component: () => import("@/views/TestView/TestView.vue"),
    },
  ],
});

export default router;
