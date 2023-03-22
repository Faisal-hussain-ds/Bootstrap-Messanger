<template>
  <div class="container">
    <div class="row align-items-center justify-content-center min-vh-100 gx-0">
      <div class="col-12 col-md-5 col-lg-4">
        <div class="card card-shadow border-0">
          <div class="card-body">
            <div class="row g-6">
              <div class="col-12">
                <div class="text-center">
                  <h3 class="fw-bold mb-2">Sign In</h3>
                  <p>Login to your account</p>
                </div>
              </div>

              <div class="col-12">
                <div class="form-floating">
                  <input
                    type="email"
                    v-model="email"
                    class="form-control"
                    id="signin-email"
                    placeholder="Email"
                  />
                  <label for="signin-email">Email</label>
                </div>
              </div>

              <div class="col-12">
                <div class="form-floating">
                  <input
                    type="password"
                    class="form-control"
                    id="signin-password"
                    placeholder="Password"
                    v-model="password"
                  />
                  <label for="signin-password">Password</label>
                </div>
              </div>

              <div class="col-12">
                <button
                  class="btn btn-block btn-lg btn-primary w-100"
                  type="submit"
                  @click="login($event)"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Text -->
        <!-- <div class="text-center mt-8">
          <p>Don't have an account yet? <a href="./signup.html">Sign up</a></p>
          <p><a href="./password-reset.html">Forgot Password?</a></p>
        </div> -->
      </div>
    </div>
    <!-- / .row -->
  </div>
</template>

<script>
import { mapState, mapMutations , useStore } from "vuex";

import axios from "axios";
export default {
  name: "LoginPage",
  setup() {
    const store = useStore();
    return {
      email: "",
      password: "",
      token: store.user,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations(["setLoginResponse"]),
    login(event) {
      var thiss = this;

      event.preventDefault();
      axios
        .post("http://localhost:4001/login", {
          email: this.email,
          password: this.password,
        })
        .then(function (response) {
          thiss.setLoginResponse(response.data);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data._id);
          thiss.$router.push("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {

    localStorage.getItem('token') ? this.$router.push("/"):'';
  },
};
</script>
