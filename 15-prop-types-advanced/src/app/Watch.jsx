import React, { useEffect, useState } from 'react';

const getCurrentTime = () => new Date().toUTCString();

export const Watch = () => {
  const [ time, setTime ] = useState(getCurrentTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (<p> {time} </p>);
};
