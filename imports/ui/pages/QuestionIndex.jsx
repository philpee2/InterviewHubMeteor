import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Questions } from '../../api/questions/questions.js';
import QuestionShape from '../shapes/QuestionShape';
import LoadingIcon from '../shared/LoadingIcon';

const propTypes = {
  questions: PropTypes.arrayOf(QuestionShape).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

function QuestionIndex({ questions, isLoading }) {
  if (isLoading) {
    return <LoadingIcon />;
  } else {
    return (
      <div>
        <ul>
          {questions.map(({ _id, title }) => {
            return (
              <li key={_id}>
                <Link to={`/${_id}`}>{title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

QuestionIndex.propTypes = propTypes;

export default createContainer((props) => {
  const questionsHandle = Meteor.subscribe('questions.approved');
  const isLoading = !questionsHandle.ready();
  return Object.assign(
    {
      questions: Questions.find({ status: 'approved' }).fetch(),
      isLoading,
    },
    // Pass through everything that came from the router
    props
  );
}, QuestionIndex);