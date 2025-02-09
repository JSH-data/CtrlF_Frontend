import NewBtns from './NewBtns';
import React, { useState } from 'react';
import ContextMenu from './ContextMenu';
import Navigator from './Navigator';
import { useScroll } from '../../../hooks/useScroll';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import styles from '../../../styles/items/notes/noteDetail/sideIndex/side_index.module.css';
import {
  menuPageX,
  menuPageY,
  detailTitle,
  ModifyPageContent,
} from '../../../store/atom';

export default function DetailSidebar({ noteId }) {
  const [showMenu, setShowMenu] = useState(false);
  const { scrollY } = useScroll();

  const noteTitle = useRecoilValue(detailTitle);
  const [xPos, setXPos] = useRecoilState(menuPageX);
  const [yPos, setYPos] = useRecoilState(menuPageY);
  const setModifyPage = useSetRecoilState(ModifyPageContent);

  const onRightClick = (e) => {
    e.preventDefault();
    showMenu ? setShowMenu(false) : setShowMenu(true);
    setXPos(`${e.screenX + 5}px`);
    setYPos(scrollY >= 50 ? `${e.screenY - 115}px` : `${e.screenY - 215}px`);
  };

  const closeContextMenu = () => {
    if (showMenu) setShowMenu(false);
    setModifyPage(false);
  };

  return (
    <aside className={styles.index}>
      <article className={styles.index_wrap}>
        <section className={styles.index_title}>
          <span
            className={styles.index_title_span}
            onContextMenu={onRightClick}
            onClick={closeContextMenu}
          >
            {noteTitle ?? null}
          </span>
        </section>
        <section className={styles.index_list_wrap}>
          <Navigator />
          <NewBtns noteId={noteId} />
        </section>
        {showMenu && (
          <ContextMenu
            NOTE
            x={xPos}
            y={yPos}
            noteId={noteId}
            previosTitle={noteTitle}
            setShowMenu={setShowMenu}
          />
        )}
      </article>
    </aside>
  );
}
