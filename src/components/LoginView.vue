<template>
     <div class="register_area">
        <div class="register_section">
            <div class="section_ct">
                <h3>Hello Again!</h3>
                <div class="form-group">
                    <label for="email">Enter Email</label>
                    <input
                        type="text" 
                        class="form-control" 
                        id="email" 
                        required
                        v-model="form.email"
                        :class="{
                            'is-invalid': form.errors().has('email'),
                        }"
                    />
                    <div
                        class="invalid-feedback"
                        v-if="form.errors().has('email')"
                    >
                        {{ form.errors().get("email") }}
                    </div>
                </div>
                <div class="form-group">                    
                    <label for="password">Enter Password</label>
                    <input 
                        v-model="form.password" 
                        type="password" 
                        class="form-control"
                        id="password"   
                        :class="{
                            'is-invalid': form.errors().has('password'),
                        }" 
                        required 
                    >
                    <div
                        class="invalid-feedback"
                        v-if="form.errors().has('password')"
                    >
                        {{ form.errors().get("password") }}
                    </div>
                </div>
                <h3>{{ this.output }}</h3>
                <div class="login_btn">
                    <button type="button" @click="login">Login</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import form from "vuejs-form";

export default {
    data() {
        return {
            form: form({
                email: "",
                password: ""
            }).rules({
                email: "required",
                password: "required"
            }),
            output: ""
        };
    },
    methods: {
        ...mapActions(["auth/login"]),
        login() {
            if (this.form.validate().errors().any()) return;

            var data = new FormData();
            data.append('email', this.form.email);
            data.append('password', this.form.password);

            this["auth/login"](data)
                .then((response) => {
                //   console.log("RES=====>", response)
                  localStorage.setItem("token", response.data.data.token)
                  this.$router.push('/dashboard')
                })
                .catch(() => {
                    this.output = "Invalid credentials!"
                    this.$router.push('/')
                });
        },
    },
};

</script>

