<template>
<q-layout view="lHh Lpr lFf">
    <q-page-container>
      <SnackBar />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import SnackBar from './components/common/SnackBar.vue';

export default {


  components: {
    SnackBar,
  },
};
</script>
