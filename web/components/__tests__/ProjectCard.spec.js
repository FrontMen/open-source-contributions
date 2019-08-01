import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import ProjectCard from '../ProjectCard'

let wrapper
const localVue = createLocalVue()
localVue.use(Buefy)
const propOwnerAvatar = 'chillicorn.png'
const propTitle = 'this is a title'
const propForkCount = 4
const propUrl = 'www.test.com'

describe('ProjectCard', () => {
  beforeEach(() => {
    wrapper = shallowMount(ProjectCard, {
      propsData: {
        ownerAvatar: propOwnerAvatar,
        title: propTitle,
        forkCount: propForkCount,
        url: propUrl
      },
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
  it('receives props and renders them', () => {
    expect(wrapper.props('ownerAvatar')).toBe('chillicorn.png')
    expect(wrapper.find('img.avatar').attributes('src')).toBe('chillicorn.png')
    expect(wrapper.find('p.title').text()).toBe('this is a title')
    expect(wrapper.find('span.fork-count').text()).toBe('4')
    expect(wrapper.find('a.source-link').attributes('href')).toBe(
      'www.test.com'
    )
  })
})
