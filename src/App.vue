<template>
  <div id="app">
    <h1 v-text="title"></h1>
    <div class="enter-tasks">
      <div class="addicon">
      </div>
      <input v-model="newItem" class="model-item" v-on:keyup.enter="addNew" placeholder="Add new task"/>
    </div>
    <ul>
      <li v-for="item in items" @click="toggleFinished(item)" v-bind:class="{finished: item.isFinished}">
        {{item.label}}
      </li>
    </ul>
  </div>
</template>

<script>
import Store from './store'
console.log(Store);
export default {
  data: function(){
    return{
      title: "this is a todo list",
      items:Store.fetch(),
      newItem: ''
    }
  },
  watch:{
    items:{
      handler:function(items){
        Store.save(items)
      },
      deep: true
    }
  },
  methods: {
    toggleFinished: function(item){
      item.isFinished = ! item.isFinished;
    },
    addNew: function(){
      this.items.push({
        label: this.newItem,
        isFinished: false
      })
      this.newItem = ""
    },
    inputHover: function(){
      var $addiconBefore = $(".addicon:before");
      $("enter-tasks input").focus(function(){
        $addiconBefore.css('height',0);
      });
      $("enter-tasks input").blur(function(){
        $addiconBefore.css('height',"100%");
      });
    }
  }
}
</script>

<style>
html,body{
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background: url("./assets/bg.jpg") no-repeat;
}
ul li, li{
  list-style-type: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto 0 auto;
  width: 80%;
  height: 100%;
}
.finished{
  text-decoration: underline;
}
.enter-tasks,
.model-item{
  width: 100%;
  background-color: rgba(102,137,100,0.75);
  height: 50px;
}
.model-item{
  font-size: 22px;
  border-radius: 3px;
  border: none;
  background-color: transparent;
  padding: 5px 10px;
  box-sizing: border-box;
  color: white;
  width: 95%;
}
input::-webkit-input-placeholder {
　　color:white;
}
input:-moz-placeholder { 
　　color:white;
}
input::-moz-placeholder {
　　color:white;
}
input:-ms-input-placeholder {
　　color:white;
}
.addicon{
  width: 33px;
  height: 33px;
  float: left;
  padding: 5px 0;
  box-sizing: border-box;
  border-right: 1px solid white;
  margin: 10px;
}
.addicon:before{
    content: "";
    color: white;
    background: url("./assets/add.png") no-repeat;
    height: 100%;
    display: block;
}
</style>
