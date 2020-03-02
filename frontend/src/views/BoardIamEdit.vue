// EditComponent.vue

<template>
    <div>
        <h1>Edit User</h1>
        <form @submit.prevent="updateUser">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>UserName:</label>
                        <input type="text" class="form-control" v-model="user.username">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Email:</label>
                        <textarea class="form-control" v-model="user.email" rows="5"></textarea>
                    </div>
                </div>
            </div>
            <br>
            <div class='row container'>
                <div class="form-check pr-2">
                    <input class="form-check-input" type="checkbox" value="5e5c7ff190fbe214182b6e8f" id="User" v-model="user.roles">
                    <label class="form-check-label" for="User">
                                User
                    </label>
                </div>
                <div class="form-check pr-2">
                    <input class="form-check-input" type="checkbox" value="5e5c7ff190fbe214182b6e90" id="Moderator" v-model="user.roles">
                    <label class="form-check-label" for="Moderator">
                                Moderator
                    </label>
                </div>
                <div class="form-check pr-2">
                    <input class="form-check-input" type="checkbox" value="5e5c7ff190fbe214182b6e91" id="Administrator" v-model="user.roles">
                    <label class="form-check-label" for="Administrator">
                                Administrator
                    </label>
                </div>
                
            </div>
    
            <br />
            <div class="form-group">
                <button class="btn btn-primary">Update</button> 
            </div>
        </form>
    </div>
</template>

<script>
export default {

    data() {
        return {
            user: {},
            checkedNames: []
        }
    },
    created() {
        let uri = `http://localhost:8080/api/edit/user/${this.$route.params.id}`;
        this.axios.get(uri).then((response) => {
            this.user = response.data;
        });
    },
    methods: {
        updateUser() {
            let uri = `http://localhost:8080/api/update/user/${this.$route.params.id}`;
            console.log(this.user)
            this.axios.post(uri, this.user).then(() => {
                this.$router.push({ name: 'iam' });
            });
        }
    }
}
</script>