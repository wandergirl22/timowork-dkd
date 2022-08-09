import Layout from "@/layout";
export default {
  path: "/report/index",
  component: Layout,
  children: [
    {
      path: "",
      component: () => import("@/views/social"),
      meta: { title: "对账统计", icon: "statistical" },
    },
  ],
};
