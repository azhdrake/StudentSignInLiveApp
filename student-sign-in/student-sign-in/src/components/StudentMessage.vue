<template>
	<div class="hello">
		<transition name="fade">
			<div class="alert alert-success" v-if="seeMessage"> <!-- checks to see if it's an approprate time for message, shows if it is. -->
				{{message}} {{name}}
			</div>
		</transition>
	</div>
</template>

<script>
export default{
	name: "StudentMessage",
	data(){
		return{
			seeMessage: false
		}
	},
	props: {
		message: String,
		name: String
	},
	watch: {
    message() {
      //watches for the message, sets it visable when it comes up, waits three seconds, and retracts the visability atribute.
			this.seeMessage = true
			setTimeout( () => {
				this.seeMessage = false
			},3000)
		}
	}
}
</script>
<style>
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>