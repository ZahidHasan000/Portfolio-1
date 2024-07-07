import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addProject, getUser } from '../../actions/user';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { ProjectCard } from '../Projects/Projects';

const Project = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.update);
  const { user } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(addProject(title, url, image, description, techStack));
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
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="text"
            placeholder="Technology"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
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
          {user && user.projects && user.projects.map((item) => (
            <ProjectCard
              key={item._id}
              url={item.url}
              projectImage={item.image.url}
              projectTitle={item.title}
              description={item.description}
              technologies={item.techStack}
              isAdmin={true}
              id={item._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Project
