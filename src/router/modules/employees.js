import Layout from "@/layout";
export default {
  path: "/employees",
  component: Layout,
  meta: { title: "设备管理", icon: "device" },
  children: [
    {
     path:'',
     component:() => import('@/views/employees/components/business'),
     meta: { title: "运营工单",  },
    },
    {
      path:'/employees/operation',
      component:() => import('@/views/employees/components/operation'),
      meta: { title: "运维工单",},
    },
] 
};
