import { FunctionComponent, ReactElement, useEffect, useState } from 'react';

const getCurrentTime = () => new Date().toUTCString();

const Watch: FunctionComponent = (): ReactElement => {
  const [ time, setTime ] = useState<string>(getCurrentTime());

  useEffect(() => {
    const intervalId: number = window.setInterval((): void => {
      setTime(getCurrentTime());
    }, 1_000);

    return () => clearInterval(intervalId);
  }, []);

  return (<p> {time} </p>);
};

export { Watch };
