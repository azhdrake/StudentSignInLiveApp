<template> <div>
<div class="card student-list m-2 p-2">
	<h4 class="card-title">Students</h4>
	
	<div class="edit-table-tole form-check">
		<input id="edit-table" type="checkbox" class="form-check-input" v-model="editTable">
		<label for="edit-table" class="form-check-label">Edit Table?</label>
	</div>
	
	<div id="student-table">
		<table class="table">
			<tr>
				<th>Name</th>
				<th>StarID</th>
				<th>Present?</th>
				<th v-show="editTable">Delete</th> <!--Will only show if the edit table button hass been clicked-->
			</tr>
			<StudentRow
				v-for="student in students" v-bind:key="student.name"
				v-bind:student="student"
				v-bind:edit="editTable"
				v-on:student-present="studentArrivedOrLeft"
				v-on:delete-student="studentDeleted">
          <!-- Loop. For each student in the student array, send StudentRow the student and the value of the editTable boolean listen for student's present or delete status changing.  -->
			</StudentRow>
		</table>
	</div>
</div>
</div></template>
<script>
	import StudentRow from "@/components/StudentRow.vue"
	
	export default{
		name: "StudentTable",
		data() {
			return{
				editTable: false
			}
		},
    components: {
      StudentRow
    },
		props: {
			students: Array
		},
		methods: {
			studentArrivedOrLeft(student){
				this.$emit("student-present", student)
			},
			studentDeleted(student){
				this.$emit("delete-student", student)
			}
		}
	}
</script>
<style>
	#student-table{
		max-height: 500px;
		overflow: scroll;
	}
</style>