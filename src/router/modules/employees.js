import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  meta: { title: '设备管理', icon: 'device' },
  children: [
    {
      path: '',
      component: () => import('@/views/employees/components/business'),
      meta: { title: '设备管理' }
    },
    {
      path: '/employees/operation',
      component: () => import('@/views/employees/components/operation'),
      meta: { title: '设备状态' }
    },
    {
      path: '/employees/deviceType',
      component: () => import('@/views/employees/components/deviceType'),
      meta: { title: '设备类型管理' }
    }
  ]
}
