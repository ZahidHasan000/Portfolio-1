import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addTimeline, deleteTimeline, getUser } from '../../actions/user';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { FaTrash } from 'react-icons/fa';

const Timeline = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.update);
  const { user } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(addTimeline(title, description, date));
    dispatch(getUser());
  };

  const deleteHandler = async (id) => {
    await dispatch(deleteTimeline(id));
    dispatch(getUser());
  }

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
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="adminPanelInputs"
          />

          <Link to="/account">
            Back <MdKeyboardBackspace />
          </Link>

          <Button type="submit" variant="contained" disabled={loading}>
            Add
          </Button>
        </form>

        <div className="adminPanelYoutubeVideos">
          {user &&
            user.timeline &&
            user.timeline.map((item) => (
              <div className="youtubeCard" key={item._id}>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body1" style={{ letterSpacing: "2px" }}>
                  {item.description}
                </Typography>
                <Typography variant="body1" style={{ fontWeight: 600 }}>
                  {item.date.toString().split("T")[0]}
                </Typography>

                <Button
                  style={{
                    margin: "auto",
                    display: "block",
                    color: "rgba(40,40,40,0.7)",
                  }}
                  onClick={() => deleteHandler(item._id)}
                >
                  <FaTrash />
                </Button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Timeline
