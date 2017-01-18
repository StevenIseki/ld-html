import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import {editorStateToHtml} from 'last-draft'

export default class HtmlModal extends Component {
  constructor (props) {
    super(props)
    this.state = { code: '' }
  }

  componentDidMount () {
    this.setCodeFromState()
  }

  setStateFromCode () {
    this.props.submitHtmlModal(this.state.code)
  }

  setCodeFromState() {
    const {editorState, onChange} = this.props
    const html = editorStateToHtml(editorState)
    this.setState({ code: html })
    ReactDOM.findDOMNode(this.refs.textArea).focus()
  }

  onEditChange (event) {
    event.stopPropagation()
    const code = event.target.value
    this.setState({code: code})
  }

  submitHtml (event) {
    this.setStateFromCode()
  }

  onKeyDown (event) {
    if (event.key === 'Escape') {
      event.preventDefault()
      this.props.closeModal()
    }
  }

  render () {
    const {code} = this.state

    return (
      <Wrapper style={{ width: `700px`, left: `-200px` }}>
        <EditTextArea
          className='ld-edit-code-textarea'
          ref='textArea'
          onChange={::this.onEditChange}
          value={code}
          onKeyDown={::this.onKeyDown} />

        <EditButtonWrapper className='ld-edit-code-button-wrapper'>
          <EditButton
            className='ld-edit-code-submit-button'
            onClick={::this.submitHtml}
            type='button'
          >
          <svg fill='currentColor' height='24' viewBox='0 0 24 24' width='24'>
              <path d='M0 0h24v24H0z' fill='none' />
              <path d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z' />
          </svg>
          </EditButton>

          <EditButton
            className='ld-edit-code-close-button'
            onClick={this.props.closeModal}
            type='button'
          >
          <svg width='24' height='24' viewBox='0 0 24 24' className='ld-button-close'>
            <g fill='currentColor' fillRule='evenodd'>
              <path d='M16.95 5.636l1.414 1.414L7.05 18.364 5.636 16.95z' />
              <path d='M16.95 18.364l1.414-1.414L7.05 5.636 5.636 7.05z' />
            </g>
          </svg>
          </EditButton>
        </EditButtonWrapper>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  white-space: nowrap;
  top: -60px;
  background-color: #fff;
  box-shadow: 0 1px 18px 0 rgba(0, 0, 0, 0.3);
  z-index: 100;
`

const EditTextArea = styled.textarea`
  background-color: transparent;
  border: 1px solid #eee;
  border-radius: 2px;
  color: #181818 !important;
  font-size: 15px;
  line-height: 1.2;
  margin: 1em;
  padding: 8px;
  width: 80% !important;
  height: 150px !important;
  resize: none;
  vertical-align: bottom;

  &:hover {
    border: 1px solid #ccc;
  }

  &:focus {
    border: 1px solid #ccc;
    outline: none;
  }
`

const EditButton = styled.button`
  padding: 0;
  cursor: pointer;
  border: 0;
  height: 40px;
  width: 40px;
  background: transparent;
  padding-right: 16px;
  color: #ccc;

  &:hover {
    color: #9d1d20;
  }
`

const EditButtonWrapper = styled.span`
  display: inline-block;
`
