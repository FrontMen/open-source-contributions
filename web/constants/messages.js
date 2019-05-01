const inputMessages = {
  repository: {
    default:
      'Fill in the owner and name of the repository, seperated by a forward slash.',
    success: 'Repository found!',
    failed:
      'Failed to find repository. Make sure the input has this format: owner/repository.'
  },
  title: { default: 'Overwrite the default title if needed.' },
  description: { default: 'Overwrite the default description if needed.' }
}

const notificationMessages = {
  cancelCreating: {
    name: 'cancelCreating',
    type: 'info',
    title: 'Are you sure?',
    subtitle: 'Are you sure you want to cancel creating a project?',
    confirmText: 'Yes, cancel',
    cancelText: 'No, let me continue'
  },
  cancelEditing: {
    name: 'cancelEditing',
    type: 'info',
    title: 'Are you sure?',
    subtitle: 'Are you sure you want to cancel editing the project?',
    confirmText: 'Yes, cancel',
    cancelText: 'No, let me continue'
  },
  deleteProject: {
    name: 'deleteProject',
    type: 'danger',
    title: 'Are you sure?',
    subtitle: 'This will delete the project. This action is irreversible',
    confirmText: 'Yes, Delete',
    cancelText: 'No, keep it!'
  }
}

export { inputMessages, notificationMessages }
