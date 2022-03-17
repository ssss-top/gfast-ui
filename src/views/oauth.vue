<template>   

</template>

<script>
import { Authorizer } from "@authorizerdev/authorizer-js"

const authorizerRef = new Authorizer({
  authorizerURL: `http://localhost:8080`,
  redirectURL: window.location.origin,
  clientID: "",
});

export default {
    data() {
        return {
            loading: false,
            redirect: undefined
        }
    },
    created() {
        this.onLoad();
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    async onLoad() {
        const res = await authorizerRef.browserLogin();
        if (res && res.user) {
            this.$store
            .dispatch("LoginForOauth", res.access_token)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
            })
            .catch(() => {
              this.loading = false;
            });
        } 

		}
  }
}
</script>