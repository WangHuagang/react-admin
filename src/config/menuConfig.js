const menuList = [
    {
        key: '/home',
        icon: 'home',
        title: '首页'
    },
    {
        key: '/products',
        icon: 'home',
        title: '商品',
        children: [
            {
                key: '/category',
                icon: 'home',
                title: '分类管理',
            },
            {
                key: '/product',
                icon: 'home',
                title: '商品管理',
            }
        ]
    },
    {
        key: '/user',
        icon: 'user',
        title: '用户管理'
    },
    {
        key: '/role',
        icon: 'user',
        title: '角色管理'
    },
]

export default menuList;