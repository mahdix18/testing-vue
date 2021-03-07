<template >
  <section>
    <b-field label="email">
      <b-input
        native-type="email"
        value="test@test.com"
        v-model="email"
      ></b-input>
    </b-field>
    <b-field label="password">
      <b-input
        value="123"
        type="password"
        maxlength="30"
        v-model="password"
      ></b-input>
    </b-field>
    <div v-for="error in errors" v-bind:key="error">
      <b-message title="Error" type="is-danger">
        {{ error }}
      </b-message>
    </div>
    <b-button tag="input" type="is-primary" value="Submit" @click="login()" />
  </section>
</template>
<script>
import client from "../services/client";
export default {
  data() {
    return {
      email: "",
      password: "",
      message: "",
      errors: [],
    };
  },
  methods: {
    login() {
      client
        .login(this.email, this.password)
        .then((res) => {
          client.storage.setToken(res.data);
          this.$buefy.dialog.alert({
            title: "Success",
            message: "Great You are In",
          });
        })
        .catch(
          function (err) {
            this.errors = err.response.data.errors;
            this.$buefy.dialog.alert({
              title: "Error",
              message: this.message,
            });
            this.message = err.message;
          }.bind(this)
        );
    },
  },
  mounted() {},
};
</script>
<style lang="css">
</style>