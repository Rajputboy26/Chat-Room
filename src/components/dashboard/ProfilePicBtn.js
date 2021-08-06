/* eslint-disable arrow-body-style */
// /* eslint-disable arrow-body-style */
import React, { useRef, useState } from 'react';
import { Alert, Button, Modal } from 'rsuite';
import AvatarEditor from 'react-avatar-editor';
import { useModalState } from '../../misc/custom-hooks';
import { database, storage } from '../../misc/firebase';
import { useProfile } from '../../context/profile.context';

const fileInputTypes = '.png, .jpeg, .jpg';
const acceptedFileType = ['image/png', 'image/jpeg', 'image/pjpeg'];
const isValidFile = file => acceptedFileType.includes(file.type);

const getBlob = canvas => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('File Process error'));
      }
    });
  });
};

const ProfilePicBtn = () => {
  const { isOpen, open, close } = useModalState();
  const { profile } = useProfile();

  const [isLoading, setIsLoading] = useState(false);
  const [img, setImg] = useState(null);
  const avatarEditorRef = useRef();

  const onFileInputChange = ev => {
    const currFiles = ev.target.files;

    if (currFiles.length === 1) {
      const file = currFiles[0];
      // console.log(file);

      if (isValidFile(file)) {
        setImg(file);
        open();
        ev.target.value = null;
      } else {
        Alert.warning(` Pls Select Image `, 4000);
      }
    }
  };

  const onUploadClick = async () => {
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();

    setIsLoading(true);
    try {
      const blob = await getBlob(canvas);

      const avatarFileRef = storage
        .ref(`/profile/${profile.uid}`)
        .child('avatar');

      const uploadAvatarResult = await avatarFileRef.put(blob, {
        cacheControl: `public, max-age=${3600 * 24 * 3}`,
      });

      const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();
      // console.log(downloadUrl);

      const userAvatarRef = database
        .ref(`/profile/${profile.uid}`)
        .child('avatar');

      await userAvatarRef.set(downloadUrl);

      setIsLoading(false);
      Alert.info('Picture has been uploaded', 4000);
    } catch (err) {
      setIsLoading(false);
      Alert.error(err.message, 4000);
    }
  };

  return (
    <div className="mt-3 text-center">
      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
        >
          Select new profile picture
          <input
            id="avatar-upload"
            type="file"
            className="d-none"
            accept={fileInputTypes}
            onChange={onFileInputChange}
          />
        </label>

        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Adjust and Upload new profile picture</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <div className="mt-1 text-center"> */}
            <div className="d-flex justify-content-center align-item-center h-100">
              {img && (
                <AvatarEditor
                  ref={avatarEditorRef}
                  image={img}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              block
              appearance="ghost"
              onClick={onUploadClick}
              disabled={isLoading}
            >
              Upload
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ProfilePicBtn;
