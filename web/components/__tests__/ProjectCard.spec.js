import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import ProjectCard from '../ProjectCard'

let wrapper
const localVue = createLocalVue()
localVue.use(Buefy)

describe('ProjectCard', () => {
  beforeEach(() => {
    wrapper = shallowMount(ProjectCard, {
      propsData: {},
      localVue
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
