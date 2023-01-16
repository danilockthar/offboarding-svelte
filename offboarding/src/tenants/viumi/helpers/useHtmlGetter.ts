import htmlUseCases from './htmlUseCases.json';

const useHtmlGetter = () => {
  const getHtmlUseCase = (statusMsg: string): string => {
    if (!htmlUseCases[statusMsg]) {
      return htmlUseCases['somethingWrong'];
    }
    return htmlUseCases[statusMsg];
  };
  return {
    getHtmlUseCase,
  };
};

export default useHtmlGetter;
