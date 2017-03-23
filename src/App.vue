<template>
  <div id="app">
    <h1 v-text="title"></h1>
    <div class="enter-tasks">
      <div class="addicon">
      </div>
      <input v-model="newItem" class="model-item" ref="input" v-on:focus="inputFocus" v-on:blur="inputBlur" v-on:keyup.enter="addNew" placeholder="Add new task"/>
    </div>
    <ul>
      <li v-for="item in items" @click="toggleFinished(item)"  class="tasks rel">
        <div class="finish-task abs"  @click="addFinished(item)"  v-bind:class="{finished: item.isFinished}">
          <span>{{item.label}}</span>
        </div>
         <span class="delete abs" @click="deleteItem(item)">delete</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Store from './store'
import Finish from './finish'
export default {
  data: function(){
    return{
      title: "a todo list by Vue",
      items:Store.fetch(),
      finish:Finish.fetch(),
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
    ,
    finishedItems:{
      handler:function(finish){
        Finish.save(finish)
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
    inputFocus: function(){
      this.$refs.input.previousElementSibling.className += " beforeclass";
    },
    inputBlur: function(){
      this.$refs.input.previousElementSibling.className = this.$refs.input.previousElementSibling.className.replace(/\s+beforeclass/,'');
    },
    deleteItem: function(item){
      var index = this.items.indexOf(item);
      this.items.splice(index,1);
    },
    addFinished: function(item){
      var index = this.finish.indexOf(item);
      if( index < 0){
          this.finish.push(item);
      }else{
        this.finish.splice(index,1);
      }
      
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
ul{
  padding-left: 0;
  width: 100%;
}
ul li, li{
  list-style-type: none;
}
.rel{
  position: relative;
}
.abs{
  position: absolute;
}
.left{
  float: left;
}
.right{
  float: right;
}
.tasks{
  height: 50px;
  width: 100%;
  background-color: white;
  border-radius: 3px;
  margin-top: 5px;
}
.finish-task{
  background: url("./assets/check.png") no-repeat;
  top: 15px;
  left: 13px;
  height: 20px;
  width: 20px;
  cursor: pointer;
}
.finish-task span{
  font-size: 1rem;
  line-height: 1rem;
  padding-top: 3px;
  display: inline-block;
  margin-left: 40px;
}
.tasks .delete{
  cursor: pointer;
  right: 20px;
  top: 18px;
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
  background: url("./assets/finish.png") no-repeat;
  background-color: white;
}
.finished span{
  text-decoration: line-through;
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
    background: url("./assets/add.png") no-repeat;
    height: 100%;
    display: block;
}
.beforeclass:before{
  display: none;
}


</style>
