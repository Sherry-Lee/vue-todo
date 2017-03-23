const finish_key = "finish-items"

export default{
	fetch: function(){
		return JSON.parse(window.localStorage.getItem(finish_key)||'[]')
	},
	save: function(finish){
		window.localStorage.setItem(finish_key,JSON.stringify(finish))
	}
}