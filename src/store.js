const storage_key = "todo-items"

export default{
	fetch: function(){
		return JSON.parse(window.localStorage.getItem(storage_key)||'[]')
	},
	save: function(items){
		window.localStorage.setItem(storage_key,JSON.stringify(items));
	}
}