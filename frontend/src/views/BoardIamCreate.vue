<template>
    <div class="col-md-12">
        <div class="container">
            <h1>Create User</h1>
            <form name="form" @submit.prevent="handleNewUser">
                <div v-if="!successful">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input v-model="user.username" v-validate="'required'" type="text" class="form-control" name="username" />
                        <div v-if="submitted && errors.has('username')" class="alert-danger">{{errors.first('username')}}</div>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input v-model="user.email" v-validate="'required'" type="text" class="form-control" name="email" />
                        <div v-if="submitted && errors.has('email')" class="alert-danger">{{errors.first('email')}}</div>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input v-model="user.password" v-validate="'required'" type="text" class="form-control" name="password" />
                        <div v-if="submitted && errors.has('password')" class="alert-danger">{{errors.first('password')}}</div>

                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-block">Sign Up</button>
                    </div>
                </div>
            </form>
    
            <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">{{message}}</div>
        </div>
    </div>
</template>


<script>
import User from '../models/user';

export default {
    name: 'iamcreate',
    data() {
        return {
            user: new User('', '', ''),
            submitted: false,
            successful: false,
            message: '',
            checkedNames: []
        }
    },
    created() {
        let uri = `http://localhost:8080/api/edit/user/${this.$route.params.id}`;
        this.axios.get(uri).then((response) => {
            this.user = response.data;
        });
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    },
    methods: {
        updateUser() {
            let uri = `http://localhost:8080/api/auth/create/${this.$route.params.id}`;
            this.axios.post(uri, this.user).then(() => {
                this.$router.push({ name: 'iam' });
            });
        },
        handleNewUser() {
            this.message = '';
            this.submitted = true;
            this.$validator.validate().then(isValid => {
                if (isValid) {
                    this.$store.dispatch('auth/register', this.user).then(
                        data => {
                            this.message = data.message;
                            this.successful = true;
                        },
                        error => {
                            this.message =
                                (error.response && error.response.data) ||
                                error.message ||
                                error.toString();
                            this.successful = false;
                        }
                    );
                }
            });
        }
    }
}
</script>