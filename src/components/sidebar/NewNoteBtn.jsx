import { okBtnActive, isModalActive } from '../../store/atom';
import styles from '../../styles/items/sidebar/add_note.module.css';
import IssueCreateModal from '../items/modal/IssueCreateModal';
import { useSetRecoilState, useRecoilState } from 'recoil';

function NewNoteBtn() {
  const setIsUserSubmit = useSetRecoilState(okBtnActive);
  const [showHiddenModal, setShowHiidenModal] = useRecoilState(isModalActive);

  const activeAddNoteModal = () => {
    setIsUserSubmit(false);
    setShowHiidenModal(true);
  };

  return (
    <>
      <div className={styles.container}>
        <button className={styles.button} onClick={activeAddNoteModal}>
          + 노트 추가
        </button>
      </div>
      {showHiddenModal && (
        <>
          <IssueCreateModal issue={'note'} />
        </>
      )}
    </>
  );
}

export default NewNoteBtn;
