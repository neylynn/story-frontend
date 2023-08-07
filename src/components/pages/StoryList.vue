<template>
  <layout-div>
        <div class="container">
            <h2 class="text-center mt-5 mb-3">Story Home Page</h2>
            <div class="card">
                <div class="card-header">
                    <router-link to="/create"
                        class="btn btn-outline-primary"
                        >Create New Story
                    </router-link>
                    <button
                        class="btn btn-link"
                        @click="logout"
                        style="float: right"
                    >
                        Logout
                    </button>
                </div>
                <div class="card-body">
             
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Status</th>
                                <th width="240px">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                             
                            <tr v-for="story in stories" :key="story.id">
                                <td>{{story.title}}</td>
                                <td>{{story.content}}</td>
                                <td>{{story.status}}</td>
                                <td>
                                    <router-link :to="`/show/${story.id}`" class="btn btn-outline-info mx-1">Show</router-link>
                                    <router-link :to="`/edit/${story.id}`" class="btn btn-outline-success mx-1">Edit</router-link>
                                    <button 
                                        @click="handleDelete(story.id)"
                                        className="btn btn-outline-danger mx-1">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                                 
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </layout-div>
</template>
 
<script>
import axios from 'axios';
import LayoutDiv from '../LayoutDiv.vue';
import Swal from 'sweetalert2'
 
export default {
  name: 'StoryList',
  components: {
    LayoutDiv,
  },
  data() {
    return {
      stories:[]
    };
  },
  created() {
    this.fetchStoryList();
  },
  methods: {
    fetchStoryList() {
      const config = {
        headers:{
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      };
      axios.get('/api/stories',config)
        .then(response => {
            this.stories = response.data.data;
            return response
        })
        .catch(error => {
          return error
        });
    },
    handleDelete(id){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                const config = {
                  headers:{
                    "Accept": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                  }
                };
                axios.delete(`/api/stories/${id}`,config)
                .then( response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Story deleted successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.fetchStoryList();
                    return response
                })
                .catch(error => {
                    Swal.fire({
                         icon: 'error',
                        title: 'An Error Occured!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$router.push("/dashboard")
                    return error
                });
            }
          })
    },
    logout() {
      this.$store.dispatch("auth/logout");
      localStorage.removeItem("token")
      this.$router.push("/");
      this.$router.go();
    }
  },
};
</script>