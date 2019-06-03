<template>
  <div>
    <Header />
    <Section>
      <div v-if="!isAuthenticated" class="auth-wrapper">
        <h2 class="title is-2 is-spaced is-centered">
          Authenticate with your FrontMen account
        </h2>
        <GoogleLogin
          :params="params"
          :on-success="onSuccess"
          :on-failure="onFailure"
          class="google-login-btn"
        >
          <span class="google-login-btn__icon">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="18px"
              height="18px"
              viewBox="0 0 48 48"
              class="abcRioButtonSvg"
            >
              <g>
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                ></path>
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                ></path>
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                ></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </g>
            </svg>
          </span>
          <span class="google-login-btn__label">Sign in with Google</span>
        </GoogleLogin>
        <div v-if="error">
          <b-message
            type="is-danger"
            has-icon
            aria-close-label="Close notification"
            role="alert"
          >
            {{ error }}
          </b-message>
        </div>
      </div>
    </Section>
    <Footer />
  </div>
</template>
<style>
.is-centered {
  text-align: center;
}
.auth-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
}

/* CSS kindly "borrowed" from https://developers.google.com/identity/sign-in/web/build-button */
.google-login-btn {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #4285f4;
  border: 1px solid #4285f4;
  color: #fff;
  height: 50px;
  width: 240px;
  display: flex;
  padding: 0;
  margin-bottom: 48px;
  transition: box-shadow 0.3s ease;
  cursor: pointer;
}

.google-login-btn:hover,
.google-login-btn:active,
.google-login-btn:focus {
  box-shadow: 0 0 3px 3px rgba(66, 133, 244, 0.3);
}
.google-login-btn__icon {
  padding: 15px;
  background: white;
  height: 48px;
}

.abcRioButtonSvg {
  width: 18px;
  height: 18px;
}

.google-login-btn__label {
  font-size: 16px;
  line-height: 48px;
  font-family: Roboto, arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.21px;
  margin-left: 6px;
  margin-right: 6px;
  vertical-align: top;
  height: 48px;
  text-align: center;
  flex-grow: 1;
}
</style>

<script>
import GoogleLogin from 'vue-google-login'
import { verifyToken } from '@/apollo/mutations/mutations.js'

export default {
  name: 'Login',
  components: {
    GoogleLogin,
    Header: () => import('@/components/Header'),
    Footer: () => import('@/components/Footer'),
    Section: () => import('@/components/Section')
  },
  middleware: ['checkSession'],
  data() {
    return {
      isAuthenticated: false,
      submitting: false,
      error: null,
      params: {
        client_id:
          '878769613885-27apk96jh71lo63f8c3o8i1m71mgc94f.apps.googleusercontent.com'
      }
    }
  },
  mounted() {
    this.isAuthenticated = this.$apolloHelpers.getToken()
    this.isAuthenticated && this.handleRedirect()
  },
  methods: {
    handleRedirect() {
      this.$router.push('/frontmen')
    },
    handleError(error) {
      this.error = error
    },
    async checkTokenValidity(token) {
      const isTokenValid = await this.$apollo
        .mutate({
          mutation: verifyToken,
          variables: {
            idToken: token
          }
        })
        .then(({ data }) => {
          return data.verifyToken
        })
        .catch(error => {
          throw new Error(error)
        })
      return isTokenValid
    },
    async onSuccess(googleUser) {
      const idToken = googleUser.getAuthResponse().id_token
      const isTokenValid = await this.checkTokenValidity(idToken)

      if (isTokenValid) {
        await this.$apolloHelpers.onLogin(idToken)
        this.handleRedirect()
      } else {
        this.handleError(
          'The account used has not been authorized to login. Please try again with a FrontMen account.'
        )
      }
    },
    async onFailure() {
      await this.$apolloHelpers.onLogout()
      this.handleError('We could not log you in, please try again.')
    }
  }
}
</script>
