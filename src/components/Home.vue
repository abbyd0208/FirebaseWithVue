<template>
    <div>
          <Header></Header>
          <router-view/>
    </div>
</template>

<script>

import Header from './Header';

export default {
    name: 'Home',
   components:{
    Header
  }
}
</script>