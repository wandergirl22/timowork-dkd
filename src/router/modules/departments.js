import Layout from '@/layout'
export default {
  path: '/node',
  component: Layout,
  meta: { title: '点位管理', icon: 'PT' },
  children: [
    {
      path: '/node/region',
      component: () => import('@/views/departments/components/region'),
      meta: { title: '区位管理' }
    },
    {
      path: '/node/node',
      component: () => import('@/views/departments/components/node'),
      meta: { title: '点位管理' }
    },
    {
      path: '/node/partner',
      component: () => import('@/views/departments/components/partner'),
      meta: { title: '合作商管理' }
    }
  ]
}
