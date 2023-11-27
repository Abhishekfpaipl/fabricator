<template>
    <nav class="navbar navbar-expand-lg top-brand p-0 border-top">
        <div class="container-fluid">
            <div class="navbar-nav d-flex flex-row w-100 justify-content-around ">
                <div class="nav-item" v-for="(link, linkIndex) in links" :key="linkIndex">
                    <router-link :to="link.path" class="nav-link">
                        <div class="d-flex flex-column align-items-center fw-bold">
                            <i class="bi" :class="link.icon"></i>
                            <div style="font-size: 0.75rem;">{{ link.name }}</div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'ProductionBottomnav',
    data() {
        return {
            links: [
                {
                    path: '/dashboard',
                    icon: ' bi-journals',
                    name: 'Job'
                },
                {
                    path: '/fabric-accepted',
                    icon: ' bi-stack',
                    name: 'Material'
                },
                {
                    path: '/cutting-department',
                    icon: ' bi-scissors',
                    name: 'Cutting'
                },
                {
                    path: '/production-department',
                    icon: ' bi-gear',
                    name: 'Production'
                },
                {
                    path: '/finishing-department',
                    icon: ' bi-send',
                    name: 'Send'
                },
            ]
        }
    },
    computed: {
        currentRoute() {
            return this.$route.name;
        }
    },
    // methods: {
    //     currentRouteName(routeName) {
    //         return this.$route.name.includes(routeName);
    //     }

    // }
}
</script>
<style>
.router-link-active.router-link-exact-active.nav-link{
    color:white;
}
</style>