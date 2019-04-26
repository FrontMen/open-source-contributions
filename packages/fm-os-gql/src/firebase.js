import * as admin from 'firebase-admin'
import { FIREBASE_SERVICE_ACCOUNT } from './config'

admin.initializeApp({
  credential: admin.credential.cert(FIREBASE_SERVICE_ACCOUNT),
  databaseURL: 'https://frontmen-os-contributions.firebaseio.com'
})

export default admin
