'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import SpaceButton from '../../components/SpaceButton';
import { Input } from '../../components/ui/input';
import { useGame } from '../../context/GameContext';
import { toast } from 'sonner';
import { Textarea } from '../../components/ui/textarea';
import { Check } from 'lucide-react';
import styles from './question-form.module.css';

const QuestionForm = ({ classId, initialQuestion, onCancel }) => {
  const { addQuestionToClass, updateQuestion } = useGame();
  const [text, setText] = useState(initialQuestion?.text || '');
  const [options, setOptions] = useState(
    initialQuestion?.options || ['', '', '', '']
  );
  const [correctAnswer, setCorrectAnswer] = useState(
    initialQuestion?.correctAnswer !== undefined
      ? initialQuestion.correctAnswer
      : 0
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!initialQuestion;

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      toast.error('Question text is required');
      return;
    }

    const emptyOptions = options.filter((option) => !option.trim()).length;
    if (emptyOptions > 0) {
      toast.error('All options must be filled');
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditing && initialQuestion) {
        updateQuestion(classId, initialQuestion.id, {
          text,
          options,
          correctAnswer,
        });
        toast.success('Question updated');
      } else {
        addQuestionToClass(classId, {
          text,
          options,
          correctAnswer,
        });
        toast.success('Question added');
      }
      onCancel();
    } catch (error) {
      toast.error('An error occurred while saving the question');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formCard}>
      <h3 className={styles.formTitle}>
        {isEditing ? 'Edit Question' : 'Create New Question'}
      </h3>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Question Text*</label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter question text"
            className={styles.textarea}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Answer Options*</label>

          {options.map((option, index) => (
            <div key={index} className={styles.optionRow}>
              <button
                type="button"
                onClick={() => setCorrectAnswer(index)}
                className={
                  correctAnswer === index
                    ? styles.correctButton
                    : styles.optionButton
                }
              >
                {correctAnswer === index ? <Check size={14} /> : null}
              </button>

              <Input
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className={styles.input}
                required
              />
            </div>
          ))}

          <p className={styles.helperText}>
            Click the circle next to an option to mark it as the correct answer
          </p>
        </div>

        <div className={styles.buttonContainer}>
          <SpaceButton type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </SpaceButton>

          <SpaceButton type="submit" variant="accent" disabled={isSubmitting}>
            {isSubmitting
              ? 'Saving...'
              : isEditing
              ? 'Update Question'
              : 'Add Question'}
          </SpaceButton>
        </div>
      </form>
    </div>
  );
};

// Add prop validation
QuestionForm.propTypes = {
  classId: PropTypes.string.isRequired,
  initialQuestion: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    correctAnswer: PropTypes.number,
  }),
  onCancel: PropTypes.func.isRequired,
};

// Default props
QuestionForm.defaultProps = {
  initialQuestion: null,
};

export default QuestionForm;
