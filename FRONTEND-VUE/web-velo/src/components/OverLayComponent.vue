<template>
  <div class="modal">
    <div class="modal-inner">      
      <button @click="close">&times;</button>
      <p>Hello World!</p>      
    </div>
  </div>
</template>

<script>
    export default { 
        data() {
            visible: false
        },
        methods: {
            close() {
                this.$emit("close");
            },
        },
    };
</script>