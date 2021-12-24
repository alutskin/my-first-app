import Loader from "react-loader-spinner";
import { useEffect, useState } from "react/cjs/react.development";

const withLoadingDelay = (Component) => {
  const WithLoadingDelay = (props) => {
    const [mustHaveLoader, setMustHaveLoader] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setMustHaveLoader(false);
      }, 2000);
    }, []);

    const {styles, ...propsForComponent} = props;

    return (
      <>
        {mustHaveLoader ? (
          <Loader
            style={styles}
            type="TailSpin"
            color="#C0C0C0"
            height={100}
            width={100}
            timeout={2000}
          />
        ) : (
          <Component {...propsForComponent} />
        )}
      </>
    );
  };

  return WithLoadingDelay;
};

export default withLoadingDelay;
