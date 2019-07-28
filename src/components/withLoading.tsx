import React, { useState } from 'react';
import Loading from './Loading';

export interface ILoading {
  isLoading?: boolean;
  onLoad?: () => void;
}

// HOC which returns a wrapper with two components:
// 1. The input component with 2 additional props: isLoading and onLoad()
// 2. Loading indicator component which is displayed when isLoading=true
// isLoading is initially true. When the consumer calls onLoad() isLoading is set to false.
const withLoading = (Component: React.FC<ILoading & any> & any) => {
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
