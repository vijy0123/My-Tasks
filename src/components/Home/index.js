import {Component} from 'react'

import {v4} from 'uuid'

import {
  Container,
  CreateTakContainer,
  Form,
  FormHeading,
  LabelInputContainer,
  CustomLabel,
  CustomInput,
  CustomSelect,
  CustomOption,
  AddButton,
  AddTaskContainer,
  MainHeading,
  TagsListUI,
  TagItem,
  TagBtn,
  TaskUI,
  NoTaskText,
  TaskListLi,
  TaskText,
  TaskTag,
} from './style'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class Home extends Component {
  state = {
    inputText: '',
    inputTag: tagsList[0].optionId,
    taskList: [],
    activeTag: 'INITIAL',
  }

  onChangeTag = e => {
    this.setState({inputTag: e.target.value})
  }

  onChangeInput = e => {
    this.setState({inputText: e.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {inputText, inputTag} = this.state
    const newTask = {
      id: v4(),
      task: inputText,
      tag: inputTag,
    }
    if (inputText.length !== 0) {
      this.setState(prev => ({
        taskList: [...prev.taskList, newTask],
        inputText: '',
        inputTag: '',
      }))
    }
  }

  onClickActiveTag = e => {
    this.setState(prev => ({
      activeTag: prev.activeTag === e.target.value ? 'INITIAL' : e.target.value,
    }))
  }

  renderCreativeTaskView = () => {
    const {inputText, inputTag} = this.state
    return (
      <CreateTakContainer>
        <Form onSubmit={this.onSubmitForm}>
          <FormHeading>Create a task!</FormHeading>
          <LabelInputContainer>
            <CustomLabel htmlFor="inputText">Task</CustomLabel>
            <CustomInput
              type="text"
              id="inputText"
              value={inputText}
              placeholder="Enter the task here"
              onChange={this.onChangeInput}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <CustomLabel htmlFor="selectTag">Tags</CustomLabel>
            <CustomSelect
              id="selectTag"
              value={inputTag}
              onChange={this.onChangeTag}
            >
              {tagsList.map(eachTag => (
                <CustomOption key={eachTag.optionId} value={eachTag.optionId}>
                  {eachTag.displayText}
                </CustomOption>
              ))}
            </CustomSelect>
          </LabelInputContainer>
          <AddButton type="submit">Add Task</AddButton>
        </Form>
      </CreateTakContainer>
    )
  }

  renderTaskCard = () => {
    const {taskList, activeTag} = this.state
    const filterTaskList =
      activeTag === 'INITIAL'
        ? taskList
        : taskList.filter(each => each.tag === activeTag)
    return (
      <>
        {filterTaskList.map(each => (
          <TaskListLi key={each.id}>
            <TaskText>{each.task}</TaskText>
            <TaskTag>{each.tag}</TaskTag>
          </TaskListLi>
        ))}
      </>
    )
  }

  renderAddTaskView = () => {
    const {taskList, activeTag} = this.state
    return (
      <AddTaskContainer>
        <MainHeading>Tags</MainHeading>
        <TagsListUI>
          {tagsList.map(eachTag => {
            const isActiveTag = activeTag === eachTag.optionId
            return (
              <TagItem key={eachTag.optionId}>
                <TagBtn
                  type="button"
                  value={eachTag.optionId}
                  onClick={this.onClickActiveTag}
                  isActiveTag={isActiveTag}
                >
                  {eachTag.displayText}
                </TagBtn>
              </TagItem>
            )
          })}
        </TagsListUI>
        <MainHeading>Tasks</MainHeading>
        <TaskUI>
          {taskList.length === 0 ? (
            <NoTaskText>No Tasks Added Yet</NoTaskText>
          ) : (
            this.renderTaskCard()
          )}
        </TaskUI>
      </AddTaskContainer>
    )
  }

  render() {
    return (
      <Container>
        {this.renderCreativeTaskView()}
        {this.renderAddTaskView()}
      </Container>
    )
  }
}
export default Home
