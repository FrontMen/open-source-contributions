import * as admin from 'firebase-admin'

const FIREBASE_SERVICE_ACCOUNT = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT
)

admin.initializeApp({
  credential: admin.credential.cert(FIREBASE_SERVICE_ACCOUNT),
  databaseURL: 'https://frontmen-os-contributions.firebaseio.com'
})

export default admin
