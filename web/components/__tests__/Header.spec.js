import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import Header from '../Header'

let wrapper
const localVue = createLocalVue()
localVue.use(Buefy)
const $apolloHelpers = {
  getToken() {
    return '123abc'
  },
  onLogout() {
    return true
  }
}

beforeEach(() => {
  wrapper = shallowMount(Header, {
    propsData: {},
    stubs: ['router-link', 'router-view'],
    mocks: { $apolloHelpers },
    localVue
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('Header', () => {
  it('mounts properly ###', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('authentication is set to token after getToken is called', () => {
    $apolloHelpers.getToken()
    expect(wrapper.vm.isAuthenticated).toBe('123abc')
  })
})
