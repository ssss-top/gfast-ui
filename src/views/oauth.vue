<template>   

</template>

<script>
import { Authorizer } from "@authorizerdev/authorizer-js"

const authorizerRef = new Authorizer({
  authorizerURL: process.env.VUE_APP_AUTHORIZER_URL,
  redirectURL: window.location.origin,
  clientID: process.env.VUE_APP_AUTHORIZER_CLIENT_ID,
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