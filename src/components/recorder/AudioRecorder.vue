<template>
  <div class="row">
    <div class="col-12">
      <h5>
        Record your query <br />
        <small class="text-grey"
          >Please try your voice doest not contain noise.</small
        >
      </h5>

      <button
        v-if="!recorder"
        @click="record()"
        class="button is-info notRec text-center"
      >
        Record Voice
      </button>

      <button v-else @click="stop()" class="button is-danger rec">Stop</button>

      <br />

      <audio v-if="newAudio" :src="newAudioURL" controls></audio>

      <hr />
      <button
        type="button"
        class="btn btn-outline-success justify-center"
        @click="sendAudio()"
      >
        Proceed
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  name: "AudioRecorder",
  components: {},
  data() {
    return {
      newAudio: ref(),
      recorder: ref(),
      newRecorder: ref(null),
    };
  },
  computed: {
    // omitted...

    newAudioURL() {
      return URL.createObjectURL(this.newAudio);
    },
  },
  methods: {
    sendAudio() {
      var thiss = this;
      console.log('thiss.newAudio',thiss.newAudio)
       const formData = new FormData()
    formData.append('file', thiss.newAudio, 'recorded_audio.ogg')
      axios
        .post(
          "https://api.openai.com/v1/audio/transcriptions",
          { file: formData,
            model: "whisper-1",
            
          },
          {
            headers: {
              Authorization:
                "Bearer gpt-key-here",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res, "this is res");
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    
    
    
    
    },
    async record() {
      this.newAudio = null;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      const options = { mimeType: "audio/webm" };
      const recordedChunks = [];
      this.recorder = new MediaRecorder(stream, options);

      this.recorder.addEventListener("dataavailable", (e) => {
        if (e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      });


      this.newRecorder=this.recorder;

      this.recorder.addEventListener("stop", () => {
        this.newAudio = new Blob(recordedChunks);
        console.log(this.newAudio);
      });

      this.recorder.start();
    },
    async stop() {
      this.recorder.stop();
      this.recorder = null;
    },
  },
};
</script>

<style scoped>
.rec {
  animation-name: pulse;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes pulse {
  0% {
    box-shadow: 0px 0px 5px 0px rgba(173, 0, 0, 0.3);
  }
  65% {
    box-shadow: 0px 0px 5px 13px rgba(173, 0, 0, 0.3);
  }
  90% {
    box-shadow: 0px 0px 5px 13px rgba(173, 0, 0, 0);
  }
}
.button {
  width: 35px;
  height: 35px;
  font-size: 0;
  background-color: red;
  border: 0;
  border-radius: 35px;
  margin: 18px;
  outline: none;
}
.notRec {
  background-color: green;
}
.row {
  display: flex;
  position: absolute;
  top: 20%;
  left: 30%;
}
</style>
