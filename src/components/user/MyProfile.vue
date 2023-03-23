<template>
  <div
    class="modal"
    id="modal-profile"
    tabindex="-1"
    aria-labelledby="modal-profile"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-fullscreen-xl-down">
      <div class="modal-content">
        <!-- Modal body -->
        <div class="modal-body py-0">
          <!-- Header -->
          <div class="profile modal-gx-n">
            <div class="profile-img text-primary rounded-top-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 400 140.74"
              >
                <g>
                  <g>
                    <path d="M400,125A1278.49,1278.49,0,0,1,0,125V0H400Z" />
                    <path
                      class="cls-2"
                      d="M361.13,128c.07.83.15,1.65.27,2.46h0Q380.73,128,400,125V87l-1,0a38,38,0,0,0-38,38c0,.86,0,1.71.09,2.55C361.11,127.72,361.12,127.88,361.13,128Z"
                    />
                    <path
                      class="cls-2"
                      d="M12.14,119.53c.07.79.15,1.57.26,2.34v0c.13.84.28,1.66.46,2.48l.07.3c.18.8.39,1.59.62,2.37h0q33.09,4.88,66.36,8,.58-1,1.09-2l.09-.18a36.35,36.35,0,0,0,1.81-4.24l.08-.24q.33-.94.6-1.9l.12-.41a36.26,36.26,0,0,0,.91-4.42c0-.19,0-.37.07-.56q.11-.86.18-1.73c0-.21,0-.42,0-.63,0-.75.08-1.51.08-2.28a36.5,36.5,0,0,0-73,0c0,.83,0,1.64.09,2.45C12.1,119.15,12.12,119.34,12.14,119.53Z"
                    />
                    <circle class="cls-2" cx="94.5" cy="57.5" r="22.5" />
                    <path
                      class="cls-2"
                      d="M276,0a43,43,0,0,0,43,43A43,43,0,0,0,362,0Z"
                    />
                  </g>
                </g>
              </svg>
              <div class="position-absolute top-0 start-0 py-6 px-5">
                <button
                  type="button"
                  class="btn-close btn-close-white btn-close-arrow opacity-100"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ref="btnCloseArrow"
                ></button>
              </div>
            </div>
            <div class="profile-body">
              <div class="avatar avatar-xl">
                <img
                  class="avatar-img"
                  src="assets/img/avatars/1.jpg"
                  alt="#"
                />
              </div>
              <h4 class="mb-1 text-capitalize">{{ getUser.first_name }}</h4>
            </div>
          </div>
          <!-- Header -->
          <hr class="hr-bold modal-gx-n my-0" />
          <!-- List -->
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <div class="row align-items-center gx-6">
                <div class="col">
                  <h5>E-mail</h5>
                  <p class="text-capitalize">{{ getUser.email }}</p>
                </div>
                <div class="col-auto">
                  <div class="btn btn-sm btn-icon btn-dark">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-mail"
                    >
                      <path
                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                      ></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <hr class="hr-bold modal-gx-n my-0" />
          <!-- List -->
          <ul class="list-group list-group-flush">
            <li class="list-group-item" @click="logout">
              <a href="#" class="text-danger">Logout</a>
            </li>
          </ul>
          <!-- List -->
        </div>
        <!-- Modal body -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MyProfile",
  setup() {
    return {};
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    logout() {
      localStorage.setItem("userId", "");
      localStorage.setItem("token", "");
      this.$refs.btnCloseArrow.click();
      this.$router.push("/login");
    },
  },
};
</script>
