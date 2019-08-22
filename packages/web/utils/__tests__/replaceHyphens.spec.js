import replaceHyphens from '../replaceHyphens'

describe('ReplaceHyphens', () => {
  const stringWithOneHyphen = 'project-squirrel'
  const stringWithoutHyphen = 'projectX'
  const stringWithMultipleHyphen = 'project-is-cool'

  it('should remove the first hyphen and make the first letter capitalized', () => {
    const output = replaceHyphens(stringWithOneHyphen)
    expect(output).toEqual('Project squirrel')
  })

  it('should make the first letter capitalized when there is no hyphen', () => {
    const output = replaceHyphens(stringWithoutHyphen)
    expect(output).toEqual('ProjectX')
  })

  it('should only remove the first hyphen and make the first letter capitalized', () => {
    const output = replaceHyphens(stringWithMultipleHyphen)
    expect(output).toEqual('Project is-cool')
  })
})
