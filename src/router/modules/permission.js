import Layout from "@/layout";
export default {
  path: "/permission",
  component: Layout,
  meta: { title: "人员管理", icon: "people" },
  children: [
    {
     path:'',
     component:() => import('@/views/permission/components/business'),
     meta: { title: "运营工单",  },
    },
    {
      path:'/permission/operation',
      component:() => import('@/views/permission/components/operation'),
      meta: { title: "运维工单",},
    },
] 
};
