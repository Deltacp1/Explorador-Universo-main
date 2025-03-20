'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import SpaceButton from '../SpaceButton';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useGame } from '../../context/GameContext';
import { toast } from 'sonner';
import styles from './class-form.module.css';

const ClassForm = ({ initialClass, onCancel }) => {
  const { addClass, updateClass } = useGame();
  const [name, setName] = useState(initialClass?.name || '');
  const [description, setDescription] = useState(
    initialClass?.description || ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!initialClass;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Class name is required');
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditing && initialClass) {
        updateClass(initialClass.id, {
          name,
          description,
        });
        toast.success(`Class "${name}" updated`);
      } else {
        const newClassId = addClass({
          name,
          description,
          questions: [],
        });
        toast.success(`Class "${name}" created with ID: ${newClassId}`);
      }
      onCancel();
    } catch (error) {
      toast.error('An error occurred while saving the class');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formCard}>
      <h3 className={styles.formTitle}>
        {isEditing ? `Edit Class: ${initialClass.name}` : 'Create New Class'}
      </h3>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Class Name*</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter class name"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter class description (optional)"
            className={styles.textarea}
          />
        </div>

        {isEditing && (
          <div className={styles.infoBox}>
            <p>
              Class ID:{' '}
              <span className={styles.classId}>{initialClass.id}</span>
            </p>
            <p>
              Created: {new Date(initialClass.createdAt).toLocaleDateString()}
            </p>
            <p>Questions: {initialClass.questions.length}</p>
          </div>
        )}

        <div className={styles.buttonContainer}>
          <SpaceButton type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </SpaceButton>

          <SpaceButton type="submit" variant="accent" disabled={isSubmitting}>
            {isSubmitting
              ? 'Saving...'
              : isEditing
              ? 'Update Class'
              : 'Create Class'}
          </SpaceButton>
        </div>
      </form>
    </div>
  );
};

// Add prop validation
ClassForm.propTypes = {
  initialClass: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    questions: PropTypes.array,
    createdAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ]),
  }),
  onCancel: PropTypes.func.isRequired,
};

// Default props
ClassForm.defaultProps = {
  initialClass: null,
};

export default ClassForm;
