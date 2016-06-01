import React, { PropTypes } from 'react';
import MarkdownEditor from './MarkdownEditor';
import { Button } from 'react-bootstrap';

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  // Pre-populate the form if these are specified
  content: PropTypes.string,
  title: PropTypes.string,
};

function isValid(title, content) {
  return title && title.length && content && content.length;
}

export default class QuestionForm extends React.Component {

  constructor(props) {
    super(props);
    const { content, title } = props;
    this.state = {
      title: title || '',
      content: content || '',
    };

    this.onContentChange = this.onContentChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onContentChange(e) {
    this.setState({ content: e.target.value });
  }

  onTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  onSubmit(e) {
    const { title, content } = this.state;
    this.props.onSubmit({ title, content });
  }

  render() {
    const { title, content } = this.state;

    return (
      <div>
        <div className="page-header">
          <h2>
            <input
              placeholder="Title"
              value={title}
              onChange={this.onTitleChange}
            />
          </h2>
        </div>

        <div className="row">
          <MarkdownEditor
            value={content}
            onChange={this.onContentChange}
          />
        </div>


        <Button
          bsStyle="success"
          onClick={this.onSubmit}
          disabled={!isValid(title, content)}
        >
          Submit
        </Button>

      </div>
    );
  }
}

QuestionForm.propTypes = propTypes;
