<template>
  <div>
    <Header />
    <Section>
      <p>
        Login with your Frontmen e-mailadres
      </p>
      <GoogleLogin
        :params="params"
        :on-success="onSuccess"
        :on-failure="onFailure"
      >
        Login
      </GoogleLogin>
    </Section>
    <Footer />
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login'

export default {
  name: 'Login',
  components: {
    GoogleLogin,
    Header: () => import('@/components/Header'),
    Footer: () => import('@/components/Footer'),
    Section: () => import('@/components/Section')
  },
  data() {
    return {
      // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
      params: {
        client_id:
          '878769613885-27apk96jh71lo63f8c3o8i1m71mgc94f.apps.googleusercontent.com'
      }
    }
  },
  middleware: 'auth',
  methods: {
    onSuccess(googleUser) {
      // console.log(googleUser)

      // This only gets the user information: id, name, imageUrl and email
      console.log(
        googleUser.getBasicProfile().getEmail(),
        googleUser.getHostedDomain()
      )
    },
    onFailure() {
      console.log('fail')
    }
  }
}
</script>
