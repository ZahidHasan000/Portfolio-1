import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addYoutube, getUser } from '../../actions/user';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import YoutubeCard from '../YoutubeCard/YoutubeCard';

const Youtube = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.update);
  const { user } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(addYoutube(title, url, image));
    dispatch(getUser());
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();

    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  return (
    <div className="adminPanel">
      <div className="adminPanelContainer">
        <Typography variant="h4">
          <p>A</p>
          <p>D</p>
          <p>M</p>
          <p>I</p>
          <p style={{ marginRight: "1vmax" }}>N</p>
          <p>P</p>
          <p>A</p>
          <p>N</p>
          <p>E</p>
          <p>L</p>
        </Typography>

        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="text"
            placeholder="Link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="file"
            onChange={handleImage}
            className="adminPanelFileUpload"
            accept="image/*"
          />
          <Link to="/account">
            Back <MdKeyboardBackspace />
          </Link>

          <Button type="submit" variant="contained" disabled={loading}>
            Add
          </Button>
        </form>

        <div className='adminPanelYoutubeVideos'>
          {user && user.youtube && user.youtube.map((item) => (
            <YoutubeCard
              key={item._id}
              url={item.url}
              title={item.title}
              image={item.image.url}
              isAdmin={true}
              id={item._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Youtube
