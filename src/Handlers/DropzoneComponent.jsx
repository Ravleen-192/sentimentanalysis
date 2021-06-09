import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {Col} from "reactstrap";
import user_image_1 from '../images/user.png'
const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderRadius: 5,
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function DropzoneComponent(props) {
    const [files, setFiles] = useState([]);
    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
      }, []);
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png',multiple:false
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const thumbs = files.map(file => (
        <div class="user_image_1 mb_20">
            <img src={file.preview} alt={file.name} class="profile-user-img img-responsive img-circle" alt="avatar" width="50" height="50"/>
        </div>
    ));
    // clean up
    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);
    return (
        <Col className="center mb_10">
            <aside>
                {files.length>0?thumbs:<div class="user_image_1 mb_20">
                    <img src={user_image_1} alt={"UserImage"} class="profile-user-img img-responsive img-circle" alt="avatar" width="50" height="50"/>
                </div>}
            </aside>
            <div id="drag" {...getRootProps({style})}>
                <input id="drag" {...getInputProps()} />
                <div>Drag and drop your image here, or click to select image</div>
            </div>
        </Col>
    )
}

export default DropzoneComponent;