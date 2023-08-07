<template>
  <layout-div>
    <h2 class="text-center mt-5 mb-3">Create New Story</h2>
    <div class="card">
        <div class="card-header">
            <router-link 
                class="btn btn-outline-info float-right"
                to="/dashboard">View All Stories
            </router-link>
        </div>
        <div class="card-body">
            <form>
                <div class="form-group">
                    <label htmlFor="title">Title</label>
                    <input 
                        v-model="story.title"
                        type="text"
                        class="form-control"
                        id="title"
                        name="title"/>
                </div>
                <div class="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea 
                        v-model="story.content"
                        class="form-control"
                        id="content"
                        rows="3"
                        name="content"></textarea>
                </div>
                <div class="form-group">
                    <label htmlFor="status">Status(Published/Draft)</label>
                    <input 
                        v-model="story.status"
                        type="text"
                        class="form-control"
                        id="status"
                        name="status"/>
                </div>
                <button 
                    @click="handleSave()"
                    :disabled="isSaving"
                    type="button"
                    class="btn btn-outline-primary mt-3">
                    Save Story
                </button>
            </form>
        </div>
    </div>
  </layout-div>
</template>
 
<script>
import axios from 'axios';
import LayoutDiv from '../LayoutDiv.vue';
import Swal from 'sweetalert2'
 
export default {
  name: 'StoryCreate',
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
  methods: {
    handleSave() {
        this.isSaving = true
        const config = {
          headers:{
              "Accept": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        };
        axios.post('/api/stories', this.story, config)
          .then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Story saved successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            this.isSaving = false
            this.story.title = ""
            this.story.content = ""
            this.story.status = ""
            this.$router.push("/dashboard")
            return response
          })
          .catch(error => {
            this.isSaving = false
            Swal.fire({
                icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
            return error
          });
    },
  },
};
</script>