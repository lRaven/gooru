//* cabinet


import TheRates from "@/components/Cabinet/Pages/TheRates";
import TheAppeals from "@/components/Cabinet/Pages/TheAppeals";
import TheAppeal from "@/components/Cabinet/Pages/TheAppeal";

import TheParsources from "@/components/Cabinet/Pages/TheParsources";
import TheParsource from "@/components/Cabinet/Pages/TheParsource";

import TheFavorites from "@/components/Cabinet/Pages/TheFavorites";

import TheProfile from "@/components/Cabinet/Pages/TheProfile";

import TheNewParser from "@/components/Cabinet/Pages/TheNewParser";

//* admin pages
import TheUsers from "@/components/Cabinet/Pages/TheUsers";


const userRoutes = {
  
  redirect: { name: "rates" },
  children: [
    {
      path: "rates",
      name: "rates",
      component: TheRates,
      meta: {
        title: "Тарифы",
        requiresAuth: true,
      },
    },
    {
      path: "appeals",
      name: "appeals",
      component: TheAppeals,
      meta: {
        title: "Обращения",
        requiresAuth: true,
      },
    },
    {
      path: "appeal",
      name: "appeal",
      component: TheAppeal,
      meta: {
        title: "Обращение",
        requiresAuth: true,
      },
    },
    {
      path: "parsources",
      name: "parsources",
      component: TheParsources,
      meta: {
        title: "Мои парсеры",
        requiresAuth: true,
      },
    },
    {
      path: "parsource/:id",
      name: "parsource",
      component: TheParsource,
      meta: {
        title: "Парсер",
        requiresAuth: true,
      },
    },
    {
      path: "favorites",
      name: "favorites",
      component: TheFavorites,
      meta: {
        title: "Избранное",
        requiresAuth: true,
      },
    },
    {
      path: "profile",
      name: "profile",
      component: TheProfile,
      meta: {
        title: "Мой профиль",
        requiresAuth: true,
      },
    },
    {
      path: "new_parser",
      name: "new_parser",
      component: TheNewParser,
      meta: {
        title: "Новый парсинг",
        requiresAuth: true,
      },
    },
  ],
};

const managerRoutes = {
    redirect: { name: 'appeals'},
    children: [
        {
            path: 'appeals',
            name: 'appeals',
            component: TheAppeals,
            meta: {
                title: 'Обращения',
                requiresAuth: true,
            },
        },
        {
            path: 'appeal',
            name: 'appeal',
            component: TheAppeal,
            meta: {
                title: 'Обращение',
                requiresAuth: true,
            },
        },
        {
            path: 'parsources',
            name: 'parsources',
            component: TheParsources,
            meta: {
                title: 'Все парсеры',
                requiresAuth: true,
            },
        },
        {
            path: 'parsource/:id',
            name: 'parsource',
            component: TheParsource,
            meta: {
                title: 'Парсер',
                requiresAuth: true,
            },
        },
        {
            path: 'profile',
            name: 'profile',
            component: TheProfile,
            meta: {
                title: 'Мой профиль',
                requiresAuth: true,
            },
        },
        {
            path: 'new_parser',
            name: 'new_parser',
            component: TheNewParser,
            meta: {
                title: 'Новый парсинг',
                requiresAuth: true,
            },
        },
        {
            path: 'users',
            name: 'users',
            component: TheUsers,
            meta: {
                title: 'Пользователи',
                requiresAuth: true,
            },
        },
    ],
};

const adminRoutes = 	{
   
    redirect: { name: 'users'},
    children: [
        {
            path: 'appeals',
            name: 'appeals',
            component: TheAppeals,
            meta: {
                title: 'Обращения',
                requiresAuth: true,
            },
        },
        {
            path: 'appeal',
            name: 'appeal',
            component: TheAppeal,
            meta: {
                title: 'Обращение',
                requiresAuth: true,
            },
        },
        {
            path: 'parsources',
            name: 'parsources',
            component: TheParsources,
            meta: {
                title: 'Все парсеры',
                requiresAuth: true,
            },
        },
        {
            path: 'parsource/:id',
            name: 'parsource',
            component: TheParsource,
            meta: {
                title: 'Парсер',
                requiresAuth: true,
            },
        },
        {
            path: 'profile',
            name: 'profile',
            component: TheProfile,
            meta: {
                title: 'Мой профиль',
                requiresAuth: true,
            },
        },
        {
            path: 'new_parser',
            name: 'new_parser',
            component: TheNewParser,
            meta: {
                title: 'Новый парсинг',
                requiresAuth: true,
            },
        },
        {
            path: 'users',
            name: 'users',
            component: TheUsers,
            meta: {
                title: 'Пользователи',
                requiresAuth: true,
            },
        },
    ],
};

export { userRoutes, managerRoutes, adminRoutes };
