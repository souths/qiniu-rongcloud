import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/home'
import add from '@/components/add'
import us from '@/components/us'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '',
    name: 'World',
    component: HelloWorld,
    //redirect: '/adds',
    children: [{
        path: '/adds',
        name: 'add',
        component: add,
        redirect:'/adds/us',
        children: [{
          path: '/adds/us',
          name: 'us',
          component: us,
        }]
      },
      {
        path: 'homes',
        name: 'home',
        component: Home
      }
    ]
  }]
})
