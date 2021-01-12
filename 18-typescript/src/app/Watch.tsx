import { FunctionComponent, ReactElement, useEffect, useState } from 'react';

const getCurrentTime = () => new Date().toUTCString();

const Watch: FunctionComponent = (): ReactElement => {
  const [ time, setTime ] = useState<string>(getCurrentTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getCurrentTime());
    }, 1_000);

    return () => clearInterval(intervalId);
  }, []);

  return (<p> {time} </p>);
};

export { Watch };
