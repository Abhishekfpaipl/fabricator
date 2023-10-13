<template>
    <nav class="navbar bg-body-tertiary shadow">
        <div class="container-fluid">
            <span class="navbar-brand">{{ pageTitle }}</span>
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
