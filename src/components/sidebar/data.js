import {
  FaHeart,
  FaGamepad,
  FaUsers,
  FaCalendarAlt,
  FaRegClock,
  FaCalendarWeek,
  FaRegCalendarPlus,
  FaChartBar,
  FaStar,
  FaRegListAlt,
  FaDesktop,
  FaPlaystation,
  FaXbox,
} from "react-icons/fa";

export const sidebarData = [
  {
    label: "Home",
    subCategories: [
      {
        label: "Wishlist",
        icon: FaHeart,
        route: "/my-wishlist",
      },
      {
        label: "My Library",
        icon: FaGamepad,
        route: "/my-library",
      },

      {
        label: "All Games",
        icon: FaGamepad,
        route: "/all-games",
      },
      {
        label: "People You Follow",
        icon: FaUsers,
        route: "/following",
      },
    ],
  },
  {
    label: "Chart",
    subCategories: [
      {
        label: "New Releases",
        icon: FaCalendarAlt,
        route: "/new-releases",
      },

      {
        label: "This Week",
        icon: FaCalendarWeek,
        route: "/browse",
      },
      {
        label: "Top",
        icon: FaChartBar,
        route: "/top",
      },
      {
        label: "Best of the Year",
        icon: FaStar,
        route: "/best-of-the-year",
      },
      {
        label: "Popular in 2022",
        icon: FaRegListAlt,
        route: "/popular-in-2022",
      },
    ],
  },
  {
    label: "Platforms",
    subCategories: [
      {
        label: "PC",
        icon: FaDesktop,
        route: "pc",
      },
      {
        label: "PlayStation 4",
        icon: FaPlaystation,
        route: "ps4",
      },
      {
        label: "Xbox One",
        icon: FaXbox,
        route: "xbox-one",
      },
    ],
  },
];
