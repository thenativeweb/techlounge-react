import React, { useEffect, useState } from 'react';

const getCurrentTime = () => new Date().toUTCString();

export const Watch = () => {
  const [ time, setTime ] = useState(getCurrentTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getCurrentTime());
      throw new Error('Fehler in asynchroner Komponente. Dies führt zwar nicht zum App-Crash - ist aber dennoch unschön und kann negative Seiteneffekte haben. Dieser Fehler sollte also definitiv behoben (in diesem Fall gelöscht) werden.');
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (<p> {time} </p>);
};
