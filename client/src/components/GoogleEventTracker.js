import ReactGA from 'react-ga';

const useAnalyticsEventTracker = (category = 'Blog category') => {
  const eventTracker = (action = 'send email', label = 'contact') => {
    ReactGA.event({ category, action, label });
  };
  return eventTracker;
};
export default useAnalyticsEventTracker;
