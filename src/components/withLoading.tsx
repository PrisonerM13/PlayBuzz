import React, { useState } from 'react';
import Loading from './Loading';

export interface ILoading {
  isLoading?: boolean;
  onLoad?: () => void;
}

const withLoading = (Component: React.FC<ILoading & any>) => {
  return ({ ...props }) => {
    const [isLoading, setIsLoading] = useState(true);
    const onLoad = () => setIsLoading(false);
    return (
      <section>
        {isLoading && <Loading />}
        <Component isLoading={isLoading} onLoad={onLoad} {...props} />
      </section>
    );
  };
};

export default withLoading;
