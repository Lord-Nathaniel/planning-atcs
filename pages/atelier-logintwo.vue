<template>
    <div class="form-signin">
        <form @submit.prevent="submit">
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
            <input v-model="email" type="email" class="form-control" placeholder="Email" required>
            <input v-model="password" type="password" class="form-control" placeholder="Password" required>
            <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    </div>
</template>

<script>
export default {
    name:"login",
    data() {
        return {
          email: '',
          //adminatcs@atcs.fr       @dm1n
          password: ''
        }
    },
    methods: {
        submit() {
            // await fetch('http://localhost:8000/api/login', {
            //     method: 'POST',
            //     header: { 'Content-Type':'application/json' },
            //     credentials: 'include',
            //     body: JSON.stringify({
            //         email: this.email,
            //         password: this.password
            //     })
            // });

            // await this.$router.push('/atelier-indextwo');
            this.$axios.post('/token', {
                email: this.email,
                password: this.password
                }).then((resp) => {
                this.$auth.setToken('local', 'Bearer ' + resp.data.access_token)
                this.$auth.setRefreshToken('local', resp.data.refresh_token)
                this.$axios.setHeader('Authorization', 'Bearer ' + resp.data.access_token)
                this.$auth.ctx.app.$axios.setHeader('Authorization', 'Bearer ' + resp.data.access_token)
                this.$axios.get('/users/me').then((resp) => { this.$auth.setUser(resp.data); this.$router.push('/') })
        })
        }
    }
}
</script>

<style>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>