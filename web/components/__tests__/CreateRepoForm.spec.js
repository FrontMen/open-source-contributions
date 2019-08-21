import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import CreateRepoForm from '../CreateRepoForm'

let wrapper
const localVue = createLocalVue()
localVue.use(Buefy)

const mockInputMessages = {
  repository: {
    default: 'test',
    success: 'success',
    failed: 'error'
  },
  title: { default: 'title' },
  description: { default: 'description' }
}

const mockProjectForm = {
  isLoading: false,
  fetchStatus: 'default',
  repositoryId: '',
  title: '',
  description: '',
  owner: {
    name: '',
    avatar: ''
  }
}

beforeEach(() => {
  wrapper = shallowMount(CreateRepoForm, {
    propsData: {
      inputMessages: mockInputMessages,
      projectForm: mockProjectForm,
      fetchStatus: mockProjectForm.fetchStatus
    },
    localVue
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('CreateRepoForm', () => {
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
