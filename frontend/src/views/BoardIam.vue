<template>
    <div>
    
        <div class="col-md-2 mt-5 mb-5">
            <h1>Users</h1>
            <router-link :to="{ name: 'iamcreate' }" class="btn btn-dark text-light">Create User</router-link>
       
        </div>
    
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Body</th>
                    <th>Actions</th>
                    <th>Roles</th>
                    <th>Roles</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in iambody" :key="user._id">
                    <td>{{ user.username }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                        <router-link :to="{name: 'iamedit', params: { id: user._id }}" class="btn bg-dark text-white">Edit</router-link>
                    </td>
                    <td class='row'>
                        <div  v-for='role in user.roles'>
                          <a class='btn bg-dark text-light mr-1' v-if="role=='5e5c7ff190fbe214182b6e8f'">USER</a>
                          <a class='btn bg-dark text-light mr-1' v-if="role=='5e5c7ff190fbe214182b6e90'">MODERATOR</a>
                          <a class='btn bg-dark text-light' v-if="role=='5e5c7ff190fbe214182b6e91'">ADMINISTRATOR</a>
                        </div>
                    </td>
                    <td>
                        <button class="btn btn-danger" @click.prevent="deleteUser(user._id)">Delete</button>
                    </td>
                    </tr>
                </tbody>
            </table>
      </div>
</template>


<script>
import UserService from '../services/user.service';

export default {
    name: 'iam',
    data() {
        return {
            iambody: ''
        };
    },
    mounted() {
        UserService.getIam().then(
            response => {
                this.iambody = response.data;
            },
            error => {
                this.iambody =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
            }
        );
    },
    methods: {
        deleteUser(id) {
            let uri = `http://localhost:8080/api/delete/user/${id}`;
            this.axios.delete(uri).then(response => {
                UserService.getIam().then(
            response => {
                this.iambody = response.data;
            },
            error => {
                this.iambody =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
            }
        );
            });
        }
    }
};
</script>
