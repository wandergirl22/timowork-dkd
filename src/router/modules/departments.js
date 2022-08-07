import Layout from '@/layout'
export default {
  path: '/departments',
  component: Layout,
  meta: { title: '点位管理', icon: 'PT' },
  children: [
    {
      path: '',
      component: () => import('@/views/departments/components/business'),
      meta: { title: '运营工单' }
    },
    {
      path: '/departments/operation',
      component: () => import('@/views/departments/components/operation'),
      meta: { title: '运维工单' }
    }
  ]
}
