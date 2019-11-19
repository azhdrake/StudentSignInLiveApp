<template>
	<tr v-bind:class="'present-' + student.present">
		<td> {{ student.name }} </td>
		<td> {{ student.starID }} </td>
          <!-- when clicked changes student.present attribute and prepares that information for the checked(student) method.-->
		<td> <input type="checkbox" 
                v-model="student.present" 
                v-on:change="checked(student)"></td>
    <!-- shows button if edit is checked. When clicked the button initiates the deleteStudent function. -->
		<td v-show="edit"> 
			<button id="delete-button" v-on:click="deleteStudent(student)">x</button>
		</td>
	</tr>
</template>

<script>
export default {
	name: "StudentRow",
	props: {
		student: Object,
		edit: Boolean
	},
	methods: {
		checked(student){
			this.$emit("student-present",student)
		},
    deleteStudent(student) {
      // makes sure you are really emotionally prepared to cull a child.
			if(confirm(`Delete ${student.name}?`)){
				this.$emit("delete-student", student)
			}
		}
	}
}
</script>

<style>
	.present-true{
		color: gray;
		font-style: italic;
	}
	.present-false{
		font-weight: bold;
	}
	button{
		
		background-color: red;
		color: white;
		border: none;
		text-align: center;
	}
	
	#delete-button{
		border-radius: 50% !important;
		padding-left: .5em;
		padding-right: .5em;
	}
</style>
