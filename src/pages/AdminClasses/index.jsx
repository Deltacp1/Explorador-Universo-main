'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Copy,
  Plus,
  ArrowLeft,
  Users,
  Edit,
  Trash,
  BookOpen,
} from 'lucide-react';
import StarryBackground from '../../components/StarryBackground';
import SpaceButton from '../../components/SpaceButton';
import FlickeringText from '../../components/FlickeringText';
import { useGame } from '../../context/GameContext';
import { toast } from 'sonner';
import ClassForm from '../../components/admin/ClassForm';
import { formatDate } from '../../lib/utils';
import styles from './styles.module.css';

const AdminClasses = () => {
  const navigate = useNavigate();
  const { classes, deleteClass } = useGame();
  const [isCreatingClass, setIsCreatingClass] = useState(false);
  const [editingClass, setEditingClass] = useState(null);

  const handleCopyClassId = (id) => {
    navigator.clipboard.writeText(id);
    toast.success('Class ID copied to clipboard');
  };

  const handleDeleteClass = (id, name) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${name}"? This cannot be undone.`
      )
    ) {
      deleteClass(id);
      toast.success(`Class "${name}" deleted`);
    }
  };

  return (
    <div className={styles.container}>
      <StarryBackground starCount={70} />

      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <SpaceButton
              variant="ghost"
              size="sm"
              onClick={() => navigate('/admin')}
              className={styles.backButton}
            >
              <ArrowLeft size={16} />
            </SpaceButton>
            <FlickeringText
              text="MANAGE CLASSES"
              className={styles.title}
              glowColor="accent"
            />
          </div>

          <SpaceButton
            variant="accent"
            onClick={() => {
              setEditingClass(null);
              setIsCreatingClass(true);
            }}
            className={styles.newClassButton}
          >
            <Plus size={16} />
            New Class
          </SpaceButton>
        </div>

        {isCreatingClass || editingClass ? (
          <ClassForm
            initialClass={editingClass}
            onCancel={() => {
              setIsCreatingClass(false);
              setEditingClass(null);
            }}
          />
        ) : (
          <>
            {classes.length === 0 ? (
              <div className={styles.emptyState}>
                <Users size={32} className={styles.emptyStateIcon} />
                <h3 className={styles.emptyStateTitle}>
                  No Classes Created Yet
                </h3>
                <p className={styles.emptyStateText}>
                  Create your first class to get started with space quizzes for
                  your students.
                </p>
                <SpaceButton
                  variant="accent"
                  onClick={() => setIsCreatingClass(true)}
                  className={styles.createFirstButton}
                >
                  <Plus size={16} />
                  Create First Class
                </SpaceButton>
              </div>
            ) : (
              <div className={styles.classGrid}>
                {classes.map((cls) => (
                  <div key={cls.id} className={styles.classCard}>
                    <div className={styles.classCardContent}>
                      <div className={styles.classInfo}>
                        <div className={styles.classNameRow}>
                          <h3 className={styles.className}>{cls.name}</h3>
                          <div
                            className={styles.classIdBadge}
                            onClick={() => handleCopyClassId(cls.id)}
                          >
                            <span>{cls.id}</span>
                            <Copy size={12} />
                          </div>
                        </div>
                        <p className={styles.classDescription}>
                          {cls.description || 'No description provided.'}
                        </p>
                        <div className={styles.classMetadata}>
                          <span>Created: {formatDate(cls.createdAt)}</span>
                          <span className={styles.questionCount}>
                            <BookOpen size={14} />
                            {cls.questions.length} Questions
                          </span>
                        </div>
                      </div>

                      <div className={styles.classActions}>
                        <SpaceButton
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            navigate(`/admin/classes/${cls.id}/questions`)
                          }
                          className={styles.actionButton}
                        >
                          <BookOpen size={14} />
                          Questions
                        </SpaceButton>
                        <SpaceButton
                          variant="secondary"
                          size="sm"
                          onClick={() => setEditingClass(cls)}
                          className={styles.actionButton}
                        >
                          <Edit size={14} />
                          Edit
                        </SpaceButton>
                        <SpaceButton
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteClass(cls.id, cls.name)}
                          className={styles.actionButton}
                        >
                          <Trash size={14} />
                          Delete
                        </SpaceButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminClasses;
