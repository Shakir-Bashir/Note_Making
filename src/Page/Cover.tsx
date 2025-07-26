import { useRef, type ChangeEventHandler } from "react";
import styles from "./Cover.module.css";
import { FileImage } from "../components/FileImage";
import { uploadImage } from "../utils/uploadImage";

type CoverProps = {
  filePath?: string;
  changePageCover: (filePath: string) => void;
};

export const Cover = ({ filePath, changePageCover }: CoverProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onChangeCoverImage = () => {
    fileInputRef.current?.click();
  };

  const onCoverImageUpload: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const target = event.target;
    const result = await uploadImage(target?.files?.[0]);

    if (result?.filePath) {
      changePageCover(result.filePath);
    }
  };

  return (
    <div className={styles.cover}>
      {filePath ? (
        <FileImage className={styles.imgage} filePath={filePath} />
      ) : (
        <img src="/ztm-notes.png" alt="cover" className={styles.imgage} />
      )}
      <button className={styles.button} onClick={onChangeCoverImage}>
        Change cover
      </button>
      <input
        onChange={onCoverImageUpload}
        style={{ display: "none" }}
        ref={fileInputRef}
        type="file"
      />
    </div>
  );
};
