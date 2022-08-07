import Layout from '@/layout'
export default {
  path: '/approvals',
  component: Layout,
  meta: { title: '工单管理', icon: 'work_order' },
  children: [
    {
      path: '',
      component: () => import('@/views/approvals/components/business'),
      meta: { title: '运营工单' }
    },
    {
      path: '/approvals/operation',
      component: () => import('@/views/approvals/components/operation'),
      meta: { title: '运维工单' }
    }
  ]
}
