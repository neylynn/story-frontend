<template>
   <layout-div>
        <h2 class="text-center mt-5 mb-3">Show Story</h2>
        <div class="card">
            <div class="card-header">
                <router-link 
                    class="btn btn-outline-info float-right"
                    to="/dashboard">View All Stories
                </router-link>
            </div>
            <div class="card-body">
                <b className="text-muted">Title:</b>
                <p>{{story.title}}</p>
                <b className="text-muted">Content:</b>
                <p>{{story.content}}</p>
                <b className="text-muted">Status:</b>
                <p>{{story.status}}</p>
            </div>
        </div>
   </layout-div>
</template>
 
<script>
import axios from 'axios';
import LayoutDiv from '../LayoutDiv.vue';
import Swal from 'sweetalert2'
 
export default {
  name: 'StoryShow',
  components: {
    LayoutDiv,
  },
  data() {
    return {
      story: {
        title: '',
        content: '',
        status: '',
      },
      isSaving:false,
    };
  },
  created() {
    const id = this.$route.params.id;
    const config = {
        headers:{
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      };
    axios.get(`/api/stories/${id}`,config)
    .then(response => {
        let storyInfo = response.data.data
        this.story.title = storyInfo.title
        this.story.content = storyInfo.content
        this.story.status = storyInfo.status
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
    })
  },
  methods: {
     
  },
};
</script>