<template>
    <nav class="navbar top-brand border-bottom">
        <div class="container-fluid">
            <span class="navbar-brand text-white">{{ pageTitle }}</span>
            <router-link to="/profile" class="text-dark">
                <i class="bi bi-person-fill text-white fs-5"></i>
            </router-link>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'BottomNav',
    data() {
        return {
            pageTitle: 'No Title',
        }
    },
    created() {
        this.setPageTitle(this.$route.name);
    },
    watch: {
        $route(newRoute) {
            this.setPageTitle(newRoute.name);
        },
    },
    methods: {
        setPageTitle(routeName) {
            this.pageTitle = routeName || 'No Title';
        },
    },
}
</script>
