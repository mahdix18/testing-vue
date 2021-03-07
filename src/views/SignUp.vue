<template lang="">
  <section>
        <b-field label="Email">
            <b-input 
                native-type="email"
                value="test@test.com"
                v-model="email"
            ></b-input>
        </b-field>
        <b-field label="Country">
            <b-input 
               
                value="test@test.com"
                v-model="country"
            ></b-input>
        </b-field>
        <b-field label="Address">
            <b-input 
           
                value="test@test.com"
                v-model="address"
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
    <b-field label="password_confirmation">
      <b-input 
        value="123"
        type="password"
        maxlength="30"
        v-model="password_confirmation"
      ></b-input>
    </b-field>
   <div v-for="error in errors" v-bind:key="error">
    <b-message 
    
      title="Error"
      type="is-danger"
      
    >
      {{ error }}
    </b-message>
    </div> 
<b-button tag="input" type="is-primary" value="Submit" @click="signUp()" />
  </section>




</template>
<script>
import client from "../services/client";
export default {
  data() {
    return {
      email: "user1@mail.com",
      country: "Italy",
      address: "Via solfatara Napoli",
      password: "PassWord12345",
      password_confirmation: "PassWord12345",
      message: "",
      errors: [],
    };
  },
  methods: {
    signUp() {
      client
        .signUp(this)
        .then((res) => {
          this.$buefy.dialog.alert({
            title: "Success",
            message: "Welcome In our World",
          });
          client.storage.setToken(res.data);
        })
        .catch(
          function (err) {
            this.$buefy.dialog.alert({
              title: "Error",
              message: this.message,
            });
            this.errors = err.response.data.errors;
            this.message = err.message;
          }.bind(this)
        );
    },
  },
  mounted() {},
};
</script>
