import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import ProjectCard from '../ProjectCard'

let wrapper
const localVue = createLocalVue()
localVue.use(Buefy)

const mockData = {
  ownerAvatar: 'chillicorn.png',
  title: 'this is a title',
  forkCount: 4,
  url: 'www.test.com'
}

describe('ProjectCard', () => {
  beforeEach(() => {
    wrapper = shallowMount(ProjectCard, {
      propsData: mockData,
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
    expect(wrapper.props('ownerAvatar')).toBe(mockData.ownerAvatar)
    expect(wrapper.find('img.avatar').attributes('src')).toBe(
      mockData.ownerAvatar
    )
    expect(wrapper.find('p.title').text()).toBe(mockData.title)
    expect(wrapper.find('[data-testid="fork-count"]').text()).toBe(
      mockData.forkCount.toString()
    )
    expect(wrapper.find('a.source-link').attributes('href')).toBe(mockData.url)
  })
})
