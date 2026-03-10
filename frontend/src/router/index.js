import Vue from "vue";
import VueRouter from "vue-router";
import registrationPage from '@/features/registration/views/registrationPage.vue'

Vue.use(VueRouter)

const mode = 'history'
const routes = [
    {path:'/', name:'Registration', component: registrationPage},
]

export default new VueRouter({
    mode: mode,
    routes: routes
})