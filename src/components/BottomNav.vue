<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary p-0">
        <div class="container-fluid">
            <div class="navbar-nav d-flex flex-row w-100 justify-content-around">
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

    <!-- <div class="d-flex justify-content-evenly align-items-center bg-light w-100"
        style="position:fixed;bottom: 0;height:65px;box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;">

        <router-link to="/" :class="{ 'text-danger': currentRoute === 'home' }" class="text-decoration-none">
            <div class="d-flex flex-column align-items-center">
                <i class="bi bi-shop-window fs-3"></i>
                <p class="m-0" style="font-size:12px ;">Order</p>
            </div>
        </router-link>


        <router-link to="/fabric-accepted" :class="{ 'text-danger': currentRoute === 'Order Page' }"
            class="text-decoration-none ">
            <div class="d-flex flex-column align-items-center">
                <i class="bi bi-person fs-3"></i>
                <p class="m-0" style="font-size:12px ;">Fabric</p>
            </div>
        </router-link>

        <router-link to="/cutting-department" :class="{ 'text-danger': currentRoute === 'Cutting Department' }"
            class="text-decoration-none ">
            <div class="d-flex flex-column align-items-center">
                <i class="bi bi-scissors fs-3"></i>
                <p class="m-0" style="font-size:12px ;">Cutting</p>
            </div>
        </router-link>

        <router-link to="/production-department" :class="{ 'text-danger': currentRoute === 'Production Page' }"
            class="text-decoration-none ">
            <div class="d-flex flex-column align-items-center">
                <i class="bi bi-person fs-3"></i>
                <p class="m-0" style="font-size:12px ;">Production</p>
            </div>
        </router-link>

        <router-link to="/finishing-department" :class="{ 'text-danger': currentRoute === 'Finishing Page' }"
            class="text-decoration-none ">
            <div class="d-flex flex-column align-items-center">
                <i class="bi bi-gear fs-3"></i>
                <p class="m-0" style="font-size:12px ;">Finishing</p>
            </div>
        </router-link>

    </div> -->
</template>

<script>
export default {
    name: 'ProductionBottomnav',
    data() {
        return {
            links: [
                {
                    path: '/',
                    icon: ' bi-shop-window',
                    name: 'Order'
                },
                {
                    path: '/fabric-accepted',
                    icon: ' bi-person',
                    name: 'Fabric'
                },
                {
                    path: '/cutting-department',
                    icon: ' bi-scissors',
                    name: 'Cutting'
                },
                {
                    path: '/production-department',
                    icon: ' bi-person',
                    name: 'Production'
                },
                {
                    path: '/finishing-department',
                    icon: ' bi-gear',
                    name: 'Finishing'
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
    color:red;
}
</style>