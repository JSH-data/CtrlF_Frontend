import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  issueApproveApi,
  issueCancel,
  issueEdit,
} from '../../../utils/issueApi';
import {
  issueDetailTopicId,
  issueDetailPageId,
  issueDetailPageVersionNo,
} from '../../../store/issueAtom';
import { useSetRecoilState } from 'recoil';
import styles from '../../../styles/items/modal/issue_modal.module.css';
import DropMenu from '../menu/IssueDropMenu';

export default function IssueDetailModal({
  issue,
  setIsModalOpen,
  setIsUnathorized,
}) {
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const setTopicId = useSetRecoilState(issueDetailTopicId);
  const setPageId = useSetRecoilState(issueDetailPageId);
  const setPageVersionNo = useSetRecoilState(issueDetailPageVersionNo);
  const router = useRouter();

  const openDropDown = () => {
    setDropDownMenu(true);
  };

  const moveToDetail = async () => {
    await setTopicId(issue.topic_id);
    await setPageId(issue.page_id);
    await setPageVersionNo(issue.version_no);
    router.push(`/notes/${issue.note_id}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const acceptIssue = async () => {
    const result = await issueApproveApi(issue.id);
    if (result && result.status == 200) {
      setIsModalOpen(false);
    } else {
      setIsUnathorized(true);
    }
  };

  const rejectIssue = () => {
    // API 개발 완료시 교체 예정
    //   issueReject();
    setIsUnathorized(true);
  };

  const cancelIssue = () => {
    // API 개발 완료시 교체 예정
    issueCancel();

    setIsUnathorized(true);
  };

  const editIssue = () => {
    // API 개발 완료시 교체 예정
    issueEdit();

    setIsUnathorized(true);
  };

  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={closeModal}>
          X
        </button>
        <div className={styles.drop} onClick={openDropDown}>
          {dropDownMenu && (
            <DropMenu
              onClick={openDropDown}
              dropDownMenu={dropDownMenu}
              setDropDownMenu={setDropDownMenu}
            />
          )}
        </div>
        <div className={styles.modal__title}>
          {issue.related_model_type} {issue.action}
        </div>
        <div className={`${styles.modal__change} ${styles.title}`}>
          {' '}
          {issue.title}
        </div>
        <div className={`${styles.modal__change} ${styles.contents}`}>
          {issue.reason}
        </div>
        <div className={styles.btns}>
          <div>
            {issue.related_model_type === 'PAGE' && (
              <button className={styles.modal__btn} onClick={moveToDetail}>
                자세히 보기
              </button>
            )}
          </div>
          <div className={styles.permit}>
            <button className={styles.modal__btn} onClick={acceptIssue}>
              승인
            </button>
            <button className={styles.modal__btn} onClick={rejectIssue}>
              미승인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
