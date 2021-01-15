import { FunctionComponent, ReactElement, useEffect, useState } from 'react';

const getCurrentTime = (): string => new Date().toUTCString();

const Watch: FunctionComponent = (): ReactElement => {
  const [ time, setTime ] = useState<string>(getCurrentTime());

  useEffect((): () => void => {
    const intervalId = window.setInterval((): void => {
      setTime(getCurrentTime());
    }, 1_000);

    return (): void => clearInterval(intervalId);
  }, []);

  return (<p> {time} </p>);
};

export { Watch };
