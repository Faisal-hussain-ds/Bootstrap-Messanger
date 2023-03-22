<template>
  <aside class="sidebar bg-light">
    <div class="tab-content h-100" role="tablist">
      <!-- Chats -->
      <div
        class="tab-pane fade h-100 show active"
        id="tab-content-chats"
        role="tabpanel"
      >
        <div class="d-flex flex-column h-100 position-relative">
          <div class="hide-scrollbar">
            <div class="container py-8">
              <!-- Title -->
              <div class="mb-8">
                <h2 class="fw-bold m-0">Chats</h2>
              </div>
              <!-- Search -->
              <div class="mb-6">
                <form action="#">
                  <div class="input-group">
                    <div class="input-group-text">
                      <div class="icon icon-lg">
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
                          class="feather feather-search"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </div>
                    </div>
                    <input
                      type="text"
                      class="form-control form-control-lg ps-0"
                      placeholder="Search messages or users"
                      aria-label="Search for messages or users..."
                    />
                  </div>
                </form>
              </div>

              <!-- this is conversation list  -->
              <!-- Chats -->
              <div class="card-list">
                <!-- Card -->
                <a
                  href="#"
                  class="card border-0 text-reset"
                  v-for="(item, index) in responseArr"
                  :key="item._id"
                >
                  <div
                    class="card-body"
                    :class="index === activeIndex?'activeClass':''"
                    @click="getConversationMessages(item._id,index)"
                  >
                    <div class="row gx-5">
                      <div class="col-auto">
                        <div class="avatar avatar-online">
                          <img
                            src="assets/img/avatars/7.jpg"
                            alt="#"
                            class="avatar-img"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div class="d-flex align-items-center mb-3">
                          <h5 class="me-auto mb-0">
                            Conversation {{ index + 1 }}
                          </h5>
                          <span class="text-muted extra-small ms-2">{{
                            formateDate(item.createdAt)
                          }}</span>
                        </div>
                        <div class="d-flex align-items-center">
                          <div class="line-clamp me-auto">{{item.messages[0]['ans']['choices'][0].message.content.substring(0, 30) + "..."}}</div>
                          <div class="badge badge-circle bg-primary ms-5">
                            <span></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
                <!-- Card -->
              </div>
              <!-- Chats -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { EventBus } from "@/js/helpers/EventBus.js";
import moment from "moment";

// http://localhost:4001/conv/6411ac9cd3bed18503a9e9d6
export default {
  name: "UserCoversations",
  setup() {
    return {
      responseArr: ref([]),
      messagesArr: ref([]),
      activeIndex:ref(),
    };
  },

  methods: {
    setActive(index) {
      this.activeIndex = index;
    },
    formateDate(date)
    {
      return moment(date).format('MMMM Do YYYY');
    },
    getConversations() {
      var thiss = this;
      axios
        .get(
          `http://localhost:4001/conv/all/${localStorage.getItem(
            "userId"
          )}?token=${localStorage.getItem(
            "token"
          )}`,
          {
            token: localStorage.getItem("token"),
          }
        )
        .then(function (response) {
          console.log(response, "this is res");
          thiss.responseArr = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getConversationMessages(convId,index) {
      this.setActive(index);
      var thiss = this;
      axios
        .get(
          `http://localhost:4001/conv/messages/${convId}?token=${localStorage.getItem(
            "token"
          )}`,
          {
            token: localStorage.getItem("token"),
          }
        )
        .then(function (response) {
          console.log(response, "this is all messages of conv res");
          thiss.messagesArr = response.data;

          EventBus.emit("conversation-messages", thiss.messagesArr);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getConversations();
  },
};
</script>
<style scoped>
.activeClass{
  border: 1px solid blue !important;
  border-radius:5px !important
}
</style>