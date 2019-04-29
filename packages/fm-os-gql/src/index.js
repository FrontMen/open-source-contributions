import { bootstrap } from './server'
import createSchema from './app'

const runServer = async () => {
  const schema = await createSchema()
  bootstrap({ schema: schema })
}

try {
  runServer()
} catch (err) {
  console.error(err)
}
