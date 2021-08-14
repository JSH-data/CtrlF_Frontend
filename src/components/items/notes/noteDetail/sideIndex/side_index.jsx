import React, { useState, useRef } from "react";
import IndexIndex from "./index_index";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import RightClickSpan from "./rightClick";
import {
  menuPageX,
  menuPageY,
  detailTitle,
  modalTitleKo,
  noteDetailData,
  contextMenuActive,
} from "../../../../../store/atom";
import styles from "../../../../../styles/items/notes/note_detail.module.css";

export default function SideIndex() {
  const hiddenRef = useRef();
  const data = useRecoilValue(noteDetailData);
  const noteTitle = useRecoilValue(detailTitle);
  const [xPos, setXPos] = useRecoilState(menuPageX);
  const [yPos, setYPos] = useRecoilState(menuPageY);
  const setModalTitle = useSetRecoilState(modalTitleKo);
  const noteDetailHidden = "note_detail_hidden__1TR6C";
  const [modalToggle, setModalToggle] = useState(false);
  const [showMenu, setShowMenu] = useRecoilState(contextMenuActive);

  const onRightClick = (event) => {
    event.preventDefault();
    // hiddenRef.current.classList.toggle(noteDetailHidden);
    if (!modalToggle) {
      setXPos(`${event.pageX}px`);
      setYPos(`${event.pageY - 80}px`);
      setShowMenu(true);
      setModalToggle(true);
    } else {
      setShowMenu(false);
      setModalToggle(false);
    }
    event.target.className.includes("title") ? setModalTitle("노트") : null;
  };

  const closeContextMenu = () => {
    if (showMenu) {
      setShowMenu(false);
      setModalToggle(false);
    }
  };

  return (
    <div className={styles.index}>
      <div className={styles.index_wrap}>
        <div className={styles.index_title}>
          <span
            className={styles.index_title_span}
            onContextMenu={onRightClick}
            onClick={closeContextMenu}
          >
            {noteTitle}
          </span>
        </div>
        <div className={styles.index_index}>
          <IndexIndex noteTitle={noteTitle} data={data} />
        </div>
        {showMenu ? (
          <RightClickSpan noteTitle={noteTitle} x={xPos} y={yPos} />
        ) : null}
      </div>
    </div>
  );
}
