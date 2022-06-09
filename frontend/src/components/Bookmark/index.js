import React, { useEffect, useState } from "react";
import axios from "axios";
import { setBookmark } from "../../redux/reducers/bookmark";
import { useSelector, useDispatch } from "react-redux";

const Bookmark = () => {
  const dispatch = useDispatch();

  const { bookmarks, token } = useSelector((state) => {
    return {
      bookmarks: state.bookmark.bookmark,
      token: state.auth.token,
    };
  });

  const getAllBookmark = () => {
    axios
      .get(`http://localhost:5000/bookmark/user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setBookmark(result.data.posts));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllBookmark();
  });

  return (
    <div>
      {bookmarks
        ? bookmarks.map((element, index) => {
            return (
              <div key={index}>
                <img src={element.media} />
              </div>
              
            );
          })
        : []}
    </div>
  );
};

export default Bookmark;
